export default function Home({}: { path: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 p-20 pt-5 text-left">
            <h3 class="text-xl">The Tool for the masses!</h3>
            <p>Triminator is a pack generation tool use for making datapacks & resource packs.</p>
            <p>The site is split up in to to parts:
                <ul class="text-sm list-disc pl-6">
                    <li>The Main Generator</li>
                    <li>The Prototype<span class="italic text-slate-400">(Old)</span> Generator</li>
                </ul>
            </p>
            <p>So what are you waiting for? Go try them out! :gun:</p>

            <span class="italic text-slate-400 absolute bottom-8">PS. Material generation has not been added yet</span>
        </ div>
    );

}