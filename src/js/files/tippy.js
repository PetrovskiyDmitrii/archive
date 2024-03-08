// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, FLS } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// Підключення з node_modules
import tippy from "tippy.js";

// Підключення стилів з src/scss/libs
import "../../scss/libs/tippy.scss";
// Підключення стилів з node_modules
//import 'tippy.js/dist/tippy.css';

// Запускаємо та додаємо в об'єкт модулів

const allTippy = document.querySelectorAll(".tippy");
if (allTippy.length > 0) {
  allTippy.forEach((item) => {
    const tippyBtn = item.querySelector(".tippy__button");
    if (tippyBtn) {
      const template = item.querySelector(".tippy__template");
      flsModules.tippy = tippy(tippyBtn, {
        content: template.innerHTML,
        interactive: true,
        arrow: true,
        allowHTML: true,
        trigger: "click mouseenter",
        placement: "bottom-start",
      });
    }
  });
}
