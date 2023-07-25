import {VNode} from "preact";
import {TargetedEvent} from "preact/compat";
import RoundButton from "./RoundButton.tsx";


type PrimaryButtonProps = {
    children?: VNode<any> | string;
    className?: string | undefined;
    onClick?: (e: TargetedEvent<HTMLButtonElement, Event>) => void;
    type?: string;
    disabled?: boolean;
    fromField?: string;
};

export default function PrimaryButton({
                                          children,
                                          className,
                                          onClick,
                                          type,
                                          disabled,
                                          fromField,
                                      }: PrimaryButtonProps) {
    return (
        <RoundButton
            className={`rounded-lg p-2 bg-primary ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
            fromField={fromField}
        >
            {children}
        </RoundButton>
    )
}