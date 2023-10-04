import ItemRender from "../../generic/ItemRender.tsx";
import Trash from "../../icons/Trash.tsx";
import Pencil from "../../icons/Pencil.tsx";
import SecondaryButton from "../../generic/btn/SecondaryButton.tsx";

type MaterialProps = {
    material: MaterialData;
    remove: (id: string) => void;
    edit: (id: string) => void;
    isOpen: boolean
    advanced: boolean
};

export default function Material({material, remove, edit, isOpen, advanced}: MaterialProps) {

    return (
        <div class="grid place-items-center bg-secondary bg-opacity-40 px-8 py-4 rounded-3xl relative">
            <span className="flex flex-col md:flex-row md:gap-3 items-center">
                <span>
                    {material.translation}
                    <span className={`text-text opacity-50 ${ advanced ? "inline" : "hidden"}`}>{`(${material.name})`}</span>
                </span>

                <span class="hidden md:inline">|</span>
                <ItemRender item={`minecraft:${material.item}`} width={32} height={32}/>
                <span class="hidden md:inline">|</span>

                  {material.palletTexture &&
                      <img src={URL.createObjectURL(material.palletTexture)}
                           class="pixel-art text-center" height={16} width={128} alt=""/>
                  }
            </span>


            <div class="flex gap-2 absolute right-3 ">
                <SecondaryButton
                    className={isOpen ? "cursor-not-allowed hover:scale-100" : " "}
                    onClick={() => (!isOpen) && edit(material.id)}
                >
                    <Pencil className="fill-accent"></Pencil>
                </SecondaryButton>
                <SecondaryButton
                    onClick={() => remove(material.id)}
                >
                    <Trash className="fill-accent"></Trash>
                </SecondaryButton>
            </div>
        </div>
    );
}
