interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
      Search posts
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by title or excerpt"
        className="h-12 rounded-2xl border border-border/70 bg-surface px-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}
