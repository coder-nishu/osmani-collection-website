const filterOptions = ["all", "sweet", "strong", "fresh"];

export default function FilterBar({ activeFilter, onFilterChange, sortBy, onSortChange }) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-[color:var(--color-primary)]/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => {
          const isActive = activeFilter === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onFilterChange(option)}
              className={`rounded-full border border-[color:var(--color-primary)] bg-[color:var(--color-primary)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[color:var(--color-accent)] transition-all duration-300 ${
                isActive
                  ? "ring-2 ring-[color:var(--color-accent)]/55"
                  : "opacity-85 hover:-translate-y-0.5 hover:opacity-100"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <label className="flex items-center gap-2 text-sm text-[color:var(--color-primary)]/75">
        Sort
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="rounded-full border border-[color:var(--color-primary)]/20 bg-[color:var(--color-bg)] px-4 py-2 text-sm text-[color:var(--color-primary)] outline-none"
        >
          <option value="default">Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </label>
    </div>
  );
}
