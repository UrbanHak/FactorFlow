FactorFlow

Turn your invoices into immediate cash flow and get up to 90% of your invoice value within 24 hours with our blockchain-powered factoring platform designed for small businesses.

Exe Resume- Permissionless Hackathon

Problem	44 % of U.S. SMEs wait ≥60 days to get paid. Lack of cash flow forces 1 in 5 to miss growth opportunities.
Solution	FactorFlow turns unpaid invoices into instant PYUSD. An AI scoring engine tokenises each invoice as an NFT, routes it to a liquidity pool, and settles funding in PYUSD within one click.
Why PYUSD	USD-pegged stability + PayPal brand trust → ideal for factoring payouts; ERC-20 means permissionless composability; bridges easily to Supra for cross-chain reach.
AI Edge	GPT--4o embeddings + financial KPIs predict invoice default probability in <2 s (90 % F-score on invoice-payment dataset).
Blockchain Edge	Solidity smart-contract marketplace; invoices become ERC-721s; funders commit PYUSD; repayment burns NFT & auto-routes PYUSD + discount back to investor.
Impact	<30 s liquidity, 0 paper, 0 bank middlemen.

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

Bridging: Supra’s cross-chain VM can escrow minted NFTs and mirror PYUSD on other L2s
