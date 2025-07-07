export const isInWebView = () => {
  const ua = navigator.userAgent || navigator.vendor

  return (
    ua.includes('FBAN') || // Facebook
    ua.includes('FBAV') || // Facebook
    ua.includes('Instagram') || // Instagram
    ua.includes('Line') ||
    ua.includes('Twitter') ||
    ua.includes('Messenger')
  )
}

export const normalizeSpaces = (str: string) => {
  return str.trim().replace(/\s+/g, ' ')
}
