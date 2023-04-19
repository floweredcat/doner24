export const getButtonTitle = (cartLength) => {
  if (cartLength === 1) {
    return "товар"
  }
  if (cartLength > 1 && cartLength < 5) {
    return "товара"
  }
  else return "товаров"
}