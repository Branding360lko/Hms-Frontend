export const date = (dateTime) => {
  const newdate = new Date(dateTime);

  return newdate.toLocaleDateString();
};

export const time = (dateTime) => {
  const newDate = new Date(dateTime);

  return newDate.toLocaleTimeString();
};
