import {useState} from "preact/hooks";

export default function Merger({}: { path: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 p-20 pt-5 text-left">
            <h1 class="text-2xl p-6 ">Work in Progress</h1>

            <h2 class="text-xl p-3">Debug stuff pls ignore! 😃</h2>
            <TestingBlock/>
        </ div>
    );

}


function TestingBlock() {
    const [dragItem, setDragItem] = useState<number>(0);
    const [list, setList] = useState([
        {text: "The Call Of Ktulu", color: "#ff0000"},
        {text: "For Whom The Bell Tolls", color: "#00FF00"},
        {text: "The Day That Never Comes", color: "#0000ff"},
        {text: "The Memory Remains", color: "#ffff00"},
        {text: "Confusion", color: "#ffffff"},
        {text: "Moth Into Flame", color: "#000000"},
        {text: "The Outlaw Torn", color: "#392b96"},
        {text: "No Leaf Clover", color: "#75da85"},
        {text: "Halo on Fire", color: "#9a6b00"},
    ]);
    const handleDragStart = (e: DragEvent, index: number) => {
        let img = document.createElement("img");
        img.src = "https://raw.githubusercontent.com/theendercore/Triminator/dev/public/empty.png";
        e.dataTransfer?.setDragImage(img, 0, 0)
        setDragItem(index);
    }

    const handleDragEnter = (index: number) => {
        const newList = [...list];
        const item = newList[dragItem];
        newList.splice(dragItem, 1);
        newList.splice(index, 0, item);
        setDragItem(index);
        setList(newList);
    }

    return (
        <>
            <ul className="flex flex-col gap-2">
                {list &&
                    list.map((item, index) => (
                        <li
                            class="flex flex-col gap-1 p-3 rounded-xl bg-slate-600 bg-opacity-25"
                            draggable
                            key={index}
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <div
                                className="flex items-center justify-between text-xl font-bold bg-accent p-2 rounded-xl bg-opacity-25">{item.text}
                                <div className="h-6 w-6 rounded-full" style={`background:${item.color};`}></div>
                            </div>
                            <div>Facny text box here</div>
                        </li>
                    ))}
            </ul>
        </>
    );
}

