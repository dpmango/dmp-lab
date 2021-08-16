import { $api } from "@/plugins/Axios"
import endpoints from "./endpoints"
import { mapApiError, mapData } from "./helpers"

export const loginService = async (request) => {
  try {
    const { data } = await $api.post(endpoints.auth.login, {
      ...request,
    })

    return [null, mapData(data)]
  } catch (error) {
    return [mapApiError(error), null]
  }
}

export const logoutService = async () => {
  try {
    const { data } = await $api.post(endpoints.auth.logout)

    return [null, mapData(data)]
  } catch (error) {
    return [mapApiError(error), null]
  }
}

export const refreshTokenService = async (request) => {
  try {
    const { data } = await $api.post(endpoints.auth.refreshToken, request)

    return [null, mapData(data)]
  } catch (error) {
    return [mapApiError(error), null]
  }
}

export const passwordChangeService = async (request) => {
  try {
    const { data } = await $api.post(endpoints.auth.passwordChange, {
      ...request,
    })

    return [null, mapData(data)]
  } catch (error) {
    return [mapApiError(error), null]
  }
}

export const userService = async () => {
  try {
    const { data } = await $api.get(endpoints.auth.user)

    return [null, mapData(data)]
  } catch (error) {
    return [mapApiError(error), null]
  }
}

export const updateUserService = async (request) => {
  try {
    const { data } = await $api.patch(endpoints.auth.user, request)

    return [null, mapData(data)]
  } catch (error) {
    return [mapApiError(error), null]
  }
}
