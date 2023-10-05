import {Fragment} from "preact";
import {Dialog, Transition} from "@headlessui/react";

type CustomModalProps = {
    isOpen: boolean;
    closeModal: ()=>void;
}

export default function CustomModal({isOpen, closeModal}:CustomModalProps){
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="
                                    w-full max-w-md transform overflow-hidden
                                     rounded-3xl bg-[#32303A] p-6 text-left align-middle shadow-xl transition-all
                                     text-text flex flex-col gap-3">
                                <Dialog.Title className="text-xl font-medium leading-6">
                                    Your download will start shortly.
                                </Dialog.Title>
                                <p class="pb-4">Please wait!</p>
                                <button onClick={closeModal} class="rounded-xl p-2 bg-secondary hover:bg-opacity-100 bg-opacity-50">
                                    Close
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}