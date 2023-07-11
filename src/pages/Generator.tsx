import { useState } from "preact/hooks";
import { getEmptyPack } from "../api/v1/consts";
import CodePre from "../components/generic/CodePre";
import { format } from "../api/Util";
import GenHeader from "../components/gen/v1/GenHeader";

export default function Generator({ path }: { path: string }) {
  const [packData, setPackData] = useState<PackContextData>(getEmptyPack());
  return (
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-2xl font-semibold py-4">
        {packData.name.trim() === "" ? "Trim" : packData.name} Pack
      </h2>
      <GenHeader packData={packData} setPackData={setPackData} />

      <CodePre>{format(packData)}</CodePre>
    </div>
  );
}

/* const Theme = createContext("light");
 <Theme.Provider value="dark"></Theme.Provider> */
