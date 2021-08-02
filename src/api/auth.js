import { $api } from "@/plugins/Axios"
import endpoints from "./endpoints"
import { mapApiError, mapData } from "./helpers"

export const loginService = async (request) => {
  // TODO - FAKE API
  const fakeApi = () => {
    return new Promise((resolve, reject) => {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (request.password && request.password.length <= 5) {
        reject("Wrong password !")
      } else if (request.email && !emailRegex.test(request.email)) {
        reject("Wrong email !")
      } else {
        resolve({
          data: {
            token: "abcdefg",
            user: { email: request.email },
          },
        })
      }
    })
  }

  try {
    const { data } = await fakeApi()

    return [null, mapData(data)]
  } catch (error) {
    return [error, null]
  }

  // try {
  //   const { data } = await $api.post(endpoints.auth.login, {
  //     ...request,
  //   })

  //   return [null, mapData(data)]
  // } catch (error) {
  //   return [mapApiError(error), null]
  // }
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

// export const userService = async () => {
//   try {
//     const { data } = await $api.get(endpoints.auth.user)

//     return [null, mapData(data)]
//   } catch (error) {
//     return [mapApiError(error), null]
//   }
// }

export const updateUserService = async (request) => {
  try {
    const { data } = await $api.patch(endpoints.auth.user, request)

    return [null, mapData(data)]
  } catch (error) {
    return [mapApiError(error), null]
  }
}
