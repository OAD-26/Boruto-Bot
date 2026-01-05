# Overview

This is a simple Node.js web application that serves a static HTML page using Express.js. The application displays a welcome message and demonstrates basic static file serving capabilities. It's a minimal starter template suitable for building out into a more complex web application.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Server Architecture

- **Runtime**: Node.js with Express.js v5.2.1 as the web framework
- **Server Configuration**: Runs on port 5000, bound to 0.0.0.0 for external accessibility
- **Static File Serving**: Express serves static files from the root directory using `express.static('.')`

## Frontend Architecture

- **Approach**: Simple static HTML with embedded CSS
- **Styling**: Uses inline `<style>` block with modern CSS (flexbox, system fonts, minimal design)
- **No build process**: HTML is served directly without any bundling or preprocessing

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| Express.js for server | Industry-standard, minimal setup, good for both static sites and APIs |
| Single-file frontend | Simplicity for small applications; can be expanded to separate files as needed |
| Port 5000 | Replit-compatible port for web applications |

# External Dependencies

## NPM Packages

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web server framework for routing and static file serving |
| @types/node | ^22.13.11 | TypeScript type definitions for Node.js (enables better IDE support) |

## External Services

- None currently configured

## Database

- None currently configured (can be added as the project grows)