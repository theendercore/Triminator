import { TargetedEvent } from "preact/compat";

type TextInputProps = {
  children?: string;
  title: string;
  name: string;
  onChange: (e: TargetedEvent<HTMLInputElement, Event>) => void;
};

export default function ImageInput({
  children,
  title,
  name,
  onChange,
}: TextInputProps) {
  return (
    <label class="flex flex-col items-center">
      {`${title}:`} <br />
      <span class="px-2 bg-slate-500 rounded-md hover:bg-slate-400">
        Upload File...
      </span>
      <input
        class="hidden"
        type="file"
        name={name}
        id={name}
        onInput={onChange}
        accept="image/png"
        required
      />
      {children}
    </label>
  );
}
