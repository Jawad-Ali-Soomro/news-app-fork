export const getArticlesByActiveFilters = (filter, articles) => {
  const res1 = articles.filter((item) =>
    item.title.toUpperCase().includes(filter.toUpperCase())
  );
  return res1;
};
