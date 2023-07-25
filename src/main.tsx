import {createContext, render} from "preact";
import "./index.css";
import Router from "preact-router";
import Generator from "./pages/Generator";
import Error from "./pages/Error";
import Home from "./pages/Home.tsx";
import SecondaryButton from "./components/generic/btn/SecondaryButton.tsx";
import Merger from "./components/gen/v1/Merger.tsx";

const Debug = createContext(true);

const Header = () => (
    <header class="p-5 md:px-20 mb-8 bg-accent bg-opacity-10 w-full drop-shadow">
        <nav class="flex gap-8 items-center justify-between flex-col md:flex-row">
            <h1 className="text-5xl">Triminator</h1>
            <div class="gap-6 flex">
                <a href="/"><SecondaryButton>Home</SecondaryButton></a>
                <a href="/gen"><SecondaryButton>Generator</SecondaryButton></a>
                <a href="/merge"><SecondaryButton>Pack Merger</SecondaryButton></a>
            </div>
        </nav>
    </header>
);

const Main = () => (
    <Debug.Provider value>
        <div class="flex flex-col items-center justify-center">
            <Header/>
            <Router>
                <Home path="/"/>
                <Generator path="/gen"/>
                <Merger path="/merge"/>
                <Error type="404" default/>
            </Router>
        </div>
    </Debug.Provider>
);

render(<Main/>, document.getElementById("app")!);
