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
    <label>
      {`${title}:`} <br />
      <input type="file" name={name} id={name} onInput={onChange} required />
      {children}
    </label>
  );
}
