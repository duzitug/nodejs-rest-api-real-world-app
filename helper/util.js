function slugify(string) {
  return string.trim().toLowerCase().replace(/\W|_/g, "-");
}

module.exports = { slugify };
