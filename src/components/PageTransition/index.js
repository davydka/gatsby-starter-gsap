import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import { Transition } from 'react-transition-group'
import gsap from 'gsap'

const PageTransition = ({
  children,
  pagePath,
  location,
  prevLocation,
  pageTransitionURLTarget,
  setPageTranstionURLTarget,
  setPageTransitioning,
  setPageTransitioningIn,
  setPageTransitionStart,
  setPageTransitionEnd,
}) => {
  const [locationHolder, setLocationHolder] = useState('')
  const [opacity, setOpacity] = useState(0)
  useEffect(() => {
    if (prevLocation && typeof prevLocation.pathname !== 'undefined' && locationHolder !== location.pathname) {
      setOpacity(0)
    }
  }, [opacity, prevLocation])

  const refContainer = useRef(null)
  useEffect(() => {
    if (pageTransitionURLTarget !== false) {
      // console.log('🛵 Page navigate')
      // console.log('going to:', pageTransitionURLTarget.replace(/\//g, ''))
      // console.log('coming from:', location.pathname.replace(/\//g, ''))
      // console.log('is animating:', gsap.isTweening(refContainer.current))
      if (gsap.isTweening(refContainer.current)) {
        setPageTransitioning(true)
        setPageTranstionURLTarget(false)
      } else {
        setPageTransitioning(false)
        setPageTranstionURLTarget(false)
      }
    }
    if (
      pageTransitionURLTarget !== false &&
      pageTransitionURLTarget.replace(/\//g, '') !== location.pathname.replace(/\//g, '') &&
      !gsap.isTweening(refContainer.current)
    ) {
      gsap.to(refContainer.current, 0.5, {
        opacity: 0,
        x: 100,
        startAt: {
          opacity: 1,
          x: 0,
        },
        onStart: () => {
          setPageTransitionStart(Date.now())
          setPageTransitioning(true)
          setPageTranstionURLTarget(false)
        },
        onComplete: () => {
          setPageTransitionEnd(Date.now())
          setPageTransitioning(false)
          setPageTranstionURLTarget(false)
          navigate(pageTransitionURLTarget)
        },
      })
    }
  }, [pageTransitionURLTarget, location, pagePath])

  useEffect(() => {
    // console.log('𝍌𝍌𝍌 PageTransition mounted')
    setPageTransitioningIn(true)
  }, [])

  return (
    <Transition
      // timeout={100} // turn this off when using addEndListener
      in={location.pathname.includes(pagePath)}
      key={location.pathname}
      appear
      mountOnEnter
      unmountOnExit
      onEnter={() => {
        // console.log('📃 transition: on enter')
      }}
      onEntering={() => {
        // console.log('📃 transition: on entering')
      }}
      onEntered={() => {
        // console.log('📃 transition: entered complete')
      }}
      addEndListener={(node, done) => {
        const loadingOut = !location.pathname.includes(pagePath)
        gsap.to(node, 1.5, {
          opacity: loadingOut ? 0 : 1,
          x: loadingOut ? 100 : 0,
          startAt: {
            opacity: loadingOut ? 1 : 0,
            x: loadingOut ? 0 : 100,
          },
          onStart: () => {
            setPageTransitionStart(Date.now())
          },
          onComplete: () => {
            // console.log('📃 page transition end!!')
            setPageTransitionEnd(Date.now())
            setPageTransitioningIn(false)
            if (!loadingOut) {
              setLocationHolder(location.pathname)
            }
            done()
          },
        })
      }}
    >
      <div ref={refContainer} style={{ opacity }}>
        {children}
      </div>
    </Transition>
  )
}

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  pagePath: PropTypes.string,
  location: PropTypes.object,
  prevLocation: PropTypes.object,
  pageTransitionURLTarget: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setPageTranstionURLTarget: PropTypes.func,
  setPageTransitionStart: PropTypes.func,
  setPageTransitionEnd: PropTypes.func,
  setPageTransitioning: PropTypes.func,
  setPageTransitioningIn: PropTypes.func,
}

const mapStateToProps = ({ prevLocation, pageTransitionURLTarget, pageTransitionStart, pageTransitionEnd }) => {
  return { prevLocation, pageTransitionURLTarget, pageTransitionStart, pageTransitionEnd }
}

const mapDispatchToProps = dispatch => {
  return {
    setPageTranstionURLTarget: target => dispatch({ type: `SETPAGETRANSITIONURLTARGET`, payload: target }),
    setPageTransitionStart: target => dispatch({ type: `SETPAGETRANSITIONSTART`, payload: target }),
    setPageTransitionEnd: target => dispatch({ type: `SETPAGETRANSITIONEND`, payload: target }),
    setPageTransitioning: target => dispatch({ type: `SETPAGETRANSITIONING`, payload: target }),
    setPageTransitioningIn: target => dispatch({ type: `SETPAGETRANSITIONINGIN`, payload: target }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTransition)
