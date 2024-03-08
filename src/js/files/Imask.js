import IMask from "imask";

const allMasks = document.querySelectorAll("[data-mask]");
if (allMasks.length > 0) {
  allMasks.forEach((item) => {
    IMask(item, {
      mask: item.dataset.mask,
    });
  });
}
