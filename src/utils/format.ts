export const truncateString = (value: string, max = 100) => {
  if (value.length <= max) return value;

  return `${value.slice(0, max)}…`;
};
