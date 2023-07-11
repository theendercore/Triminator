import { TargetedEvent } from "preact/compat";

type RoundButtonProps = {
  children: string;
  className: string;
  onClick: (e: TargetedEvent<HTMLButtonElement, Event>) => void;
};
export default function RoundButton({
  children,
  className,
  onClick,
}: RoundButtonProps) {
  return (
    <button class={`rounded-lg p-4 py-2 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
