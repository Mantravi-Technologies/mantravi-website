# BSC Advisor Backend

Maruti Suzuki Distributor Balanced Scorecard Advisor API — Phase 1: Sales Consistency (Parameter 1A).

## Quick Start

```bash
# 1. Start PostgreSQL
docker compose up -d

# 2. Install dependencies
pip install -e ".[dev]"

# 3. Copy environment
cp .env.example .env

# 4. Run migrations (optional — app also auto-creates tables on startup)
alembic upgrade head

# 5. Start API server
uvicorn app.main:app --reload --port 8000
```

Open API docs: http://localhost:8000/docs

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Health check |
| POST | `/api/v1/uploads/sales-ledger` | Upload Excel/CSV sales ledger |
| GET | `/api/v1/uploads/{job_id}` | Poll upload job status |
| GET | `/api/v1/scores/sales-consistency` | Get sales consistency score |
| POST | `/api/v1/scores/sales-consistency/simulate` | What-if simulation |
| GET | `/api/v1/dealers` | List loaded dealer codes |

### Upload merge modes

- `append` (default) — only insert days beyond existing coverage per month
- `replace_months` — replace specific months (`replace_months=Apr,May`)
- `full_reset` — wipe all dealer data and re-insert

## Architecture

- **FastAPI** — REST API with OpenAPI docs
- **PostgreSQL** — ledger, aggregates, coverage watermarks, score cache
- **Pandas** — Excel/CSV parsing
- **Pure Python calculator** — deterministic Sales Consistency math (no LLM)

Scores are pre-computed on upload into `distributor_bsc_scores` for fast chatbot reads.

## Tests

```bash
pytest
```
# bsc-backend
