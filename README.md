# VC Spec Lens

A credential comparison page for the Issuer-Holder-Verifier (HIV) model, comparing three standardized credential formats.

## Overview

This web application allows you to compare three standardized credential formats:

- **W3C VC Data Model** - W3C standard for Verifiable Credentials
- **ISO mDOC** - ISO standard for mobile documents
- **IETF SD-JWT** - IETF standard for Selective Disclosure JWT

## Features

### Input Fields
- Issued At
- Expired At
- Other required information
- Credential Body

### Generation
Enter the required information and click the "Generate" button to create credentials in three formats:
1. W3C VC format
2. ISO mDOC format
3. IETF SD-JWT format

The generated credentials are displayed side by side, allowing visual comparison of the differences between each format.

## Development Setup

### Requirements
- Node.js 24.3.0 (managed by Volta)
- Bun

### Installation

```bash
bun install
```

### Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build

```bash
bun build
```

### Start Production Server

```bash
bun start
```

### Code Quality

```bash
# Run linting and formatting checks
bun run check

# Auto-fix issues
bun run check:fix
```

## Tech Stack

- **Next.js 15.3.4** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **Biome** - Fast formatter and linter