import { $api } from "@/plugins/Axios"
import endpoints from "./endpoints"
import { mapApiError, mapData } from "./helpers"

export const getCompaignService = async (request) => {
  try {
    const { data } = await $api.get(endpoints.campaign, {
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
  // + name (String; min: 1; max: 200; required)
  // + limits (Array[LimitsArr]; required)
  // + typeBudgetAllocate (String; enum: “balanced”, “accelerated”; required)
  // + typeProcurementStrategy (String; enum: “impressions”, “clicks”; required)
  // +/- dateStartCompany (String; format: ISO8601; required)
  // - showTimes (Array[ShowTimeArr]; required)
  // + frequencyСompanyImpressions (Object{FCI}; required)

  // [LimitsArr]:
  // + type (String; enum: “budget”, “clicks”, “impressions”, required)
  // + limit (Integer; min: 1; required)
  // + mainLimit (Integer; min: 1; required)

  // [ShowTimeArr]:
  // - type (String; enum: “monday”, “wednesday”, “thursday”, “friday”, “saturday”, “sunday”;
  // required)
  // - startOf (String; format; DD.MM.YYYY; required)
  // - endOf (String; format; DD.MM.YYYY; required)

  // {FCI}:
  // + more (Integer; min: 1; required)

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
    const { data } = await $api.get(endpoints.groupAd, {
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
    const { data } = await $api.get(endpoints.ad, {
      params: {
        ...request,
      },
    })

    return [null, mapData(data)]
  } catch (error) {
    return [mapApiError(error), null]
  }
}
