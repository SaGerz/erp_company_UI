export const formatDateToInput = (dateStr) => {
  const date = new Date(dateStr);
  const iso = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000))
    .toISOString()
    .split("T")[0]; // "YYYY-MM-DD"
  return iso;
};

