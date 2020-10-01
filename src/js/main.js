import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import tabs from "./modules/tabs";

window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  modals();
  tabs(
    ".visualization__tabs",
    ".visualization__tab",
    ".visualization__items",
    "active"
  );
});
