import {createContext, render} from "preact";
import "./index.css";
import PatternPrototype from "./pages/PatternPrototype.tsx";
import Router from "preact-router";
import Generator from "./pages/Generator";
import Error from "./pages/Error";
import Home from "./pages/Home.tsx";
import MaterialPrototype from "./pages/MaterialPrototype.tsx";

const Debug = createContext(true);

const Header = () => (
    <header class="p-5 pt-10 flex flex-col gap-2 items-center">
        <h1 className="text-center text-7xl">Triminator</h1>
        <nav class="flex gap-6">
            <a href="/" class="p-4 py-2 rounded-md bg-slate-700 hover:bg-stone-700">
                Home
            </a>
            <a
                href="/gen"
                class="p-4 py-2 rounded-md bg-slate-700 hover:bg-stone-700"
            >
                Generator
            </a>
            <a
                href="/proto/pat"
                className="p-4 py-2 rounded-md bg-slate-700 hover:bg-stone-700"
            >
                Pattern<span class="italic text-slate-500">(Prototype)</span> Gen
            </a>
            <a
                href="/proto/mat"
                className="p-4 py-2 rounded-md bg-slate-700 hover:bg-stone-700"
            >
                Matterial<span className="italic text-slate-500">(Prototype)</span> Gen
            </a>
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
                <PatternPrototype path="/proto/pat"/>
                <MaterialPrototype path="/proto/mat"/>
                <Error type="404" default/>
            </Router>
        </div>
    </Debug.Provider>
);

render(<Main/>, document.getElementById("app")!);
