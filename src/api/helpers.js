export const mapApiError = (error) => {
  const response = error.response
  const data = response.data
  let message = data.error.message

  if (!data.success) {
    switch (data.error.status) {
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
      code: data.error.status,
    }
  }
}

export const mapData = (data) => {
  return data
}
