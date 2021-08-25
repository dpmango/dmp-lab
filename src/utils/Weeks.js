export const convertDayNameToMini = (str) => {
  switch (str) {
    case "monday":
      return "Пн"
    case "tuesday":
      return "Вт"
    case "wednesday":
      return "Ср"
    case "thursday":
      return "Чт"
    case "friday":
      return "Пт"
    case "saturday":
      return "Сб"
    case "sunday":
      return "Вс"
    default:
      return null
  }
}

export const covertDayIdToName = (id) => {
  const numId = parseInt(id, 10)
  switch (numId) {
    case 1:
      return "monday"
    case 2:
      return "tuesday"
    case 3:
      return "wednesday"
    case 4:
      return "thursday"
    case 5:
      return "friday"
    case 6:
      return "saturday"
    case 7:
      return "sunday"
    default:
      return null
  }
}
