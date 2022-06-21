export const stringSort = ({ items, condition, key }) =>
  items.sort((a, b) => (condition ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])))

export const defaultSort = ({ items, condition, key }) =>
  items.sort((a, b) => (condition ? a[key] - b[key] : b[key] - a[key]))
