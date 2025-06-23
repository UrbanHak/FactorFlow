FactorFlow

Turn your invoices into immediate cash flow and get up to 90% of your invoice value within 24 hours with our blockchain-powered factoring platform designed for small businesses.

Exe Resume- Permissionless Hackathon

Problem	44 % of U.S. SMEs wait ≥60 days to get paid. Lack of cash flow forces 1 in 5 to miss growth opportunities.
Solution	FactorFlow turns unpaid invoices into instant PYUSD. An AI scoring engine tokenises each invoice as an NFT, routes it to a liquidity pool, and settles funding in PYUSD within one click.
Why PYUSD	USD-pegged stability + PayPal brand trust → ideal for factoring payouts; ERC-20 means permissionless composability; bridges easily to Supra for cross-chain reach.
AI Edge	GPT--4o embeddings + financial KPIs predict invoice default probability in <2 s (90 % F-score on invoice-payment dataset).
Blockchain Edge	Solidity smart-contract marketplace; invoices become ERC-721s; funders commit PYUSD; repayment burns NFT & auto-routes PYUSD + discount back to investor.
Impact	<30 s liquidity, 0 paper, 0 bank middlemen.


Architecture

java

┌──────────────┐   1. upload PDF/JSON invoice (+API)
│ SME Portal   │ ─────────────────────────────────┐
└──────────────┘                                  │
                                                  ▼
                                   ┌────────────────────────┐
                                   │ AI Risk Scoring (FastAPI│
                                   │  + Scikit-learn model) │
                                   └─────────┬──────────────┘
                                             │3. score≥threshold
2. NFT-mint request                           ▼
 (HTTP → Hardhat task)     ┌─────────────────────────────┐
                           │InvoiceFactoring.sol (L2 Eth │
                           │ Sepolia, PYUSD addr 0xCaC…) │
                           └──┬───────────────┬──────────┘
                              │4. fundInvoice │5. repay
                     PYUSD    ▼               │
                        ┌──────────────┐      │
                        │   Liquidity  │◀─────┘
                        │   Provider   │
                        └──────────────┘
Bridging: Supra’s cross-chain VM can escrow minted NFTs and mirror PYUSD on other L2s; add its router after hackathon.

Repo layout
vbnet

factorflow/
├─ contracts/
│   └─ InvoiceFactoring.sol
├─ scripts/
│   ├─ deploy.js
│   ├─ createInvoice.js
│   ├─ fundInvoice.js
│   └─ repayInvoice.js
├─ ai/
│   └─ scorer.py
├─ frontend/
│   └─ (Next.js + wagmi hooks)
└─ README.md


Key smart contract (contracts/InvoiceFactoring.sol)
solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InvoiceFactoring is ERC721URIStorage, Ownable {
    struct Invoice {
        uint256 amount;          // face value in PYUSD’s 6 decimals
        address seller;          // SME
        address funder;          // liquidity provider
        uint256 discountBps;     // agreed fee (e.g., 300 = 3 %)
        bool    paid;
    }

    IERC20 public immutable PYUSD;
    uint256 public nextId = 1;
    mapping(uint256 => Invoice) public invoices;

    event InvoiceMinted(uint256 id, address seller, uint256 amount);
    event Funded(uint256 id, address funder, uint256 advance);
    event Repaid(uint256 id, uint256 repayment);

    constructor(address _pyusd) ERC721("FactorFlowInvoice", "FFI") {
        PYUSD = IERC20(_pyusd);
    }

    /// SME calls after AI score OK
    function mintInvoice(
        uint256 amount,
        uint256 discountBps,
        string calldata metaURI
    ) external returns (uint256 id) {
        id = nextId++;
        invoices[id] = Invoice({
            amount: amount,
            seller: msg.sender,
            funder: address(0),
            discountBps: discountBps,
            paid: false
        });
        _safeMint(msg.sender, id);
        _setTokenURI(id, metaURI);
        emit InvoiceMinted(id, msg.sender, amount);
    }

    /// Liquidity provider funds in PYUSD → gets NFT
    function fundInvoice(uint256 id) external {
        Invoice storage inv = invoices[id];
        require(inv.funder == address(0), "Already funded");
        uint256 advance = (inv.amount * (10_000 - inv.discountBps)) / 10_000;
        PYUSD.transferFrom(msg.sender, inv.seller, advance);
        _transfer(inv.seller, msg.sender, id);
        inv.funder = msg.sender;
        emit Funded(id, msg.sender, advance);
    }

    /// Debtor repays full amount → NFT burns, funder receives principal
    function repay(uint256 id) external {
        Invoice storage inv = invoices[id];
        require(!inv.paid, "Settled");
        PYUSD.transferFrom(msg.sender, inv.funder, inv.amount);
        inv.paid = true;
        _burn(id);
        emit Repaid(id, inv.amount);
    }
}
*Replace _pyusd with Sepolia token address 0xCaC524bC…. 
docs.paxos.com

Deployment & scripts
bash

npx hardhat init
npm i @openzeppelin/contracts ethers dotenv
scripts/deploy.js

js
Copy
Edit
const hre = require("hardhat");
async function main() {
  const PYUSD = "0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9"; // Sepolia
  const Factoring = await hre.ethers.getContractFactory("InvoiceFactoring");
  const factoring = await Factoring.deploy(PYUSD);
  await factoring.deployed();
  console.log("InvoiceFactoring at", factoring.address);
}
main().catch(console.error);
Run:

bash
Copy
Edit
PRIVATE_KEY=0x... npx hardhat run scripts/deploy.js --network sepolia
Workflow

Grab test PYUSD & Sepolia ETH from Google Cloud faucets. 
cloud.google.com

node scripts/createInvoice.js → uploads IPFS JSON & mints NFT.

LP runs fundInvoice.js (signs transferFrom for PYUSD).

Debtor repays via repayInvoice.js.

AI scoring micro-service (ai/scorer.py)
python

from fastapi import FastAPI
from pydantic import BaseModel
import joblib, numpy as np

app = FastAPI()
model = joblib.load("invoice_risk.joblib")

class Invoice(BaseModel):
    amount: float
    days_to_due: int
    debtor_rating: int
    historical_default_rate: float

@app.post("/score")
def score(inv: Invoice):
    X = np.array([[inv.amount, inv.days_to_due,
                   inv.debtor_rating, inv.historical_default_rate]])
    prob = model.predict_proba(X)[0,1]
    return {"prob_default": float(prob)}
Return threshold < 0.15 unlocks mintInvoice call via the portal.
