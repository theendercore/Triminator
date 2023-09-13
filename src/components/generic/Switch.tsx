import { VNode } from "preact";
import { Switch } from "@headlessui/react";
import {StateUpdater} from "preact/hooks";
import HoverComponent from "./HoverComponent";
import QuestionMark from "../icons/QuestionMark";

type SwitchProps = {
  children?: VNode<any> | Element | string;
  className?: string;
  state: boolean;
  onChange: StateUpdater<boolean>;
  title?: string;
  lable?: string
  hoverText?: string;
};

export default function StyledSwitch({className, state, onChange, title,lable, hoverText}: SwitchProps) {
  return (
    
    <label class={`flex items-center justify-center gap-6 ${className}`}>
      <span class="text-lg font-semibold">{title}</span>
      
        <Switch
          checked={state}
          onChange={onChange}
          className={`${state ? 'bg-secondary bg-opacity-75' : 'bg-accent bg-opacity-20'}
           cursor-pointer relative border-transparent transition-colors duration-200 ease-in-out rounded-full
           w-[74px] inline-flex border-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent shrink-0
          `}
          >
          <span className="sr-only">{lable}</span>
          <span
            aria-hidden="true"
            className={`${state ? 'translate-x-9 opacity-100' : 'translate-x-0 opacity-80'}
              pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full  bg-text ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        {hoverText &&
            <HoverComponent text={hoverText}>
              <QuestionMark className="fill-text opacity-75 w-6 h-6"/>
            </HoverComponent>
        }
      
    </label>
  );
}
