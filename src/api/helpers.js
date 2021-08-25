export const mapApiError = (error) => {
  const response = error.response
  console.log(response)
  const data = response.data
  const status = response.status || data.error.status
  let message = (data.error && data.error.message) || ""

  // ориентироваться первично на http коды
  // далее обрабатывать если статус 200 и success
  if (!data.success) {
    switch (status) {
      case 500:
        message = "Ошибка сервера"
        break
      case 400:
        message = "Ошибка валидации"
        break
      case 401:
        message = "Ошибка авторизации"
        break
      default:
        break
    }

    return {
      data: message,
      code: status,
    }
  }
}

export const mapData = (data) => {
  return data
}
