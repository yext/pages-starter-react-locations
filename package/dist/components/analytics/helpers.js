function slugify(str) {
  return str.toLowerCase().trim().replace(/[^\w\s-]|[\s-]+/g, "");
}
function concatScopes(a, b) {
  return [a, b].filter((scope) => !!scope).map((scope) => slugify(scope)).join("_");
}
export {
  concatScopes,
  slugify
};
