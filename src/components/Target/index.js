import React, { useRef, forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

import styles from './Target.module.scss'

const cx = classnames.bind(styles)

const Target = forwardRef(({ className, heroRef, pageTransitioningIn }, ref) => {
  const holder = useRef(null)
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
    if (!heroRef) {
      return
    }
    const bounds = heroRef.getBoundingClientRect()
    markerX.current.style.left = `${bounds.width / 2}px`
    markerX.current.style.height = `${bounds.height}px`

    markerY.current.style.top = `${bounds.height / 2}px`
    markerY.current.style.width = `${bounds.width}px`

    holder.current.style.top = `${window.pageYOffset + bounds.top}px`
    holder.current.style.left = `${window.pageXOffset + bounds.x}px`
    holder.current.style.height = `${bounds.height}px`
    holder.current.style.width = `${bounds.width}px`
  }

  useEffect(() => {
    if (pageTransitioningIn) {
      // holder.current.style.display = 'none'
      endListener()
    }
    if (!pageTransitioningIn) {
      // holder.current.style.display = 'block'
      startListener()
    }
  }, [pageTransitioningIn])

  return (
    <div ref={holder} className={cx('holder', className)}>
      <div ref={ref}>
        <div ref={markerX} className={cx('x')} />
        <div ref={markerY} className={cx('y')} />
      </div>
    </div>
  )
})

Target.displayName = 'Target'

Target.propTypes = {
  heroRef: PropTypes.object,
  bounds: PropTypes.object,
  className: PropTypes.string,
  pageTransitioningIn: PropTypes.bool,
}

const mapStateToProps = ({ heroRef, pageTransitioningIn }) => {
  return {
    heroRef,
    pageTransitioningIn,
  }
}

export default connect(mapStateToProps, null, null, { forwardRef: true })(Target)
