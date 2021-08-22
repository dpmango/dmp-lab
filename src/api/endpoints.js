const auth = "/auth"
const campaign = "/campaign"
const groupAd = "/groupAd"
const ad = "/ad"

export default {
  auth: {
    user: `/profile/me/`,
    login: `${auth}/login/`,
    logout: `${auth}/logout/`,
    passwordChange: `${auth}/profile/password/`,
  },
  support: {
    ticket: "/support/ticket/",
  },
  campaign: {
    root: `${campaign}`,
    stop: `${campaign}/stop`,
  },
  groupAd: `${groupAd}`,
  ad: `${ad}`,
}
