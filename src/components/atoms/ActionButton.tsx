interface ActionButtonProps {
  icon: string;
}

export function ActionButton({ icon }: ActionButtonProps) {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}
