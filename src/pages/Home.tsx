import PrimaryButton from "../components/generic/btn/PrimaryButton.tsx";

export default function Home({}: { path: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 p-20 pt-5 text-left">
            <h3 class="text-xl">The Tool for the masses!</h3>
            <p>Triminator is a pack generation tool use for making armor trim datapacks & resource packs.</p>
            <p>So what are you waiting for? Go try them out! 🔫</p>
            <a href="/gen">
                <PrimaryButton className="text-3xl px-9 py-6 mt-4">
                    Triminate!
                </PrimaryButton>
            </a>
        </ div>
    );

}