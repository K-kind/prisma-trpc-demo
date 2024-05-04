/** ex. '1' => 1, 'test' => null */
export const parseNumber = (value: unknown): number | null => {
  if (typeof value === "number") return value;
  if (value == null || typeof value !== "string") return null;

  const parsed = Number(value);
  return isNaN(parsed) ? null : parsed;
};

/** ex. 'test' => 'test', ['test'] => null */
export const parseString = (value: unknown): string | null => {
  return typeof value === "string" ? value : null;
};
