const auth = "/rest-auth"
const api = "/api"

export default {
  auth: {
    user: `${auth}/user/`,
    login: `${auth}/login/`,
    logout: `${auth}/logout/`,
    refreshToken: `${auth}/token-refresh/`,
    passwordChange: `${auth}/password/change/`,
  },
}
