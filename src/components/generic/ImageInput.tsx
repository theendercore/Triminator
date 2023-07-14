import { TargetedEvent } from "preact/compat";

type TextInputProps = {
  children?: string;
  className?: string;
  required?: boolean;
  title?: string;
  name: string;
  onChange?: (e: TargetedEvent<HTMLInputElement, Event>) => void;
  fileName?: string;
};

export default function ImageInput({
  children,
  className,
  required,
  title,
  name,
  onChange,
  fileName,
}: TextInputProps) {
  const isfile = fileName !== null && fileName !== undefined;

  return (
    <label class={`flex items-center gap-4 p-1 ${className}`}>
      <span class="text-lg">{title}</span>
      <span
        class={`rounded-md p-2 py-1 text-indigo-200 hover:bg-gray-500 ${
          isfile ? "bg-gray-600" : "bg-gray-700"
        }`}
      >
        {isfile ? fileName : "Upload File..."}
        <input
          class="hidden"
          type="file"
          name={name}
          id={name}
          onInput={onChange}
          accept="image/png"
          required={required}
        />
      </span>
      {children}
    </label>
  );
}
