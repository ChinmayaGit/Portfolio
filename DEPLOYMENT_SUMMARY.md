# Oracle Cloud (OCI) Production Deployment & Troubleshooting Playbook

Comprehensive summary of the complete deployment lifecycle, infrastructure configuration, issues encountered, root-cause analyses, and solutions implemented to host the **Chinmaya Garnaik Developer Portfolio** on Oracle Cloud Infrastructure (OCI).

---

## 🌐 1. Live Production Deployment Overview

| Parameter | Value |
| :--- | :--- |
| **Live Secure URL** | [https://cgarnaik.duckdns.org](https://cgarnaik.duckdns.org) |
| **Server Public IP** | `129.225.113.64` |
| **Cloud Provider** | Oracle Cloud Infrastructure (OCI) — Always Free Tier |
| **Compute Instance** | `portfolio-server` (Canonical Ubuntu 22.04 LTS) |
| **Web Server** | Nginx 1.18.0 (Static caching, Gzip compression, SPA fallback) |
| **Runtime Environment** | Node.js v20.x LTS + npm 10.x |
| **SSL / TLS Certificate** | Let's Encrypt automated TLS certificate (Auto-renewing via Certbot) |
| **Domain & DNS** | DuckDNS (`cgarnaik.duckdns.org` &rarr; `129.225.113.64`) |
| **Source Repository** | [https://github.com/ChinmayaGit/Portfolio.git](https://github.com/ChinmayaGit/Portfolio.git) |

---

## 🏗️ 2. Architectural Blueprint

```
[ Visitor / Web Browser ]
         │
         ▼  (Port 443 HTTPS / Port 80 HTTP)
[ OCI Virtual Cloud Network (VCN) Ingress Security List ]
         │
         ▼  (Ubuntu Host Firewall: iptables Position 1 ACCEPT)
[ Nginx Reverse Proxy & Static Web Server ]
         │
         ├── SSL Termination (Let's Encrypt / Certbot)
         ├── HTTP to HTTPS 301 Permanent Redirect
         ├── Gzip Compression (text/css, js, svg, json)
         └── SPA Fallback Routing: try_files $uri $uri/ /index.html
                     │
                     ▼
       [/var/www/portfolio/dist]
         ├── index.html
         └── assets/ (index-*.css, index-*.js)
```

---

## ⚠️ 3. Issues Encountered & Solutions (Troubleshooting Log)

### Issue 1: Git Push Rejected (`no upstream branch`)
- **Symptom**:  
  Running `git push` on the local development machine failed with:
  `fatal: The current branch main has no upstream branch.`
- **Root Cause**:  
  The newly created local `main` branch was not yet linked to a tracking upstream branch on the remote GitHub repository.
- **Solution**:  
  Configured upstream tracking using:
  ```bash
  git push -u origin main
  # Optional: prevent this permanently for all future branches
  git config --global push.autoSetupRemote true
  ```

---

### Issue 2: OCI Ingress Security List Typo & Redundancy
- **Symptom**:  
  The VCN security list had Port 80 added 3 separate times, and Port 43 (WHOIS) was opened instead of 443 (HTTPS).
- **Root Cause**:  
  Typo while manually entering port numbers in the OCI Console UI.
- **Solution**:  
  Deleted duplicate Port 80 rules and deleted the unnecessary Port 43 rule, keeping only:
  - `TCP / 22` (SSH)
  - `TCP / 80` (HTTP)
  - `TCP / 443` (HTTPS)

---

### Issue 3: SSH Connection Failure (`Permission denied (publickey)`)
- **Symptom**:  
  Running `ssh ubuntu@129.225.113.64` rejected the connection.
- **Root Cause**:  
  1. The command was missing the explicit private key path (`-i <keyfile>`).
  2. Operating system username ambiguity (Oracle Linux uses `opc`, whereas Ubuntu uses `ubuntu`).
- **Solution**:  
  Identified the generated key file and connected with:
  ```bash
  ssh -i /Users/chinmaya/Documents/Projects/SSH/Portfolio/ssh-key-2026-09-20.key ubuntu@129.225.113.64
  ```

---

### Issue 4: Local Folder Locked (`cd: permission denied: Portfolio`)
- **Symptom**:  
  Running `cd Portfolio` on the Mac terminal failed with `permission denied`, and Finder reported *"The folder 'Portfolio' can't be opened because you don't have permission"*.
- **Root Cause**:  
  A broad `chmod 400 .../*` command had altered directory permissions. When a directory lacks execute (`+x`) permissions, users cannot enter (`cd`) or browse it.
- **Solution**:  
  Restored directory permissions:
  ```bash
  chmod 755 Portfolio
  ```
  And set strict permissions only on the private key file:
  ```bash
  chmod 400 Portfolio/ssh-key-2026-09-20.key
  ```

---

### Issue 5: OCI Host OS Firewall Blocked Certbot (`Error getting validation data`)
- **Symptom**:  
  Certbot failed during the ACME `http-01` challenge for `129.225.113.64.sslip.io` with:
  `Detail: Fetching http://.../.well-known/acme-challenge/...: Error getting validation data`.
- **Root Cause**:  
  OCI Ubuntu images ship with default `iptables` firewall rules containing a terminal `REJECT` rule. Any rules appended at the end or below the reject rule are ignored, dropping inbound HTTP traffic from Let's Encrypt validation servers.
- **Solution**:  
  Inserted accept rules at **Position 1** (the very top of the `INPUT` chain) so traffic is evaluated before any reject rule:
  ```bash
  sudo iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT
  sudo iptables -I INPUT 1 -p tcp --dport 443 -j ACCEPT
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
  sudo netfilter-persistent save
  ```

---

### Issue 6: Nginx 500 Internal Server Error
- **Symptom**:  
  Testing local server response with `curl -I http://localhost` returned:
  `HTTP/1.1 500 Internal Server Error`.
- **Root Cause**:  
  The build directory `/var/www/portfolio/dist` did not exist yet on the server. Nginx's directive `try_files $uri $uri/ /index.html;` entered an internal rewrite loop trying to serve a non-existent `/index.html`.
- **Solution**:  
  Compiled the production build using `npm run build` and granted read permissions to Nginx (`www-data`):
  ```bash
  sudo chown -R ubuntu:www-data /var/www/portfolio
  sudo chmod -R 755 /var/www/portfolio
  ```

---

### Issue 7: Build Script Missing Dependencies (`sh: 1: tsc: not found`)
- **Symptom**:  
  Running `npm run build` produced:
  `sh: 1: tsc: not found` and `npm WARN Local package.json exists, but node_modules missing`.
- **Root Cause**:  
  The project had been freshly cloned from GitHub, but `npm install` had not yet been run to populate `node_modules`.
- **Solution**:  
  Ran `npm install` to download all project dependencies and binaries (`tsc`, `vite`).

---

### Issue 8: Outdated Server Node.js Version (`SyntaxError: Unexpected token ?`)
- **Symptom**:  
  `npm run build` crashed during TypeScript compilation with:
  `SyntaxError: Unexpected token ? in /var/www/portfolio/node_modules/typescript/lib/_tsc.js`.
- **Root Cause**:  
  The server had an old version of Node.js (v10 / v12) from default Ubuntu apt repositories, which lacked support for ECMAScript 2020 nullish coalescing operators (`??`) required by TypeScript 5+.
- **Solution**:  
  Removed legacy Node.js packages and upgraded to **Node.js 20 LTS** via official NodeSource distribution:
  ```bash
  sudo apt remove -y nodejs libnode72
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs
  ```
  Verified `node -v` returned `v20.x.x`, after which `npm run build` compiled cleanly in 27 seconds.

---

### Issue 9: Firefox SSL Warning on Raw IP
- **Symptom**:  
  Navigating to `https://129.225.113.64/` triggered Firefox's warning:
  *"Be careful. Something doesn’t look right. Firefox spotted a potentially serious security issue..."*.
- **Root Cause**:  
  Public Certificate Authorities (CAs) like Let's Encrypt do not issue standard certificates for raw IP addresses. Accessing an IP over HTTPS either hits an unconfigured SSL port or an untrusted self-signed certificate.
- **Solution**:  
  Configured a free public subdomain via DuckDNS (**`cgarnaik.duckdns.org`**) pointing to `129.225.113.64`, and ran Certbot to issue a legitimate, trusted Let's Encrypt certificate with automatic HTTP-to-HTTPS redirection (Option 2).

---

## 🚀 4. One-Click Future Updates Playbook

An automated update shell script was created on the server at `/var/www/portfolio/update.sh`:

```bash
#!/bin/bash
cd /var/www/portfolio
git pull origin main
npm install
npm run build
sudo chown -R ubuntu:www-data /var/www/portfolio
sudo chmod -R 755 /var/www/portfolio
sudo systemctl reload nginx
echo "🚀 Portfolio successfully updated and live!"
```

### How to Deploy Future Changes:
Whenever you make updates on your Mac:
1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push
   ```
2. **Trigger the deployment from your Mac terminal**:
   ```bash
   ssh -i /Users/chinmaya/Documents/Projects/SSH/Portfolio/ssh-key-2026-09-20.key ubuntu@129.225.113.64 "/var/www/portfolio/update.sh"
   ```

The live website at [https://cgarnaik.duckdns.org](https://cgarnaik.duckdns.org) will update immediately with zero downtime.
