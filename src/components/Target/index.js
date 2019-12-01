import React, { useRef, forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

import styles from './Target.module.scss'

const cx = classnames.bind(styles)

const Target = forwardRef(({ className, showBorders, target, pageTransitioningIn, pageTransitionStart }, ref) => {
  const markerX = useRef(null)
  const markerY = useRef(null)

  const listenerID = useRef()
  const listener = useRef()
  let flip = useRef()
  listener.current = () => {
    listenerID.current = undefined
    flip.current = flip.current + 1
    if (flip.current >= 30) {
      // do something at a lower framerate here
      updateTarget()
      flip.current = 0
    }
    listenerID.current = requestAnimationFrame(listener.current)
  }

  const startListener = () => {
    endListener()
    flip.current = 0
    listener.current()
  }
  const endListener = () => {
    if (listenerID.current) {
      window.cancelAnimationFrame(listenerID.current)
      listenerID.current = undefined
    }
  }

  const updateTarget = () => {
    if (!target) {
      return
    }
    const bounds = target.getBoundingClientRect()
    markerX.current.style.left = `${bounds.width / 2 - 2}px`
    markerX.current.style.height = `${bounds.height - 2}px`

    markerY.current.style.top = `${bounds.height / 2 - 4}px`
    markerY.current.style.width = `${bounds.width - 2}px`

    ref.current.style.top = `${window.pageYOffset + bounds.top}px`
    ref.current.style.left = `${window.pageXOffset + bounds.x}px`
    ref.current.style.height = `${bounds.height}px`
    ref.current.style.width = `${bounds.width}px`

    // const targetCenter = [bounds.x + bounds.width/2, bounds.top + bounds.height/2]
    // console.log('Target Center:', targetCenter)
  }

  useEffect(() => {
    if (!ref.current) {
      return
    }
    if (pageTransitioningIn) {
      if (showBorders) {
        ref.current.style.display = 'none'
      }
      endListener()
    }
    if (!pageTransitioningIn) {
      if (showBorders) {
        ref.current.style.display = 'block'
      }
      startListener()
    }
  }, [pageTransitioningIn])

  useEffect(() => {
    if (!ref.current) {
      return
    }
    ref.current.style.display = 'none'
    endListener()
  }, [pageTransitionStart])

  return (
    <div ref={ref} className={cx('holder', className)} style={showBorders ? { display: 'block' } : { display: 'none' }}>
      <div ref={markerX} className={cx('x')} />
      <div ref={markerY} className={cx('y')} />
    </div>
  )
})

Target.displayName = 'Target'

Target.propTypes = {
  target: PropTypes.object,
  showBorders: PropTypes.bool,
  bounds: PropTypes.object,
  className: PropTypes.string,
  pageTransitioningIn: PropTypes.bool,
  setPageTransitionStart: PropTypes.func,
  setPageTransitionEnd: PropTypes.func,
  pageTransitionStart: PropTypes.number,
  pageTransitionEnd: PropTypes.number,
}

const mapStateToProps = ({ showBorders, pageTransitioningIn, pageTransitionStart, pageTransitionEnd }) => {
  return {
    pageTransitioningIn,
    pageTransitionStart,
    pageTransitionEnd,
    showBorders,
  }
}

export default connect(mapStateToProps, null, null, { forwardRef: true })(Target)
