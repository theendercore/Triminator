import {VNode} from "preact";
import {TargetedEvent} from "preact/compat";
import RoundButton from "./RoundButton.tsx";


type PrimaryButtonProps = {
    children?: VNode<any> | Element | string;
    className?: string;
    onClick?: (e: TargetedEvent<HTMLButtonElement, Event>) => void;
    type?: string;
    disabled?: boolean;
    fromField?: string;
};

export default function SecondaryButton({
                                            children, className, onClick, type, disabled, fromField,
                                        }: PrimaryButtonProps) {
    return (
        <RoundButton
            className={`bg-secondary ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
            fromField={fromField}
        >
            {children}
        </RoundButton>
    )
}