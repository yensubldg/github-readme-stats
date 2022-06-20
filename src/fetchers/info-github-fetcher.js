// @ts-nocheck
const retryer = require("../common/retryer");
const { request, MissingParamError } = require("../common/utils");

/**
 * @param {import('Axios').AxiosRequestHeaders} variables
 * @param {string} token
 * @description get info github account: name, avatar, email, bio, followers, createdAt
 */
const fetcher = (variables, token) => {
  return request(
    {
      query: `
        query getUser($login: String!) {
            user(login: $login) {
                name
                avatarUrl
                email
                bio
                followers {
                    totalCount
                }
                createdAt
            }
        }
        `,
      variables,
    },
    {
      Authorization: `token ${token}`,
    },
  );
};

const urlExample = "/api/pin?username=USERNAME";

/**
 * @param {string} username
 * @returns {Promise<import("./types").UserData>}
 * @description get info github account: name, avatar, email, bio, followers, createdAt
 * @throws {MissingParamError}
 */
async function fetchUser(username) {
  if (!username) {
    throw new MissingParamError("username", urlExample);
  }
  const variables = { login: username };
  const token = process.env.GITHUB_TOKEN;
  const response = await retryer(fetcher, variables, token);
  return response.data.data.user;
}

module.exports = fetchUser;
