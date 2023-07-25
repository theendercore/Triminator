import {useState} from "preact/hooks";
import {VNode} from "preact";

type HoverComponentProps = {
    children?: string | VNode<any> | Element
    className?: string
    text?: string
}
export default function HoverComponent({className, children, text}: HoverComponentProps) {
    const [visible, setVisible] = useState(false)
    return (
        <div class={`relative ${className}`}
             onMouseEnter={() => setVisible(true)}
             onMouseLeave={() => setVisible(false)}
        >
            {children}
            <div class="absolute p-5 pl-3 pr-10 z-10 bottom-[-.5rem]"></div>
            {visible && <div
                    class={`absolute left-8 top-[-.5rem] py-2 px-4 rounded-xl bg-background-2 bg-opacity-85 w-max z-10`}>
                    <span class="flex flex-wrap max-w-xs text-sm">{text}</span>
                </div>
            }
        </div>)
}