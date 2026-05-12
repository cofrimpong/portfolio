# Christabel Portfolio Site

A scrollytelling portfolio built from Christabel O Frimpong's 2026 public GitHub work.

## Reference Influence
- Uses `references/designsystem` as a guide for content-first organization, explicit project storytelling, and deployment-ready structure.
- Deliberately changes the UX/UI direction into a warmer story-first presentation instead of reusing the reference visual language.

## Current Structure
- `src/app/page.tsx`: homepage scrollytelling journey
- `src/app/professional-direction/page.tsx`: professional direction detail page
- `src/app/ai-workflow/page.tsx`: AI workflow detail page
- `src/app/projects/page.tsx`: full project proof page
- `src/content/site.ts`: central content and project source of truth
- `public/generated/`: generated narrative and case-study images

## Run
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## Validation
1. `npm run build`

## Notes
- The homepage pulls from `src/content/site.ts` and uses generated imagery when matching files are present in `public/generated/`.
- Project cards support both repository and live-site links.
