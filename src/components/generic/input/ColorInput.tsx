import {VNode} from "preact";
import {TargetedEvent} from "preact/compat";
import HoverComponent from "../HoverComponent.tsx";
import QuestionMark from "../../icons/QuestionMark.tsx";

type colorInputProps = {
    children?: VNode<any>;
    className?: string;
    placeholder?: string;
    required?: boolean;
    title?: string;
    name: string;
    onChange?: (e: TargetedEvent<HTMLInputElement, Event>) => void;
    value?: string;
    hoverText?: string;
};

export default function ColorInput(
    {children, className, required, title, name, onChange, value, hoverText}: colorInputProps) {
    return (
        <label class={`flex items-center justify-between gap-6 ${className}`}>
            <span class="text-lg font-semibold">{title}</span>
            <span class="flex gap-3 items-center">
                {children}
                <span
                    className="bg-accent bg-opacity-20 hover:bg-opacity-40 rounded-full p-[.35rem] w-[14.5rem]"
                >
                    <div className="rounded-full p-5 py-3 w-full text-indigo-200 outline-none"
                         style={`background: ${value};`}/>
                      <input
                          class="hidden"
                          type="color"
                          name={name}
                          id={name}
                          onInput={onChange}
                          value={value}
                          required={required}
                      />
                </span>
                {hoverText &&
                    <HoverComponent text={hoverText}>
                        <QuestionMark className="fill-text opacity-75 w-6 h-6"/>
                    </HoverComponent>
                }
            </span>
        </label>
    );
}
