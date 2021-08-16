const auth = "/auth"

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
}
