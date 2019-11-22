const debounce = fn => {
  // Setup a timer
  let timeout

  // Return a function to run debounced
  return () => {
    // Setup the arguments
    const context = this
    // const args = arguments

    // If there's a timer, cancel it
    if (timeout) {
      window.cancelAnimationFrame(timeout)
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function() {
      // fn.apply(context, args)
      fn.apply(context)
    })
  }
}

export default debounce
