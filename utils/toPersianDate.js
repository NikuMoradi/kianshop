import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

export const toPersianDate = (date) => {
  if (!date) return "";
  return moment(date).format("jD jMMMM jYYYY");
};
