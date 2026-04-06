# Tasks: Context Menu Player

## Task List

- [x] 1. Add translation keys for context menu labels
  - [x] 1.1 Add `play`, `pause`, `stop`, `previous`, `nextVideo`, `exitApp` keys to both `sv` and `en` objects in `src/App.tsx`

- [x] 2. Create ContextMenu component
  - [x] 2.1 Create `src/ContextMenu.tsx` with the `ContextMenuProps` interface and component implementation
  - [x] 2.2 Implement viewport-clamping logic using `useLayoutEffect` to keep the menu within bounds
  - [x] 2.3 Implement outside-click detection via `document` `mousedown` listener
  - [x] 2.4 Implement Escape key detection via `document` `keydown` listener
  - [x] 2.5 Render conditional Previous/Next/Playlist items when `hasMultipleVideos` is true
  - [x] 2.6 Render separator `<hr>` between Stop and the next item (Settings or Previous)
  - [x] 2.7 Apply theme CSS variables: `bg-theme-bg`, `text-theme-text`, `border-theme-border`, `hover:bg-theme-bg-tertiary`
  - [x] 2.8 Apply a z-index higher than the playlist sidebar (`z-[60]` or higher)

- [x] 3. Wire ContextMenu into App
  - [x] 3.1 Add `contextMenu` state (`{ x: number; y: number } | null`) to `App`
  - [x] 3.2 Add `handleContextMenu` handler that calls `e.preventDefault()` and sets `contextMenu` state
  - [x] 3.3 Attach `onContextMenu={handleContextMenu}` to the video container `div` (the one with `ref={containerRef}`)
  - [x] 3.4 Render `<ContextMenu>` inside `App` when `contextMenu` is not null, passing all required props
  - [x] 3.5 Implement the Exit action: call `window.require('electron').remote?.app.quit()` or send an IPC quit message; fall back gracefully if not in Electron

- [x] 4. Write tests
  - [x] 4.1 Write unit tests for `ContextMenu` covering: items present/absent based on `hasMultipleVideos`, play/pause label based on `isPlaying`, language labels for `sv` and `en`, each item click calls its callback and `onClose`
  - [x] 4.2 Write unit test asserting the separator is rendered in the correct position
  - [x] 4.3 Write unit test asserting the correct z-index class is applied
  - [x] 4.4 Write property-based tests using fast-check:
    - P1: for any `(x, y)`, right-click sets contextMenu to that position
    - P5: for any playlist length, navigation items shown iff length > 1
    - P6: for any `isPlaying` value, label matches expected translation key
    - P8: for any language, all labels match `translations[language]`
    - P9: for any position near viewport edges, clamped position keeps menu in bounds
