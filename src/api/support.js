import { $api } from "@/plugins/Axios"
import endpoints from "./endpoints"
import { mapApiError, mapData } from "./helpers"

export const supportTicketService = async (request) => {
  try {
    /** 
    @param fio (String; min: ~; max: ~; required)
    @param nameCampaign (String; min: ~; max: ~; required)
    @param phone (String; min: ~; max: ~; required)
    @param email (String; min: ~; max: ~; required)
    @param theme (String; min: ~; max: ~; required)
    @param descriptionProblem (String; min: ~; max: ~; required)
    **/
    const { data } = await $api.patch(endpoints.support.ticket, request)

    return [null, mapData(data)]
  } catch (error) {
    return [mapApiError(error), null]
  }
}
