const isiOS = () => {
  if (typeof window === 'undefined') {
    return false
  }
  return window && 'ontouchstart' in window && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

export default isiOS
