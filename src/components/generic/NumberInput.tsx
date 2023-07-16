import { VNode } from "preact";
import { TargetedEvent } from "preact/compat";

type NumberInputProps = {
  children?: VNode<any>;
  className?: string;
  placeholder?: string;
  required?: boolean;
  title?: string;
  name: string;
  onChange?: (e: TargetedEvent<HTMLInputElement, Event>) => void;
  value?: number;
};

export default function NumberInput({
  children,
  className,
  placeholder,
  required,
  title,
  name,
  onChange,
  value,
}: NumberInputProps) {
  return (
    <label class={`flex items-center gap-4 p-1 ${className}`}>
      <span class="text-lg">{title}</span>
      <input
        class="bg-gray-600 rounded-md p-2 py-1 text-indigo-200 outline-none"
        type="number"
        name={name}
        id={name}
        onInput={onChange}
        value={value}
        autocomplete="off"
        placeholder={placeholder}
        required={required}
      />
      {children}
    </label>
  );
}
