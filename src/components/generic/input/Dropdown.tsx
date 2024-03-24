import {Listbox} from '@headlessui/react'
import {VNode} from "preact";
import {useState} from "preact/hooks";
import HoverComponent from "../HoverComponent.tsx";
import QuestionMark from "../../icons/QuestionMark.tsx";
import CaretDown from "../../icons/CaretDown.tsx";

type dropdownProps = {
    children?: VNode<any>;
    className?: string;
    title?: string;
    hoverText?: string;
    selected: string;
    setSelected: (e: string) => void;
    list: string[];
};

export default function Dropdown({children, className, title, hoverText, selected, setSelected, list}: dropdownProps) {
    const [state, setState] = useState(false)

    return (
        <div class={`flex flex-col md:flex-row items-center justify-between md:gap-6 ${className}`}>
            <span class="text-lg font-semibold">{title}</span>
            <span class="flex gap-3 items-center">
                {children}
                <div class="w-[14.5rem] relative"><Listbox value={selected} onChange={(e) => {
                    setState(false)
                    setSelected(e)
                }}>
                    <Listbox.Button
                        onClick={() => setState(!state)}
                        className="bg-accent bg-opacity-20 rounded-xl py-2 px-4 text-base w-full cursor-default outline-none focus-visible:outline-accent outline-4 flex justify-between">
                        <span className="block truncate">{selected}</span>
                        <CaretDown className={`fill-text opacity-60 ${state && "rotate-180"}`}/>
                    </Listbox.Button>
                    <Listbox.Options
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-3xl bg-[#43404E] text-base shadow-lg focus:outline-none">
                        {list.map((item, index) => (
                            <Listbox.Option
                                key={index}
                                value={item}
                                className={
                                    ({active}) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 
                                    ${active ? 'bg-secondary bg-opacity-30 text-accent' : 'text-text'}`}
                            >{item}</Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Listbox></div>
                {hoverText &&
                    <HoverComponent text={hoverText}>
                        <QuestionMark className="fill-text opacity-75 w-6 h-6"/>
                    </HoverComponent>
                }
            </span>
        </div>
    )
}