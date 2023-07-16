import { VNode } from "preact";
import { TargetedEvent } from "preact/compat";

type colorInputProps = {
  children?: VNode<any>;
  className?: string;
  placeholder?: string;
  required?: boolean;
  title?: string;
  name: string;
  onChange?: (e: TargetedEvent<HTMLInputElement, Event>) => void;
  value?: string;
};

export default function ColorInput({
  children,
  className,
  required,
  title,
  name,
  onChange,
  value,
}: colorInputProps) {
  return (
    <label class={`flex items-center gap-4 p-1 ${className}`}>
      <span class="text-lg">{title}</span>
      <div className="border-gray-600 border-4 rounded-xl p-5 py-3 w-full text-indigo-200 outline-none" style={`background: ${value};`}/>
      <input
        class="hidden"
        type="color"
        name={name}
        id={name}
        onInput={onChange}
        value={value}
        required={required}
      />
      {children}
    </label>
  );
}
