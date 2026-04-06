import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';

export interface ContextMenuProps {
  x: number;
  y: number;
  isPlaying: boolean;
  isFullscreen: boolean;
  hasMultipleVideos: boolean;
  t: {
    play: string;
    pause: string;
    stop: string;
    previous: string;
    nextVideo: string;
    settings: string;
    playlist: string;
    exitApp: string;
    fullscreen: string;
    windowscreen: string;
  };
  onClose: () => void;
  onPlayPause: () => void;
  onStop: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSettings: () => void;
  onPlaylist: () => void;
  onFullscreen: () => void;
  onExit: () => void;
}

export function ContextMenu({
  x, y, isPlaying, isFullscreen, hasMultipleVideos, t,
  onClose, onPlayPause, onStop, onPrevious, onNext,
  onSettings, onPlaylist, onFullscreen, onExit,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState({ x, y });

  useLayoutEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const clampedX = Math.min(x, window.innerWidth - width - 4);
    const clampedY = Math.min(y, window.innerHeight - height - 4);
    setPos({ x: Math.max(0, clampedX), y: Math.max(0, clampedY) });
  }, [x, y]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const item = (label: string, action: () => void) => (
    <li key={label}>
      <button
        className="w-full text-left px-4 py-1.5 text-sm hover:bg-theme-bg-tertiary transition-colors whitespace-nowrap"
        onMouseDown={(e) => {
          e.stopPropagation();
          action();
          onClose();
        }}
      >
        {label}
      </button>
    </li>
  );

  const sep = (key: string) => (
    <li key={key} role="separator">
      <hr className="border-theme-border my-1" />
    </li>
  );

  const menuItems: React.ReactNode[] = [
    item(isPlaying ? t.pause : t.play, onPlayPause),
    item(t.stop, onStop),
  ];

  if (hasMultipleVideos) {
    menuItems.push(sep('sep1'));
    menuItems.push(item(t.previous, onPrevious));
    menuItems.push(item(t.nextVideo, onNext));
    menuItems.push(item(t.playlist, onPlaylist));
  }

  menuItems.push(sep('sep2'));
  menuItems.push(item(isFullscreen ? t.windowscreen : t.fullscreen, onFullscreen));
  menuItems.push(sep('sep3'));
  menuItems.push(item(t.settings, onSettings));
  menuItems.push(item(t.exitApp, onExit));

  return (
    <ul
      ref={menuRef}
      data-testid="context-menu"
      className="fixed z-[70] min-w-[160px] bg-theme-bg border border-theme-border rounded-md shadow-xl py-1 text-theme-text"
      style={{ left: pos.x, top: pos.y }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {menuItems}
    </ul>
  );
}
