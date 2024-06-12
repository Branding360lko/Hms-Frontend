export const date = (dateTime) => {
  const newdate = new Date(dateTime);

  const day = String(newdate.getDate()).padStart(2, "0");
  const month = String(newdate.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const year = newdate.getFullYear();

  return `${day}/${month}/${year}`;
};

export const time = (dateTime) => {
  const newDate = new Date(dateTime);

  return newDate.toLocaleTimeString();
};
