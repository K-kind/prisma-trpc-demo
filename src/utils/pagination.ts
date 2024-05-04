export const calcOffset = ({ page, per }: { page: number; per: number }) => {
  return per * (page - 1);
};
