require("dotenv").config();
const {
  renderError,
  parseBoolean,
  parseArray,
  clampValue,
  CONSTANTS,
} = require("../src/common/utils");
const fetchUser = require("../src/fetchers/info-github-fetcher");
const renderInfoCard = require("../src/cards/info-card");
const blacklist = require("../src/common/blacklist");
const { isLocaleAvailable } = require("../src/translations");

module.exports = async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    hide_rank,
    show_icons,
    count_private,
    include_all_commits,
    line_height,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    custom_title,
    locale,
    disable_animations,
    border_radius,
    border_color,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");

  if (blacklist.includes(username)) {
    return res.send(renderError("Something went wrong"));
  }
  try {
    const info = await fetchUser(username);
    const cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY,
    );
    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);
    res.send(
      renderInfoCard(info, {
        hide_border: parseBoolean(hide_border),
        hide_title: parseBoolean(hide_title),
        hide_rank: parseBoolean(hide_rank),
        show_icons: parseBoolean(show_icons),
        line_height: parseInt(line_height || CONSTANTS.LINE_HEIGHT, 10),
        title_color: title_color || CONSTANTS.TITLE_COLOR,
        icon_color: icon_color || CONSTANTS.ICON_COLOR,
        text_color: text_color || CONSTANTS.TEXT_COLOR,
        bg_color: bg_color || CONSTANTS.BG_COLOR,
        theme: theme || CONSTANTS.THEME,
        disable_animations: parseBoolean(disable_animations),
        border_radius: parseInt(border_radius || CONSTANTS.BORDER_RADIUS, 10),
        border_color: border_color || CONSTANTS.BORDER_COLOR,
      }),
    );
  } catch (error) {
    res.send(renderError("Something went wrong", error.message));
  }
};
