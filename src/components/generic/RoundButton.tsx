import { VNode } from "preact";
import { TargetedEvent } from "preact/compat";

type RoundButtonProps = {
  children?: VNode<any> | string;
  className?: string;
  onClick?: (e: TargetedEvent<HTMLButtonElement, Event>) => void;
  type?: string;
  disabled?: boolean;
  from?: string;
};
export default function RoundButton({
  children,
  className,
  onClick,
  type,
  disabled,
  from,
}: RoundButtonProps) {
  return (
    <button
      form={from}
      class={`rounded-lg p-4 py-2 ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
