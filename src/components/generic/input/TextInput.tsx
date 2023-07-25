import {VNode} from "preact";
import {TargetedEvent} from "preact/compat";
import QuestionMark from "../../icons/QuestionMark.tsx";
import HoverComponent from "../HoverComponent.tsx";

type TextInputProps = {
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

export default function TextInput(
    {children, className, placeholder, required, title, name, onChange, value, hoverText}: TextInputProps) {
    return (
            <label class={`flex items-center justify-between w-full gap-6 ${className}`}>
                <span class="text-lg font-semibold">{title}</span>
                <span class="flex gap-3 items-center">
                    {children}
                    <input
                        class="bg-accent bg-opacity-20 rounded-xl py-2 px-4 text-base
                        outline-none focus-visible:outline-accent outline-4"
                        type="text"
                        name={name}
                        id={name}
                        onInput={onChange}
                        value={value}
                        autocomplete="off"
                        placeholder={placeholder}
                        required={required}
                    />
                        {hoverText &&
                            <HoverComponent text={hoverText}>
                                <QuestionMark className="fill-text opacity-75 w-6 h-6"/>
                            </HoverComponent>
                        }
                </span>
            </label>

    );
}
