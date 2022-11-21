function slugify(string) {
  return string.trim().toLowerCase().replace(/\W|_/g, "-");
}

async function appendFavorites(loggedUser, article) {
  const favorited = await article.hasUser(loggedUser ? loggedUser : null);

  article.dataValues.favorited = loggedUser ? favorited : false;

  const favoritesCount = await article.countUsers();

  article.dataValues.favoritesCount = favoritesCount;
}

async function appendFollowers(loggedUser, toAppend) {
  if (toAppend?.author) {
    const author = await toAppend.getAuthor();

    const following = await author.hasFollower(loggedUser ? loggedUser : null);

    toAppend.author.dataValues.following = loggedUser ? following : false;

    const followersCount = await author.countFollowers();

    toAppend.author.dataValues.followersCount = followersCount;
  } else {
    const following = await toAppend.hasFollower(
      loggedUser ? loggedUser : null
    );

    toAppend.dataValues.following = loggedUser ? following : false;

    const followersCount = await toAppend.countFollower();

    toAppend.dataValues.followersCount = followersCount;
  }
}

module.exports = { slugify, appendFavorites, appendFollowers };
