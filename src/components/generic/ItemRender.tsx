import { useState } from "preact/hooks";
import { getItemTexture } from "../../api/Util.ts";

type ItemRenderProps = {
  item: string;
  width?: number;
  height?: number;
  noAlt?: boolean;
};

export default function ItemRender({
  item,
  height,
  width,
  noAlt,
}: ItemRenderProps) {
  const [url, setUrl] = useState("");
  getItemTexture(item).then((e) => setUrl(e as string));
  return (
    <img
      class="inline pixel-art"
      src={url}
      alt={noAlt ? "" : item}

      width={height}
      height={width}
    />
  );
}
