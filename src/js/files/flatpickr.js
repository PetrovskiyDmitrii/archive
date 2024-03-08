import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js" // you need to import this file for Russian l10n
import { Ukrainian } from "flatpickr/dist/l10n/uk.js" // you need to import this file for Ukrainian l10n
import { DateTime } from "luxon";
import "../../scss/base/flatpickr.scss";
import { removeClasses } from "@js/files/functions.js";

// hack for flatpickr rangeSeparator
flatpickr.l10ns.default.rangeSeparator = " - ";
flatpickr.l10ns.en.rangeSeparator = " - ";
flatpickr.l10ns.ru.rangeSeparator = " - ";
flatpickr.l10ns.uk.rangeSeparator = " - ";

let isMobile = window.matchMedia("(max-width: 768px)").matches;

const luxonFormat = "MM/dd/y";
const flatpickrFormat = "m/d/Y";

const allDates = document.querySelectorAll("[data-flatpickr]");
if (allDates.length > 0) {
  allDates.forEach((item) => {
    const parent = item.closest(".calendar");
    let allBtn = [];
    const btnToggle = item
      .closest("[data-calendar]")
      .querySelector("[data-calendar-toggle]");
    if (btnToggle) {
      btnToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.closest("[data-calendar]").classList.toggle("open-calendar");
      });
    }
    if (parent) {
      parent.addEventListener("click", (e) => {
        if (e.target.closest(".flatpickr-calendar")) {
          e.preventDefault();
        }
        if (!e.target.closest(".calendar__buttons")) {
          removeClasses(allBtn, "active");
        }
      });
      allBtn = document.querySelectorAll("[data-date]");
      if (allBtn.length > 0) {
        allBtn.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            removeClasses(allBtn, "active");
            btn.classList.add("active");
            const valueBtn = btn.dataset.date;
            switch (valueBtn) {
              case "today":
                flatItem.setDate(
                  DateTime.now().toFormat(luxonFormat),
                  true
                );
                break;
              case "yesterday":
                flatItem.setDate(
                  DateTime.now().minus({ days: 1 }).toFormat(luxonFormat),
                  true
                );
                break;
              case "7day":
                flatItem.setDate(
                  [
                    DateTime.now().toFormat(luxonFormat),
                    DateTime.now().minus({ days: 6 }).toFormat(luxonFormat),
                  ],
                  true
                );
                break;
              case "30day":
                flatItem.setDate(
                  [
                    DateTime.now().toFormat(luxonFormat),
                    DateTime.now().minus({ days: 29 }).toFormat(luxonFormat),
                  ],
                  true
                );
                break;
              case "last30day":
                flatItem.setDate(
                  [
                    DateTime.now().minus({ months: 1 }).startOf("month").toFormat(luxonFormat),
                    DateTime.now().minus({ months: 1 }).endOf("month").toFormat(luxonFormat),
                  ],
                  true
                );
                break;
            }
            flatItem.close();
          });
        });
      }
    }
    const defaultDate = parent
      .closest("[data-calendar]")
      .dataset?.calendar?.split("-");
    const flatItem = flatpickr(item, {
      showMonths: isMobile ? 1 : 2,
      allowInput: false,
      dateFormat: flatpickrFormat,
      defaultDate: defaultDate ? defaultDate : "",
      mode: "range",
      inline: true,
      locale: document.documentElement.getAttribute('lang') || 'en',
      onReady: function (instance, dateStr) {
        if (btnToggle && btnToggle.nodeName === "INPUT") {
           btnToggle.value = dateStr;
        }
      },
      onChange: function (selectedDates, dateStr, instance) {
        if (btnToggle && btnToggle.nodeName === "INPUT") {
          btnToggle.value = dateStr;
        }
      },
      onClose: function (selectedDates, dateStr, instance) {
        if (btnToggle && btnToggle.nodeName === "BUTTON" && btnToggle.closest('form')) {
          btnToggle.closest('form').submit();
        }
      },
    });
    const btnRm = item
      .closest("[data-calendar]")
      .querySelector("[data-calendar-remove]");

    if (btnRm) {
      btnRm.addEventListener("click", (e) => {
        e.preventDefault();
        flatItem.clear();
        removeClasses(allBtn, "active");
      });
    }
  });
}

document.addEventListener("click", (e) => {
  if (
    document.querySelector(".open-calendar") &&
    !e.target.closest("[data-calendar]")
  ) {
    document.querySelector(".open-calendar").classList.remove("open-calendar");
  }
});
