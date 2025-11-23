export function BrandHeader() {
  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <div className="text-primary size-10 flex items-center justify-center">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "32px" }}
        >
          auto_awesome_mosaic
        </span>
      </div>
      <div className="flex flex-col">
        <h1 className="text-dark-gray dark:text-gray-100 text-base font-bold leading-normal">
          Mipalo Milk
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
          Dashboard
        </p>
      </div>
    </div>
  );
}
