"use client";

import { SearchOverlayProps } from "./search-types";


export function SearchOverlay({
  open,
  onClose,
}: SearchOverlayProps) {
  if (!open) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Close search"
      onClick={onClose}
      className="
        fixed
        inset-0
        z-40
        bg-black/20
        backdrop-blur-[1px]
      "
    />
  );
}