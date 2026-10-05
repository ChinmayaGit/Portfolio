#!/bin/bash
# ==============================================================================
# Oracle Cloud (OCI) One-Click Deployment Script
# Chinmaya Garnaik Developer Portfolio
# ==============================================================================
set -e

KEY_PATH="/Users/chinmaya/Documents/Projects/SSH/Portfolio/ssh-key-2026-09-20.key"
SERVER_IP="129.225.113.64"
SERVER_USER="ubuntu"
REMOTE_DIR="/var/www/portfolio"

echo "========================================================"
echo "🚀 Starting Deployment to Oracle Cloud Infrastructure"
echo "========================================================"

# Step 1: Push latest commits to GitHub
echo "🐙 Step 1: Pushing latest commits to GitHub..."
git push origin main || echo "Git push skipped or already up to date"

# Step 2: Compile optimized production build locally
echo "📦 Step 2: Compiling production build on Mac..."
npm run build

# Step 3: Ensure SSH key exists and has correct permissions
if [ -f "$KEY_PATH" ]; then
  chmod 400 "$KEY_PATH"
else
  echo "⚠️ Warning: SSH key not found at $KEY_PATH"
  echo "Please verify the path to your OCI private key."
fi

# Step 4: Sync git repository on the remote server
echo "🔄 Step 3: Syncing latest git commits on Oracle Cloud server..."
ssh -i "$KEY_PATH" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "cd $REMOTE_DIR && git fetch origin main && git reset --hard origin/main"

# Step 5: Upload freshly compiled dist folder directly
echo "📤 Step 4: Uploading compiled production assets to $REMOTE_DIR/dist..."
ssh -i "$KEY_PATH" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "mkdir -p $REMOTE_DIR/dist"
rsync -avz --delete -e "ssh -i $KEY_PATH -o StrictHostKeyChecking=no" dist/ "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/dist/" || scp -i "$KEY_PATH" -r dist/* "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/dist/"

# Step 6: Fix permissions and reload Nginx
echo "⚙️ Step 5: Enforcing Nginx permissions and reloading..."
ssh -i "$KEY_PATH" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "sudo chown -R ubuntu:www-data $REMOTE_DIR && sudo chmod -R 755 $REMOTE_DIR && sudo systemctl reload nginx"

echo "========================================================"
echo "🎉 DEPLOYMENT COMPLETE! Portfolio is live at:"
echo "👉 https://cgarnaik.duckdns.org"
echo "========================================================"

