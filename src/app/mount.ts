import { createRoot } from "react-dom/client";
import { createApp } from "./base";

const root = createRoot(document.getElementById("root")!);
root.render(createApp());
