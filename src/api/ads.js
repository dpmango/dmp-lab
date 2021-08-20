import { $api } from "@/plugins/Axios"
import endpoints from "./endpoints"
import { mapApiError, mapData } from "./helpers"

export const getCompaignService = async (request) => {
  try {
    const { data } = await $api.get(endpoints.campaign, null, {
      params: {
        ...request,
      },
    })

    return [null, mapData(data)]
  } catch (error) {
    return [mapApiError(error), null]
  }
}

export const createCompaignService = async (request) => {
  try {
    const { data } = await $api.post(endpoints.campaign, {
      ...request,
    })

    return [null, mapData(data)]
  } catch (error) {
    return [mapApiError(error), null]
  }
}

// groups
export const getGroupAd = async (request) => {
  try {
    const { data } = await $api.get(endpoints.groupAd, null, {
      params: {
        ...request,
      },
    })

    return [null, mapData(data)]
  } catch (error) {
    return [mapApiError(error), null]
  }
}

// ads
export const getAds = async (request) => {
  try {
    const { data } = await $api.get(endpoints.ad, null, {
      params: {
        ...request,
      },
    })

    return [null, mapData(data)]
  } catch (error) {
    return [mapApiError(error), null]
  }
}
