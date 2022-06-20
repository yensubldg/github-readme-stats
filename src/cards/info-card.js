const Card = require("../common/Card");

/**
 * @param {import('../fetchers/types').InfoData} info
 * @param {Partial<import("./types").InfoOptions>} options
 * @returns {string}
 */
const renderInfoCard = (info, options = {}) => {
  const { name, avatarUrl, email, bio, followers, createdAt } = info;
  const { hide_border = false, title_color, icon_color, text_color } = options;
  const title = `<text data-testid="title" class="${title_color}">${name}</text>`;
  const avatar = `<img data-testid="avatar" src="${avatarUrl}" />`;
  const emailNode = `<text data-testid="email" class="${text_color}">${email}</text>`;
  const bioNode = `<text data-testid="bio" class="${text_color}">${bio}</text>`;
  const followersNode = `<text data-testid="followers" class="${text_color}">${followers}</text>`;
  const createdAtNode = `<text data-testid="created-at" class="${text_color}">${createdAt}</text>`;
  const items = [
    title,
    avatar,
    emailNode,
    bioNode,
    followersNode,
    createdAtNode,
  ];
  const card = new Card(items, { hide_border });
  return card.render();
};

module.exports = renderInfoCard;
