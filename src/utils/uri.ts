/** ex. { foo: 'a' } => '?foo=a', {} => '' */
export const getQueryString = (
  query: Record<string, string | string[] | undefined>
) => {
  const queryObject = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        queryObject.append(key, v);
      });
    } else if (typeof value === "string") {
      queryObject.append(key, value);
    }
  });
  if (queryObject.size === 0) return "";

  return `?${queryObject.toString()}`;
};
