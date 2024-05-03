type Options = {
  id: number;
};

export const destroyArticle = async ({ id }: Options) => {
  await fetch(`/api/articles/${id}/destroy`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};
