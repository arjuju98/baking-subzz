import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import BakingsubzFE from "./bakingsubzFE";  // Capitalize here

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BakingsubzFE />   {/* Capitalize here too */}
  </StrictMode>
);
