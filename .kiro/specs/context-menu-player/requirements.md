# Requirements Document

## Introduction

This feature adds a right-click context menu to the DoggyStyle Player media player area. The menu provides quick access to common playback controls and navigation, styled similarly to VLC's context menu. All menu item labels must reflect the currently active language (Swedish or English) and update immediately when the user changes language in Settings.

## Glossary

- **Context_Menu**: The overlay menu that appears when the user right-clicks inside the video/player area.
- **Player**: The DoggyStyle Player React + Electron application (`src/App.tsx`).
- **Playlist**: The ordered list of video items managed by the `playlist` state array.
- **Current_Video**: The video at `playlist[currentIndex]`.
- **Language**: The active locale, either `'sv'` (Swedish) or `'en'` (English), stored in the `language` state.
- **Translation**: The `translations[language]` object that maps translation keys to display strings.

---

## Requirements

### Requirement 1: Display Context Menu on Right-Click

**User Story:** As a user, I want a context menu to appear when I right-click inside the player area, so that I can quickly access playback controls without using the bottom toolbar.

#### Acceptance Criteria

1. WHEN the user right-clicks anywhere inside the video/player area, THE Context_Menu SHALL appear at the cursor position.
2. WHEN the Context_Menu is visible and the user left-clicks outside of it, THE Context_Menu SHALL close.
3. WHEN the Context_Menu is visible and the user presses the Escape key, THE Context_Menu SHALL close.
4. WHEN the Context_Menu is visible and the user right-clicks again inside the player area, THE Context_Menu SHALL reposition to the new cursor location.
5. THE Player SHALL suppress the browser's native context menu inside the player area when the custom Context_Menu is active.

---

### Requirement 2: Context Menu Items and Conditional Visibility

**User Story:** As a user, I want the context menu to show relevant actions based on the current playlist state, so that I only see options that are applicable.

#### Acceptance Criteria

1. THE Context_Menu SHALL always display the following items in order: Play/Pause, Stop, Settings, Exit.
2. WHEN the Playlist contains more than one video, THE Context_Menu SHALL also display: Previous, Next Video, Playlist — inserted between Stop and Settings.
3. WHEN the Playlist contains one or zero videos, THE Context_Menu SHALL NOT display the Previous, Next Video, or Playlist items.
4. WHEN the Current_Video is playing, THE Context_Menu SHALL display the pause label for the Play/Pause item.
5. WHEN the Current_Video is paused or stopped, THE Context_Menu SHALL display the play label for the Play/Pause item.

---

### Requirement 3: Context Menu Item Actions

**User Story:** As a user, I want each context menu item to trigger the correct player action, so that I can control playback from the menu.

#### Acceptance Criteria

1. WHEN the user clicks the Play/Pause item, THE Player SHALL toggle playback (play if paused, pause if playing).
2. WHEN the user clicks the Stop item, THE Player SHALL stop playback and reset the current video position to 0.
3. WHEN the user clicks the Previous item, THE Player SHALL navigate to the previous video in the Playlist.
4. WHEN the user clicks the Next Video item, THE Player SHALL navigate to the next video in the Playlist.
5. WHEN the user clicks the Settings item, THE Player SHALL open the Settings modal.
6. WHEN the user clicks the Playlist item, THE Player SHALL toggle the playlist sidebar panel.
7. WHEN the user clicks the Exit item, THE Player SHALL close the application.
8. WHEN any Context_Menu item is clicked, THE Context_Menu SHALL close after the action is executed.

---

### Requirement 4: Language Support

**User Story:** As a user, I want all context menu labels to be in my chosen language, so that the menu is consistent with the rest of the UI.

#### Acceptance Criteria

1. THE Context_Menu SHALL render all item labels using the active Translation object.
2. WHEN the Language is set to `'sv'`, THE Context_Menu SHALL display: "Spela upp" (or "Pausa"), "Stoppa", "Föregående", "Nästa Video", "Inställningar", "Spellista", "Avsluta".
3. WHEN the Language is set to `'en'`, THE Context_Menu SHALL display: "Play" (or "Pause"), "Stop", "Previous", "Next Video", "Settings", "Playlist", "Exit".
4. WHEN the user changes Language in Settings, THE Context_Menu SHALL reflect the new language the next time it is opened.

---

### Requirement 5: Context Menu Appearance

**User Story:** As a user, I want the context menu to look consistent with the player's theme, so that it feels like a native part of the application.

#### Acceptance Criteria

1. THE Context_Menu SHALL use the active theme's CSS variables (`bg-theme-bg`, `text-theme-text`, `border-theme-border`, `hover:bg-theme-bg-tertiary`) for its background, text, border, and hover states.
2. THE Context_Menu SHALL display a visual separator between the Stop item and the Settings item (or between Stop and Previous when playlist items are present).
3. THE Context_Menu SHALL remain fully within the visible viewport bounds; IF the menu would overflow the right or bottom edge, THE Context_Menu SHALL reposition to stay within the viewport.
4. THE Context_Menu SHALL appear above all other UI elements (z-index higher than the playlist sidebar and settings modal).
