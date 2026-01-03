# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains reference materials from the 10xDevs course (Przeprogramowani.pl) - a comprehensive knowledge base for AI-assisted software development. All 116 documents are written in Polish.

**Note:** This project has no application code. It serves as a reference library for AI-assisted development workflows.

## Resource Structure

- `resources/10xdevs_checklisty_i_poradniki/` - Checklists and guides for development phases
- `resources/10xdevs_lekcje/` - 30 course lesson materials
- `resources/10xdevs_prompts_library/` - 82 prompt templates organized by module

## Module Overview

| Module | Focus | Key Topics |
|--------|-------|------------|
| M1 | Foundations | Model selection, IDE collaboration, AI agent workflows |
| M2 | MVP Bootstrap | PRD creation, database schema, REST API, UI generation |
| M3 | Production | Authentication, testing (Vitest/Playwright), CI/CD, deployment |
| M4 | Legacy | Code onboarding, regression testing, DDD modernization |
| M5 | Innovation | MCP servers, llms.txt, AI agents in CI/CD |

## Technology Stack (Taught in Course)

- **Frontend:** React, Astro, Tailwind CSS, shadcn/ui, React Hook Form + Zod
- **Backend:** TypeScript, PostgreSQL, Supabase (Auth + RLS)
- **Testing:** Vitest (unit), Playwright (E2E)
- **Deployment:** GitHub Actions, Cloudflare Pages, Docker/DigitalOcean

## Key Reference Documents

- `general-guidelines---10xworkflow.md` - Comprehensive AI-assisted development guide
- `checklista-modułu-2---ai-first-mvp.md` - MVP development checklist
- `checklista-modułu-3---going-live-on-prod.md` - Production deployment checklist
- `checklista-modułu-4---modernizacja-legacy.md` - Legacy modernization guide

## Prompt Library Navigation

Prompts are organized by development phase in `resources/10xdevs_prompts_library/`:

- **m1-10xworkflow/** - Meta-prompting, code review, visualization (ASCII, Mermaid, LaTeX), analysis techniques (devil's advocate, pre-mortem, unknown unknowns)
- **m2-bootstrap/** - PRD planning, database schema, API design, UI architecture
- **m3-prod-ready/** - Authentication flows, testing strategy, deployment configs
- **m4-legacy/** - Code analysis, DDD workshops, onboarding documentation, debugging
- **m5-innovation/** - MCP server implementation

## Core Methodologies

1. **Context-First Development** - Provide complete PRD/requirements before coding
2. **3x3 Iterative Workflow** - Implement features in small, validated chunks
3. **Model Role Separation** - Use different AI models for planning vs coding tasks

## User Learning Profile

- **Profile Location:** `.ai/user-profile.md` - Contains learning progress, goals, and next steps
- **Session Start:** Run `/start` at the beginning of each learning session to get a status update
