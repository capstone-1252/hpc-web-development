---
title: ClientOnly Reference
description: Definitions and usage of ClientOnly component
---
# ClientOnly

A lightweight React wrapper component for Astro static sites that renders its children **only after client-side hydration**.  
Useful for dynamic data, browser-only APIs, or any logic that must not run at build time.

---

## Import

```ts
import ClientOnly from "@/components/ClientOnly";
```

---

## Usage

```astro
<ClientOnly client:load fallback={<Spinner />}>
  <LiveData />
</ClientOnly>
```

The `client:*` directive controls **when hydration occurs**.  
`ClientOnly` controls **what renders after hydration**.

---

## Props

### `children`

```ts
children: React.ReactNode
```

Content to render once the component has mounted on the client.

**Required**

---

### `fallback`

```ts
fallback?: React.ReactNode
```

Optional content rendered during the initial render phase, before the client has mounted.

Defaults to `null`.

---

## Behavior

- Renders `fallback` during the first render
- Switches to `children` after `useEffect` runs
- `useEffect` guarantees execution **only in the browser**
- Safe for fully static builds
- No server-side rendering or server state involved

---

## Implementation Details

- Uses `useEffect` to detect client-side mount
- Avoids hydration mismatches
- Works with all Astro hydration directives:
  - `client:load`
  - `client:visible`
  - `client:idle`
  - `client:media`

---

## Example: Dynamic Data

```astro
<ClientOnly client:visible fallback={<Skeleton />}>
  <Chart />
</ClientOnly>
```

---

## When to Use

- Browser-only APIs (`window`, `localStorage`, `matchMedia`)
- Client-side data fetching (fetch(cockpitApi))
- Animations or observers
- Any dynamic behavior in a statically built Astro site

---

## Notes

- This component does **not** control hydration timing
- Astro handles hydration; React handles runtime behavior
- For data loading, compose with custom hooks or async wrappers

---

## See Also

- Astro Islands Architecture
- `client:load` / `client:visible`
- React `useEffect`

