import axios from "axios"

const handleError = async (error) => {
  if (error.response && !error.response.config.url.includes("auth")) {
    if (parseInt(error.response && error.response.status) === 401) {
      // await store.dispatch('auth/logout');
    }
  }
}

// create instance
const api = axios.create({
  baseURL: "https://api.dmplab.ru/v1",
  withCredentials: true,
  headers: {
    common: {
      "Content-Type": "application/json",
      // Accept: "*/*",
      // "X-Requested-With": "XMLHttpRequest",
    },
  },
})

api.interceptors.request.use(
  (x) => {
    console.log(`${x.method.toUpperCase()} | ${x.url}`, x.params, x.data)

    return x
  },
  async (error) => {
    await handleError(error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (x) => {
    console.log(`${x.status} | ${x.config.url}`, x.data)

    return x
  },
  async (error) => {
    await handleError(error)
    return Promise.reject(error)
  }
)

const initAxios = (app) => {
  app.config.globalProperties.$api = api
}

export { initAxios, api as $api }
