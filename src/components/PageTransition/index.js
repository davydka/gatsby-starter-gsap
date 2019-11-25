import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import gsap from 'gsap'

const PageTransition = ({ children, pagePath, location, prevLocation }) => {
  const [locationHolder, setLocationHolder] = useState('')
  const [opacity, setOpacity] = useState(1)
  useEffect(() => {
    if (prevLocation && typeof prevLocation.pathname !== 'undefined' && locationHolder !== location.pathname) {
      setOpacity(0)
    }
  }, [opacity])

  useEffect(() => {
    console.log('𝍌 PageTransition mounted')
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
        console.log('📃 page: on enter')
      }}
      onEntering={() => {
        console.log('📃 page: on entering')
      }}
      onEntered={() => {
        console.log('📃 page: on entered')
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
            console.log('📃 page transition end!!')
            if (!loadingOut) {
              setLocationHolder(location.pathname)
            }
            done()
          },
        })
      }}
    >
      <div style={{ opacity }}>{children}</div>
    </Transition>
  )
}

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  pagePath: PropTypes.string,
  location: PropTypes.object,
  prevLocation: PropTypes.object,
}

const mapStateToProps = ({ prevLocation }) => {
  return { prevLocation }
}

export default connect(mapStateToProps)(PageTransition)
