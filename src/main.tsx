import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { pageFromPath } from "./data/content";
import "./styles.css";
import "./theme.css";
import "./motion.css";
import "./refinement.css";
import "./donate.css";
import "./program-roll.css";
import "./header-glass.css";
import "./contact.css";
import "./donate-button.css";
import "./mentorship.css";
import "./programs-illustrations.css";
import "./responsive.css";
import "./prevention-focus.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing application root");
const app = (
  <StrictMode>
    <App page={pageFromPath(window.location.pathname)} />
  </StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
