import {useState} from "preact/hooks";
import SecondaryButton from "./btn/SecondaryButton.tsx";

type CodePreProps = { children?: string; className?: string };
export default function CodePre({children, className}: CodePreProps) {
    const [open, setOpen] = useState(false)
    return (<pre
        class={`p-2 x-1 rounded-lg text-neutral-500 flex items-center justify-center flex-col ${className} ${open && "bg-neutral-800"}`}>
        <SecondaryButton className="w-max px-3 text-white"
                         onClick={() => setOpen(!open)}>{open ? "-" : "+"}</SecondaryButton>
        {open && children}
        </pre>);
}
