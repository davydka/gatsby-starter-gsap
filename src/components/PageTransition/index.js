import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
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
      // console.log('going to:', pageNavigate.replace('/', ''))
      // console.log('coming from:', location.pathname.replace('/', ''))
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
      pageTransitionURLTarget.replace('/', '') !== location.pathname.replace('/', '') &&
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
          setPageTransitioning(true)
          setPageTranstionURLTarget(false)
        },
        onComplete: () => {
          setPageTransitioning(false)
          setPageTranstionURLTarget(false)
          navigate(pageTransitionURLTarget)
        },
      })
    }
  }, [pageTransitionURLTarget, location, pagePath])

  const TransitionNode = forwardRef(({ children }, ref) => {
    const thisRef = useRef(null)
    useImperativeHandle(ref, () => thisRef.current)
    return <div ref={thisRef}>{children}</div>
  })
  TransitionNode.displayName = 'TransitionNode'

  useEffect(() => {
    console.log('𝍌𝍌𝍌 PageTransition mounted')
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
          onComplete: () => {
            // console.log('📃 page transition end!!')
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
  setPageTransitioning: PropTypes.func,
  setPageTransitioningIn: PropTypes.func,
}

const mapStateToProps = ({ prevLocation, pageTransitionURLTarget }) => {
  return { prevLocation, pageTransitionURLTarget }
}

const mapDispatchToProps = dispatch => {
  return {
    setPageTranstionURLTarget: target => dispatch({ type: `SETPAGETRANSITIONURLTARGET`, payload: target }),
    setPageTransitioning: target => dispatch({ type: `SETPAGETRANSITIONING`, payload: target }),
    setPageTransitioningIn: target => dispatch({ type: `SETPAGETRANSITIONINGIN`, payload: target }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTransition)
