import { ActionButton } from "../atoms/ActionButton";

export function HeaderActions() {
  return (
    <div className="flex gap-2">
      <ActionButton icon="notifications" />
      <ActionButton icon="mail" />
      <ActionButton icon="light_mode" />
    </div>
  );
}