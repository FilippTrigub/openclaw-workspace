#!/bin/bash
# Push script using GitHub CLI

set -e

cd /home/node/.openclaw/workspace

# Sync the local branch with the remote
echo "Syncing with remote..."
git remote set-url origin "https://x-access-token:${GH_TOKEN}@github.com/FilippTrigub/openclaw-workspace.git"
git checkout main 2>/dev/null || git checkout -b main
git pull origin main --allow-unrelated-histories --no-edit 2>/dev/null || true

# Push the master branch content to main
git checkout -b main-temp
git merge master --no-edit 2>/dev/null || git checkout master -- .

# Switch to main and push
git checkout main
git merge main-temp --no-edit 2>/dev/null || true
git push origin main

echo "Push complete!"
