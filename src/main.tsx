import { render } from "preact";
import "./index.css";
import Home from "./pages/Home";
import Router from "preact-router";
import Generator from "./pages/Generator";
import Error from "./pages/Error";

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
        href="/omg"
        class="p-4 py-2 rounded-md bg-slate-700 hover:bg-stone-700"
      >
        OMG
      </a>
    </nav>
  </header>
);

const Main = () => (
  <div class="flex flex-col items-center justify-center">
    <Header />
    <Router>
      <Home path="/" />
      <Generator path="/gen" />
      <Error type="404" default />
    </Router>
  </div>
);

render(<Main />, document.getElementById("app")!);
