import { VNode } from "preact";
import { TargetedEvent } from "preact/compat";

type RoundButtonProps = {
  children?: VNode<any> | string | Element;
  className?: string;
  onClick?: (e: TargetedEvent<HTMLButtonElement, Event>) => void;
  type?: string;
  disabled?: boolean;
  fromField?: string;
};
export default function RoundButton({
  children,
  className,
  onClick,
  type,
  disabled,
  fromField,
}: RoundButtonProps) {
  return (
    <button
      form={fromField}
      class={`rounded-xl p-2 hover:scale-110 ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
