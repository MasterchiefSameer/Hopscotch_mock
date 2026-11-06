# Hopscotch

Cross-platform kids' and baby fashion e-commerce platform built with React Native and Expo (React Native for Web). Implements a high-performance, Server-Driven UI (SDUI) layout engine powered by dynamic JSON feeds from DummyJSON, providing responsive browsing, category navigation, variant-level pricing, and cart management across Web and Mobile (Android / iOS).

This file is the project's memory: it holds every decision that is still true. Plans in `prompts/` are history.

## Commands

~~~bash
npx expo install <package>  # ALWAYS use instead of npm install: resolves SDK-compatible versions
npx expo start              # dev server (press w for web, a for android, i for iOS)
npx expo start --web        # run web directly on browser
npx expo lint               # lint
npx tsc --noEmit            # type check
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
npx eas-cli@latest <cmd>    # EAS builds, submits, and updates (use instead of bare `eas`)
~~~

## Expo & Platform

- Universal application: must render seamlessly on Web (desktop & mobile browsers) and Mobile (Android / iOS) from a single shared codebase.
- Routes live in `src/app/`: file-based routing with Expo Router. Keep components, hooks, services, and types strictly outside `src/app/`.
- `ios/` and `android/` are generated. Never edit them manually; configure native properties in `app.json`.
- Expo Go only includes bundled native modules. When using custom native modules, run via web preview (`npx expo start --web`) or a development build.

## Who owns what

Each tool has one job. Ask before moving a responsibility to a different tool.

- **Data Source & API:** Hosted DummyJSON Custom Response endpoints (`https://dummyjson.com/c/<uuid>`) simulating Hopscotch's `/api/page/v12` (Discover layout) and `/api/products/` (Catalog & PDP). Handled via API service modules in `src/services/api.ts`.
- **Server-Driven UI (SDUI) Engine:** Dynamic layout factory in `src/components/sdui/` that maps server component types (`Hero`, `category_tree`, `shop_by_occasion`, `COLLECTION`, `CustomTiles`) to concrete UI widgets.
- **Server State & Caching:** TanStack Query (`@tanstack/react-query`) manages network fetching, background refetching, cache invalidation, and cursor pagination.
- **Client State & Persistence:** Zustand stores in `src/store/` managing Cart, Wishlist, and Active Filters, persisted to local browser storage (web) and `AsyncStorage` (mobile).
- **Aspect Ratio & Layout Stability:** Image cards and banners strictly enforce dimension-based aspect ratios (`aspectRatio = width / height`) parsed from incoming API metadata to eliminate Cumulative Layout Shift (CLS).
- **Styling:** NativeWind v5 (`nativewind@5.0.0-rc.0`, `react-native-css@3.1.0-rc.0`) with Tailwind CSS v4 (`tailwindcss@4.1.12`, `@tailwindcss/postcss@4.1.12`, `lightningcss@1.30.1`), configured via `postcss.config.mjs`, `metro.config.js` (`withNativewind`), `src/global.css`, and typed via `nativewind-env.d.ts`.
- **Design System:** Single source of truth in `src/theme/` (`colors.ts`, `spacing.ts`, `typography.ts`, `radius.ts`, `shadows.ts`, `motion.ts`) matching the Hopscotch brand:
  - Palette: Hopscotch Purple (`#67218C`), Hopscotch Pink (`#E91E63`), Playful Navy (`#1A237E`), Sunshine Yellow (`#FFB800`), Soft Teal (`#008A45`), Neutral Dark (`#282C3F`), Neutral Gray (`#757575`), Neutral Border (`#EAEAEC`), Canvas White (`#FFFFFF`), Light Background (`#F8F9FA`).
  - Shared primitives in `src/components/ui/` (`ThemedText`, `Button`, `Badge`, `ImageCard`, `PriceTag`, `HeaderBar`, `CartBadge`).
- **Navigation:** Root tabs at `src/app/(tabs)/` (`discover.tsx`, `categories.tsx`, `wishlist.tsx`, `cart.tsx`), Product Listing at `src/app/products/[id].tsx`, and Product Details at `src/app/product/[id].tsx`.

## Rules

- **No Custom Backend Required for Core UI:** The app consumes hosted DummyJSON endpoints directly without an intermediary server. Keep all mock data payloads organized and versioned in `src/data/mock/`.
- **Zero CLS (Cumulative Layout Shift):** Every banner and image tile must declare explicit aspect ratios from API dimensions (`width` and `height`) before the image binary downloads.
- **Strict Backward Compatibility in SDUI:** Unknown or unsupported component types from the API must gracefully render `null` with a development warning, never crashing the screen.
- **Variant Pricing Truth:** Never compute or hardcode single flat prices on the client. Always read variant-specific pricing (`retailPrice`, `regularPrice`, `discount`) from the SKU matrix (`simpleSkus`).
- **No hardcoded style literals:** Colors, radii, and font sizes must use theme tokens or NativeWind utility classes.
- Whenever you need input from the user, ask through your tool's built-in question panel so they pick from options instead of typing. Give two to four clear options with the recommended one first. Fall back to plain text only if no such panel exists.

## How we build features

For a new feature or a change across several files. Small fixes and questions skip this.

1. **Understand.** Read the code involved. Open an earlier plan only if this feature builds directly on it (pick by file name). Read current documentation for libraries used.
2. **Ask.** If a real decision is unclear (scope, visible behavior, data shape), ask in the question panel, batching questions into one round.
3. **Plan.** Copy `prompts/TEMPLATE.md` to `prompts/NN-feature-name.md` (next number) and fill it in. The plan must be self-contained.
4. **IMPORTANT: stop and wait.** Write no app code until the user approves the plan. Ask for approval in the question panel. On approval, set `Status: approved`.
5. **Build** step by step, checking each one. If a step turns out wrong, stop and explain instead of redesigning.
6. **Close out.**
   - Run the plan's Verification and give the report described under Reporting.
   - Add a short `## Result` to the plan and set `Status: done`.
   - Update this file: put each lasting decision in the section it belongs to. Keep this file under 150 lines.

## Building from designs

Screens must match the Hopscotch brand experience: vibrant, visual-heavy, fast-loading, and mobile-first.

- Test responsive layouts on mobile viewport and desktop web layouts (fluid container with max-width wrapper on desktop).
- Product cards must show: Image, Brand, Title, Selling Price (₹), Strike-through MRP, Discount badge (% off), and Quick Add / Wishlist trigger.
- Handle image fallback states (shimmer / skeleton while images resolve).

## Reporting

End every piece of work that changes code with this report:

- **Done:** one line on the outcome, then the files changed and what changed in each.
- **Verified:** each check with ✅ or ❌ and its evidence.
- **You need to:** numbered actions only the user can take (e.g., generating new DummyJSON URLs, env settings).
- **Test it yourself:** numbered steps to reproduce the result from a fresh start.
- **Notes:** defaults picked, trade-offs, and next steps.

## Checks

- Lint (`npx expo lint`) and type check (`npx tsc --noEmit`) pass before any task is called done.
- Screens handle loading (skeleton), error, and empty states.
- Cross-platform verification: runs cleanly on Web (`npx expo start --web`) and Mobile (`npx expo start`).
- Fallback checks: graceful handling of missing images, zero inventory, or network timeout.
