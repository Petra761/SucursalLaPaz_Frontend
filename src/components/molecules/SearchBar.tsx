export function SearchBar() {
  return (
    <label className="relative flex items-center min-w-40 max-w-sm w-full md:w-80">
      <span className="material-symbols-outlined absolute left-3 text-gray-500 select-none">
        search
      </span>
      <input
        type="text"
        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-dark-gray dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-gray-700 bg-light-gray-bg dark:bg-background-dark h-10 placeholder:text-gray-500 pl-10 pr-4 text-sm font-normal leading-normal transition-all"
        placeholder="Buscar..."
      />
    </label>
  );
}
