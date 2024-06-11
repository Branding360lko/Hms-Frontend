export const convertValue = (array) => {
  const changevalue = [];
  for (let index = 0; index < array?.length; index++) {
    const label = array[index]?.Name;
    const value = array[index]?._id;
    changevalue.push({ label, value });
  }
  return changevalue;
};
