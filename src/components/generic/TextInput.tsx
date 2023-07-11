import { VNode } from "preact";
import { TargetedEvent } from "preact/compat";

type TextInputProps = {
  children?: VNode<any>;
  className?: string;
  placeholder?: string;
  required?: boolean;
  title?: string;
  name: string;
  onChange?: (e: TargetedEvent<HTMLInputElement, Event>) => void;
  value?: string;
};

export default function TextInput({
  children,
  className,
  placeholder,
  required,
  title,
  name,
  onChange,
  value,
}: TextInputProps) {
  return (
    <label class={`flex items-center gap-4 p-1 ${className}`}>
      <span class="text-xl">{title}</span>
      <input
        class="bg-gray-600 rounded-md p-2 py-1 text-indigo-200 outline-none"
        type="text"
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
