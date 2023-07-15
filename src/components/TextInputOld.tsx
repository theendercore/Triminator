import { TargetedEvent } from "preact/compat";
import {VNode} from "preact";

type TextInputProps = {
  children?: string | VNode<any>;
  title: string;
  name: string;
  onChange: (e: TargetedEvent<HTMLInputElement, Event>) => void;
  val: string;
};

export default function TextInput({
  children,
  title,
  name,
  onChange,
  val,
}: TextInputProps) {
  return (
    <label>
      {`${title}:`} <br />
      <input
        class="bg-gray-600 rounded p-2 py-1 text-indigo-200"
        type="text"
        name={name}
        id={name}
        onInput={onChange}
        value={val}
        required
      />
      {children}
    </label>
  );
}
