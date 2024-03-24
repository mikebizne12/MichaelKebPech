function isValidUrl(url: string): boolean {
  const regex =
    // eslint-disable-next-line no-useless-escape
    /^(https?:\/\/)?[\w\d-]+(\.[\w\d-]+)*\.[a-z]{2,}(\/[^\/\s]+)*\/[^\/\s]+\.(jpg|jpeg|png|gif|bmp|webp)$/i;

  const pattern = new RegExp(regex);
  return !!pattern.test(url);
}
export { isValidUrl };
