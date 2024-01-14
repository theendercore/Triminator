import {TargetedEvent} from "preact/compat";
import {VNode} from "preact";
import HoverComponent from "../HoverComponent.tsx";
import QuestionMark from "../../icons/QuestionMark.tsx";

type TextInputProps = {
    children?: string | VNode<any>;
    className?: string;
    required?: boolean;
    title?: string;
    name: string;
    onChange?: (e: TargetedEvent<HTMLInputElement, Event>) => void;
    fileName?: string;
    hoverText?: string;
};

export default function FileInput(
    {children, className, required, title, name, onChange, fileName, hoverText}: TextInputProps) {
    const isFile = fileName !== null && fileName !== undefined;
    return (
        <label className={`flex flex-col md:flex-row items-center justify-between md:gap-6 ${className}`}>
            <span className="text-lg font-semibold">{title}</span>
            <span className="flex gap-3 items-center">
                {children}
                <span
                    className={`bg-accent hover:bg-opacity-40 rounded-xl py-2 px-4 text-base w-[14.5rem]
                    ${isFile ? "bg-opacity-60" : "bg-opacity-20"}`}
                >
                    {isFile ? fileName : "Upload File..."}
                    <input
                        class="hidden"
                        type="file"
                        name={name}
                        id={name}
                        onInput={onChange}
                        required={required && !isFile}
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
