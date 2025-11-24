This workspace was missing a usable Docker Compose configuration. I added a minimal demo setup so you can bring up a local Postgres and a tiny backend service to verify Docker Compose is working.

Files added:
- `docker-compose.yaml` — Compose file with `db` (Postgres) and `backend` services
- `local-backend/` — Minimal Node Express app used by the compose file

How to run locally (macOS / zsh):

```bash
cd /Users/reeseborden/Desktop/wellness-events
docker-compose -f docker-compose.yaml up --build
```

The backend will be available at `http://localhost:4000/` and Postgres at port `5432`.

To adapt to your real backend:
- Replace `local-backend` with your actual backend directory and Dockerfile, or update the `backend` service `build.context` to point to your backend.
- Ensure `DATABASE_URL` matches your app's expected env var.
