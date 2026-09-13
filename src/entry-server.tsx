import { renderToString } from "react-dom/server";
import { App } from "./App";
import type { Page } from "./data/content";

export function render(page: Page) {
  return renderToString(<App page={page} />);
}
