# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a credential comparison page for the Issuer-Holder-Verifier (HIV) model, comparing three credential standards:
- **W3C VC Data Model** - W3C standard for Verifiable Credentials
- **ISO mDOC** - ISO standard for mobile driving licenses and documents
- **IETF SD-JWT** - IETF standard for selective disclosure JWTs

## Common Commands

```bash
# Development
bun dev                 # Start the development server with Turbopack

# Build & Production
bun build              # Build the application for production
bun start              # Start the production server

# Code Quality
bun run check          # Run Biome linter and formatter checks
bun run check:fix      # Fix linting and formatting issues automatically (ALWAYS run this after making changes)
```

## Architecture

The project is built with:
- **Next.js 15.3.4** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **Biome** - Fast formatter and linter (replaces ESLint/Prettier)

### Project Structure

```
src/
├── app/
│   ├── layout.tsx    # Root layout component
│   └── page.tsx      # Main page component
```

## Key Development Guidelines

1. **Formatting**: Always run `bun run check:fix` after making any code changes
2. **Imports**: Biome will automatically organize imports on format
3. **Code Style**: 
   - Use double quotes for strings (enforced by Biome)
   - 2-space indentation
   - Self-closing elements for components without children
   - Use `const` assertions where applicable

## External Tools

When working on this project, utilize:
- **Gemini CLI**: For searching and gathering information about credential standards
- **Playwright MCP**: For browser automation and testing

## Feature Implementation

The credential comparison page should include:

1. **Input Section**:
   - Common fields: Issued At, Expired At
   - Credential Body input area
   - Generate button

2. **Output Section**:
   - Three panels showing generated credentials:
     - W3C VC Data Model credential
     - ISO mDOC credential
     - IETF SD-JWT credential

3. **Comparison Features**:
   - Side-by-side view of all three formats
   - Highlighting of differences
   - Format-specific features explained

## Dependencies to Consider

When implementing credential generation, you may need to add libraries for:
- JWT handling for SD-JWT
- CBOR encoding for mDOC
- JSON-LD processing for W3C VCs