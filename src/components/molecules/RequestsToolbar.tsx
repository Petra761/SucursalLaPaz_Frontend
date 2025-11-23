interface RequestsToolbarProps {
  onCreateClick: () => void;
}

export function RequestsToolbar({ onCreateClick }: RequestsToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-border-color-light dark:border-border-color-dark mb-6">
      <div className="flex-1">
        <label className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-gray-400">
            search
          </span>
          <input
            type="text"
            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-dark-gray dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 h-10 placeholder:text-gray-400 pl-10 text-sm font-normal leading-normal"
            placeholder="Buscar por código o solicitante..."
          />
        </label>
      </div>

      <div className="flex gap-2 justify-end">
        <button className="flex items-center justify-center rounded-lg h-10 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 gap-2 text-sm font-bold px-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <span className="material-symbols-outlined text-base">
            filter_list
          </span>
          <span className="hidden sm:inline">Filtrar</span>
        </button>
        <button
          onClick={onCreateClick}
          className="flex items-center justify-center rounded-lg h-10 bg-primary text-white gap-2 text-sm font-bold px-4 hover:bg-primary/90 transition-colors"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span className="hidden sm:inline">Crear solicitud</span>
        </button>
      </div>
    </div>
  );
}
