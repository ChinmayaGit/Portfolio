# Oracle Cloud (OCI) Production Deployment & Troubleshooting Playbook

Comprehensive engineering summary of the complete deployment lifecycle, infrastructure configuration, exhaustive tech stack breakdown, issues encountered, root-cause analyses, and solutions implemented to host the **Chinmaya Garnaik Developer Portfolio** on Oracle Cloud Infrastructure (OCI).

---

## 🌐 1. Live Production Deployment Overview

| Parameter | Value |
| :--- | :--- |
| **Live Secure URL** | [https://cgarnaik.duckdns.org](https://cgarnaik.duckdns.org) 🔒 |
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
         ├── SSL Termination (Let's Encrypt / Certbot TLSv1.3)
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

## 🧩 3. Exhaustive Tech Stack Breakdown (Every Bit & Component Used)

### A. Frontend Application & Build Pipeline
- **React 18.3**: Modern UI library utilizing functional components, custom hooks (`useState`, `useEffect`, `useRef`, `useMemo`), and concurrent rendering features.
- **TypeScript 5.5+**: End-to-end static typing enforcing type safety across 71+ GitHub projects, 30+ certifications, 6 technology domains, and filter states. Configured with strict compiler flags (`noUnusedLocals: true`).
- **Vite 6.4**: Next-generation frontend tooling providing lightning-fast Hot Module Replacement (HMR) and an optimized Rollup production bundling engine with code-splitting and asset hash generation.

### B. Styling, Design System & Typography
- **Tailwind CSS 3.4**: Utility-first CSS framework with JIT (Just-In-Time) compiler generating a lightweight `<56 kB` production stylesheet.
- **PostCSS & Autoprefixer**: Automated CSS transformation pipeline injecting vendor prefixes for cross-browser support (Chrome, Safari, Firefox, Edge).
- **Custom Design Palette**: Deep space cyber background (`#05070c` / `#07090e`), neon glassmorphism accents, gradient borders, and radial ambient lighting glows.
- **Typography**: Monospace system font stacks and clean sans-serif type designed for developer terminal aesthetics.

### C. Motion, 3D Engine & Graphics Layer
- **Framer Motion 11**: Production animation library powering:
  - **3D Quantum Cyber-Core Scroll Showcase**: Pinned 480vh sticky scroll stage utilizing hardware-accelerated CSS 3D matrix transforms (`rotateY: 0° → 720°`, `rotateX: 15° → -25° → 15°`).
  - **Scroll Progress Springs**: `useScroll()` coupled with `useSpring({ stiffness: 120, damping: 28 })` driving the top viewport reading progress bar.
  - **Layout Transitions**: Layout animations (`layout`, `AnimatePresence`) for category pill switching and project filtering.
  - **Initial Boot Loader**: Cybernetic non-linear progress bar animation with laser tracer beam and smooth blur/scale exit.
- **HTML5 Canvas 2D Engine**: GPU-accelerated 60 FPS interactive particle constellation canvas reacting dynamically to cursor distance vectors and particle velocity damping.
- **Lucide React**: Modular, tree-shakeable SVG icon collection representing technology domains, cloud providers, and terminal actions.

### D. Data & State Architecture
- **In-Memory Structured Models**:
  - `projectsData.ts`: Normalized catalog of 71+ repositories with star metrics, tags, highlights, and deep architectural summaries across 6 domains.
  - `certificationsData.ts`: 30+ verified credentials with credential IDs, verification links (Credly, Oracle CertView, ISRO), and skill associations.
  - `skillsData.ts`: Full-spectrum competency matrix categorized across the 6 Technology Domains.
- **Browser APIs**:
  - **Clipboard API**: Secure one-click email copying (`navigator.clipboard.writeText('chinugarnaiklabs@gmail.com')`).
  - **Keyboard Event Listener**: Global `Cmd+K` / `Ctrl+K` keyboard listener for the quick-navigation Command Palette and `Esc` for modal dismissal.

### E. Web Server & Reverse Proxy (Nginx)
- **Nginx 1.18.0 on Ubuntu**: High-concurrency event-driven HTTP server and reverse proxy.
  - **Multi-Port Binding**: Dual listeners on Port `80` (HTTP) and Port `443` (HTTPS with TLS).
  - **Automated HTTPS 301 Redirect**: Enforces SSL security on all incoming traffic.
  - **Single Page Application (SPA) Fallback**: `try_files $uri $uri/ /index.html;` ensuring direct navigation and deep links never 404.
  - **Dynamic Gzip Compression**: Real-time compression of HTML, CSS, JavaScript, JSON, and SVG assets reducing network payload by ~70%.
  - **Immutable Static Asset Caching**: 1-year cache headers (`expires 1y; add_header Cache-Control "public, no-transform";`) for hashed assets in `dist/assets/`.

### F. SSL / TLS Security & Encryption
- **Let's Encrypt**: Free, automated, open Certificate Authority (CA) providing X.509 cryptographic certificates.
- **Certbot 1.21+ (Nginx Plugin)**: ACME client automating the `http-01` challenge validation, certificate signing, and renewal lifecycle.
- **Cryptographic Protocols**: TLSv1.2 and TLSv1.3 with high-strength cipher suites.
- **Automated Renewal**: Background `systemd` certbot timers checking certificate expiration and auto-renewing before 90-day expiry.

### G. Domain, DNS & Public Routing
- **Dynamic DNS (DDNS)**: DuckDNS free public DNS mapping the custom subdomain `cgarnaik.duckdns.org` directly to OCI Public IPv4 `129.225.113.64`.
- **Public IP Routing**: Fixed OCI Reserved/Ephemeral Public IPv4 routed via OCI Internet Gateway.

### H. Cloud Infrastructure & Virtualization (Oracle Cloud)
- **Cloud Provider**: Oracle Cloud Infrastructure (OCI) Always Free Tier.
- **Compute Instance**: `portfolio-server` running Canonical Ubuntu 22.04 LTS.
- **Virtual Cloud Network (VCN)**: Dedicated virtual network with regional public subnet, default route tables, and Internet Gateway (IGW).
- **VCN Ingress Security List**: Stateful TCP packet filtering on:
  - Port `22` (SSH management)
  - Port `80` (HTTP web access / ACME challenge)
  - Port `443` (HTTPS encrypted web access)

### I. Host OS Firewall & Security Layer
- **Linux Netfilter / iptables**: Kernel-level stateful firewall with priority-1 accept rules ensuring web traffic is never dropped by downstream reject rules.
- **iptables-persistent / netfilter-persistent**: System service preserving custom firewall rules across server restarts.
- **Uncomplicated Firewall (UFW)**: Configured with application rules for Ports 80 and 443.
- **SSH Cryptographic Key Authentication**: Asymmetric key-pair authentication (ED25519 / RSA) with locked permissions (`chmod 400`), disabling password-based SSH access.

### J. Server Runtime & Automation Tools
- **Node.js 20 LTS**: Modern V8 JavaScript engine installed via official NodeSource APT repository (`deb.nodesource.com/setup_20.x`).
- **npm 10.x**: Dependency manager resolving and caching the project dependency tree.
- **Git**: Distributed version control tracking and synchronizing the codebase with GitHub.
- **Automated Update Script (`update.sh`)**: Custom bash deployment script orchestrating `git pull`, `npm install`, `npm run build`, permission enforcement, and zero-downtime Nginx reload.

---

## ⚠️ 4. Issues Encountered & Solutions (Troubleshooting Log)

### Issue 1: Git Push Rejected (`no upstream branch`)
- **Symptom**:  
  Running `git push` on the local development machine failed with:  
  `fatal: The current branch main has no upstream branch.`
- **Root Cause**:  
  The local `main` branch had no tracking upstream configured on the remote GitHub repository.
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

## 🚀 5. One-Click Future Updates Playbook

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

The live website at [https://cgarnaik.duckdns.org](https://cgarnaik.duckdns.org) updates immediately with zero downtime.
