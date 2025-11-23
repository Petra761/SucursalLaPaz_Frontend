import { SectionTitle } from "../atoms/SectionTitle";
import { Avatar } from "../atoms/Avatar";
import { SearchBar } from "../molecules/SearchBar";
import { HeaderActions } from "../molecules/HeaderActions";

export function Header() {
  const userImage =
    "https://i.pinimg.com/1200x/6f/ff/20/6fff20e5ece5c87a29ac7fab195627ef.jpg";

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-border-color-light dark:border-border-color-dark bg-white dark:bg-gray-900 px-6 py-4 sticky top-0 z-10">
      <div className="flex-shrink-0">
        <SectionTitle title="Dashboard General" />
      </div>

      <div className="flex flex-1 justify-end gap-6 items-center pl-4">
        <SearchBar />

        <div className="flex items-center gap-4 md:gap-6">
          <HeaderActions />
          <Avatar src={userImage} />
        </div>
      </div>
    </header>
  );
}
