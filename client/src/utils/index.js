export const saveToLocalStorage = (name, value) => {
  const ls = localStorage;
  ls.setItem(name, JSON.stringify(value));
};

export const getFromLocalStorage = (name) => {
  const ls = localStorage;
  return JSON.parse(ls.getItem(name));
};

// FILTER UTILS

export const filterOptions = [
  {
    label: "Oldest Tasks",
    value: "ascending",
  },
  {
    label: "Newest Tasks",
    value: "descending",
  },
  {
    label: "Completed",
    value: "true",
  },
  {
    label: "Uncompleted",
    value: "false",
  },
];
