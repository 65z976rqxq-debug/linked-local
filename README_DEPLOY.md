This file explains how to publish the app to a public host using GitHub Actions + GHCR and (optionally) Render.

What the workflow does
- Builds the backend image from `local-backend/Dockerfile` and the production frontend image from `frontend/Dockerfile.prod`.
- Pushes both images to GitHub Container Registry (GHCR) under your account.
- Optionally triggers a Render deploy (if `RENDER_API_KEY` and `RENDER_SERVICE_ID` repository secrets are set).

Setup steps (GitHub)
1. Push this repository to GitHub and make sure your repo has a `main` branch.
2. In the repository settings -> Secrets -> Actions, add the following secrets if you plan to deploy to Render:
   - `RENDER_API_KEY` — a Render API key with permission to create deploys.
   - `RENDER_SERVICE_ID` — the Render service ID to trigger a deploy for.

Notes about GHCR
- The workflow uses the built-in `GITHUB_TOKEN` to authenticate to `ghcr.io`. Ensure Actions permissions for `packages: write` are allowed for the `GITHUB_TOKEN` in your repo settings.
- Images are pushed to `ghcr.io/<YOUR_ORG_OR_USERNAME>/wellness-backend:<sha>` and `ghcr.io/<YOUR_ORG_OR_USERNAME>/wellness-frontend:<sha>`.

Deploying to Render (manual)
1. Create an account at https://render.com and connect your GitHub repository.
2. Create two services:
   - Frontend: choose "Docker" environment and point to `frontend/Dockerfile.prod`.
   - Backend: choose "Docker" environment and point to `local-backend/Dockerfile`.
3. Set environment variables in Render for the backend (e.g. `DATABASE_URL`) and any secrets.
4. If you want automatic deploys via the workflow, you can create a Render service and then add `RENDER_SERVICE_ID` and `RENDER_API_KEY` to your repo secrets — the CI workflow will trigger a deploy after pushing images.

Alternatives
- If you prefer a single-host VPS, push the images to GHCR and pull them on your server (or use the Dockerfiles to build on-host).
- If you prefer a managed container registry other than GHCR, update the workflow to login/push to that registry.

If you want me to customize the workflow to push to Docker Hub or to call a different provider's API, tell me which provider and I will update the workflow accordingly.
