import {VNode} from "preact";
import {TargetedEvent} from "preact/compat";
import RoundButton from "./RoundButton.tsx";


type AccentButtonProps = {
    children?: VNode<any> | Element | string;
    className?: string;
    onClick?: (e: TargetedEvent<HTMLButtonElement, Event>) => void;
    type?: string;
    disabled?: boolean;
    fromField?: string;
};

export default function AccentButton({
                                            children, className, onClick, type, disabled, fromField,
                                        }: AccentButtonProps) {
    return (
        <RoundButton
            className={`bg-accent ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
            fromField={fromField}
        >
            {children}
        </RoundButton>
    )
}