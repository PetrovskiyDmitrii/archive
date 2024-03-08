// Підключення функціоналу "Чертоги Фрілансера"
// Підключення списку активних модулів
import { removeClasses } from "@js/files/functions.js";
import { flsModules } from "./modules.js";
import window from "inputmask/lib/global/window.js";

let otc = document.querySelector("[data-otc]");

if (otc) {
  let in1 = document.querySelector("#otc-1");
  let ins = otc.querySelectorAll('input[type="number"]'),
    splitNumber = function (e) {
      let data = e.data || e.target.value; // Chrome doesn't get the e.data, it's always empty, fallback to value then.
      if (!data) return; // Shouldn't happen, just in case.

      if (data.length === 1) {
        // e.classList.add("fill");
        return;
      } // Here is a normal behavior, not a paste action.
      popuNext(e.target, data);
      //for (i = 0; i < data.length; i++ ) { ins[i].value = data[i]; }
    },
    popuNext = function (el, data) {
      el.value = data[0]; // Apply first item to first input
      data = data.substring(1); // remove the first char.

      if (el.nextElementSibling && data.length) {
        // Do the same with the next element and next data
        popuNext(el.nextElementSibling, data);
      }
    };
  ins.forEach(function (input) {
    /**
     * Control on keyup to catch what the user intent to do.
     * I could have check for numeric key only here, but I didn't.
     */
    input.addEventListener("keyup", function (e) {
      // Break if Shift, Tab, CMD, Option, Control.
      if (
        e.keyCode === 16 ||
        e.keyCode == 9 ||
        e.keyCode == 224 ||
        e.keyCode == 18 ||
        e.keyCode == 17
      ) {
        return;
      }

      // On Backspace or left arrow, go to the previous field.
      if (
        (e.keyCode === 8 || e.keyCode === 37) &&
        this.previousElementSibling &&
        this.previousElementSibling.tagName === "INPUT"
      ) {
        this.previousElementSibling.select();
      } else if (e.keyCode !== 8 && this.nextElementSibling) {
        this.nextElementSibling.select();
      }
      if (e.target.value.length >= 1) {
        e.target.classList.add("fill");
      } else {
        e.target.classList.remove("fill");
      }
      // If the target is populated to quickly, value length can be > 1
      if (e.target.value.length > 1) {
        splitNumber(e);
      }
    });

    /**
     * Better control on Focus
     * - don't allow focus on other field if the first one is empty
     * - don't allow focus on field if the previous one if empty (debatable)
     * - get the focus on the first empty field
     */
    input.addEventListener("focus", function (e) {
      // If the focus element is the first one, do nothing
      if (this === in1) return;

      // If value of input 1 is empty, focus it.
      if (in1.value == "") {
        in1.focus();
      }

      // If value of a previous input is empty, focus it.
      // To remove if you don't wanna force user respecting the fields order.
      if (this.previousElementSibling.value == "") {
        this.previousElementSibling.focus();
      }
    });
  });

  in1.addEventListener("input", splitNumber);
}
const countDown = (selector, time, text = "Resend a request") => {
  let countDownDate = new Date().getTime() + Number(time + 2) * 1000;
  let x = setInterval(function () {
    let now = new Date().getTime();

    let distance = countDownDate - now;
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 60)) / (1000 * 60 * 60)
    );
    console.log(hours);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const selH = selector.querySelector("[data-hours]");
    const selM = selector.querySelector("[data-minutes]");
    const selS = selector.querySelector("[data-seconds]");
    if (selector.hasAttribute("data-timer2")) {
      if (selH) {
        selH.textContent = hours;
      }
      if (selM) {
        selM.textContent = minutes;
      }
      if (selS) {
        selS.textContent = seconds;
      }
    } else {
      selector.textContent = minutes + ":" + seconds;
    }

    if (distance < 0) {
      if (!selector.hasAttribute("data-timer2")) {
        selector.innerHTML = text;
        selector.disabled = false;
      } else {
        if (selH) {
          selH.textContent = "00";
        }
        if (selM) {
          selM.textContent = "00";
        }
        if (selS) {
          selS.textContent = "00";
        }
      }
      clearInterval(x);
      document.location.href = "/";
    }
  }, 1000);
};

const allTimer = document.querySelectorAll("[data-timer]");
if (allTimer.length > 0) {
  allTimer.forEach((item) => {
    const arr = item.dataset.timer.split(",");
    let time = 60;
    if (arr.length > 0) {
      time = parseInt(arr[0]) > 0 ? parseInt(arr[0]) : 60;
      const text = arr[1];
    }
    countDown(item, time);
  });
}

function unsecuredCopyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.insertAdjacentElement("afterend", textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    document.documentElement.classList.add("copied");
    setTimeout(() => {
      document.documentElement.classList.remove("copied");
    }, 2000);
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  textArea.remove();
}

const allCopy = document.querySelectorAll("[data-copy]");
if (allCopy.length > 0) {
  allCopy.forEach((copyBlock) => {
    const copyBtn = copyBlock.querySelector("[data-copy-btn]");
    const copyValue = copyBlock.querySelector("[data-copy-value]");

    copyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const text = copyValue.value
        ? copyValue.value
        : copyValue.dataset.copyValue;

      unsecuredCopyToClipboard(text);
    });
  });
}

function check(btn, buttons) {
  let valueRizn = parseInt(
    window.innerHeight - btn.getBoundingClientRect().bottom
  );
  let heightBtns = buttons.offsetHeight;
  if (valueRizn > heightBtns) {
    return false;
  }
  return true;
}

window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    let target = null;
    if (e.target.closest("[data-action-btn]")) {
      e.preventDefault();
      target = e.target.closest("[data-action-btn]");
      let allActive = Array.from(
        document.querySelectorAll("[data-action].active")
      );
      allActive = allActive.filter(
        (item) => item !== target.closest("[data-action].active")
      );
      removeClasses(allActive, "active");
      target.closest("[data-action]").classList.toggle("active");
      const buttons = target
        .closest("[data-action]")
        .querySelector("[data-action-items]");
      if (check(target, buttons)) {
        target.closest("[data-action]").classList.add("top");
      } else {
        target.closest("[data-action]").classList.remove("top");
      }
    } else if (
      !e.target.closest("[data-action]") &&
      !e.target.closest(".popup")
    ) {
      const allActive = document.querySelectorAll("[data-action].active");
      removeClasses(allActive, "active");
    }

    let target2;
    if (e.target.closest(".filter__title")) {
      target2 = e.target.closest(".filter__title");
      target2.parentElement.classList.toggle("open-filter");
    } else if (
      document.querySelector(".open-filter") &&
      !e.target.closest(".filter")
    ) {
      document.querySelector(".open-filter").classList.remove("open-filter");
    }
  });
});

const checkboxAll = document.querySelector("[data-table-checkbox-all] input");

if (checkboxAll) {
  const countCard = document.querySelector("[data-count-card]");
  const hideBlock = document.querySelector("[data-table-hide]");
  const closeFilter = document.querySelector("[data-table-close-hide]");
  if (closeFilter) {
    closeFilter.addEventListener("click", (e) => {
      e.preventDefault();
      closeFilter.closest(".table__top.active").classList.remove("active");
    });
  }
  const allBtn = checkboxAll
    .closest("table")
    .querySelectorAll("[data-table-checkbox] input");
  checkboxAll.addEventListener("change", () => {
    if (allBtn.length > 0) {
      if (checkboxAll.checked) {
        allBtn.forEach((item) => {
          item.checked = true;
        });
        hideBlock.classList.add("active");
      } else {
        allBtn.forEach((item) => {
          item.checked = false;
        });
        hideBlock.classList.remove("active");
      }
      if (countCard) {
        countCard.textContent = Array.from(allBtn).filter(
          (item) => item.checked === true
        ).length;
      }
    }
  });
  if (allBtn.length > 0) {
    if (hideBlock) {
      allBtn.forEach((item) => {
        item.addEventListener("change", () => {
          if (item.checked) {
            hideBlock.classList.add("active");
          } else {
            checkboxAll.checked = false;
          }
          const isChecked = Array.from(allBtn).findIndex(
            (item) => item.checked === true
          );
          if (isChecked < 0) {
            hideBlock.classList.remove("active");
          }
          if (countCard) {
            countCard.textContent = Array.from(allBtn).filter(
              (item) => item.checked === true
            ).length;
          }
        });
      });
    }
  }
}
const allTexts = document.querySelectorAll(".cards-create__text-wrap");
document.addEventListener("selectCallback", function (e) {
  const currentSelect = e.detail.select;
  if (currentSelect.hasAttribute("data-bank") && allTexts.length > 0) {
    removeClasses(allTexts, "active");
    allTexts[currentSelect.value].classList.add("active");
  }
});

const allRate = document.querySelectorAll("[data-rate]");
if (allRate.length > 0) {
  allRate.forEach((item) => {
    const value = parseInt(item.dataset.rate);
    if (value <= 5) {
      item.classList.add("green");
    } else if (value > 5 && value <= 10) {
      item.classList.add("yellow");
    } else if (value > 10 && value < 100) {
      item.classList.add("red");
    } else if (value === 100) {
      item.classList.add("error");
    }
    const line = item.querySelector(".header-admin__line span");
    if (line) {
      line.style.width = 100 - (value / 15) * 100 + "%";
    }
  });
}
window.addEventListener("DOMContentLoaded", () => {
  const openNotify = document.querySelectorAll("[data-notify-open]");
  const closeNotify = document.querySelector("[data-notify-close]");
  if (openNotify.length > 0) {
    openNotify.forEach((item) => {
      item.addEventListener("click", () => {
        document.documentElement.classList.add("open-notify");
      });
    });
  }
  if (closeNotify) {
    closeNotify.addEventListener("click", () => {
      document.documentElement.classList.remove("open-notify");
    });
  }

  const wallet = document.querySelector("[data-wallet]");
  if (wallet) {
    const walletValue = wallet.querySelector("[data-wallet-value]");
    const walletSelect = wallet.querySelector("[data-wallet-select]");
    walletValue.textContent = `(${walletSelect.value})`;
    document.addEventListener("selectCallback", function (e) {
      const currentSelect = e.detail.select;
      if (currentSelect.hasAttribute("data-wallet-select")) {
        walletValue.textContent = `(${walletSelect.value})`;
      }
    });
  }
  const allSecurity = document.querySelectorAll("[data-security]");
  if (allSecurity.length > 0) {
    allSecurity.forEach((item) => {
      item.addEventListener("change", (e) => {
        if (!item.checked) {
          flsModules.popup.open(item.dataset.security);
        }
      });
    });
  }
});
