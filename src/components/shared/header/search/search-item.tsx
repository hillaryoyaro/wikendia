"use client";

interface SearchItemProps {
  title: string;
  value: string;
  onClick: () => void;
}

export function SearchItem({
  title,
  value,
  onClick,
}: SearchItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full
        rounded-full
        px-6
        py-2
        text-left
        transition
        hover:bg-ink-100
      "
    >
      <span className="block text-xs font-semibold text-ink-900">
        {title}
      </span>

      <span className="block truncate text-sm text-ink-500">
        {value}
      </span>
    </button>
  );
}