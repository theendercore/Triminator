import { useState } from "preact/hooks";
import {VNode} from "preact";

type HoverComponentProps = {
    children?: string | VNode<any> | Element
    className?: string
    text?: string
}
export default function HoverComponent({className, children, text,}: HoverComponentProps) {
    const [visible, setVisible] = useState(false)
    return (
        <div class={`relative ${className}`}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
                >
                {children}
                <div class="absolute p-5 pb-10 top-[-.5rem] right-[-.5rem]"></div>
                    {visible && <div
                        class={`absolute translate-x-[-50%] translate-y-2 py-2 px-4 rounded-xl bg-background-2 bg-opacity-85 w-max z-10`}>
                        <span class="flex flex-wrap max-w-[10rem] md:max-w-[16rem] text-sm">{text}</span>
                    </div>
                }
            </div>
    )
}