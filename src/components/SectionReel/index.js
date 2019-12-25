import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import gsap, { Linear } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { detect } from 'detect-browser'

import styles from './SectionReel.module.scss'
import Text from '@components/Text'

const cx = classnames.bind(styles)
const browser = detect()
gsap.registerPlugin(ScrollToPlugin)

const SectionReel = ({ className, showBorders }) => {
  const reelRef = useRef(null)
  const [mouseDown, setMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startScrollX, setStartScrollX] = useState(0)
  const handleMouseDown = e => {
    setMouseDown(true)
    setStartX(e.pageX)
    setStartScrollX(e.currentTarget.scrollLeft)
  }

  const handleMouseMove = e => {
    if (!mouseDown || !reelRef.current) {
      return
    }

    reelRef.current.scrollLeft = startScrollX + startX - e.pageX
  }

  const handleMouseUp = () => {
    if (!mouseDown || !reelRef.current) {
      return
    }
    setMouseDown(false)
    const children = reelRef.current.children
    const margin = parseInt(window.getComputedStyle(children[0]).marginLeft)
    const atEnd = reelRef.current.scrollLeft + window.innerWidth >= reelRef.current.scrollWidth // scrolled to the end?

    const positions = []
    for (let i = 0; i < children.length; i++) {
      positions.push(children[i].offsetLeft - margin)
    }

    const closest = positions.reduce(function(prev, curr) {
      return Math.abs(curr - reelRef.current.scrollLeft) < Math.abs(prev - reelRef.current.scrollLeft) ? curr : prev
    })

    if (browser && browser.name !== 'chrome' && browser.name !== 'safari') {
      const scrollToParams = { y: 0, x: atEnd ? 'max' : closest }
      gsap.to(reelRef.current, {
        duration: 0.2,
        // scrollLeft: atEnd ? positions[closestIndex + 1] : closest,
        scrollTo: scrollToParams,
        ease: Linear.ease,
      })
    } else {
      reelRef.current.scrollTo({
        top: 0,
        left: atEnd ? reelRef.current.scrollWidth : closest,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className={`${cx(className, 'section-reel', { borders: showBorders, 'mouse-down': mouseDown })}`}>
      <div className={`section-container`}>
        <div className={`section`}>
          <div className={`row`}>
            <div
              className={`
                col-xl-4
                offset-xl-4
                col-lg-4
                offset-lg-4
                col-md-4
                offset-md-2
                col-sm-4
                offset-sm-2
                col-xs-8
                offset-xs-1
              `}
            >
              <Text tag="h3" type="h3" className={cx('section-title')}>
                Reel Section.
              </Text>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={reelRef}
        draggable="false"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={cx('reel')}
      >
        <div className={cx('reel-item')}>
          <img
            onDragStart={e => {
              e.preventDefault()
            }}
            draggable="false"
            src="/images/reel/01.png"
            alt="img"
          />
        </div>
        <div className={cx('reel-item')}>
          <img
            onDragStart={e => {
              e.preventDefault()
            }}
            draggable="false"
            src="/images/reel/02.png"
            alt="img"
          />
        </div>
        <div className={cx('reel-item')}>
          <img
            onDragStart={e => {
              e.preventDefault()
            }}
            draggable="false"
            src="/images/reel/03.png"
            alt="img"
          />
        </div>
        <div className={cx('reel-item')}>
          <img
            onDragStart={e => {
              e.preventDefault()
            }}
            draggable="false"
            src="/images/reel/04.png"
            alt="img"
          />
        </div>
        <div className={cx('reel-item')}>
          <img
            onDragStart={e => {
              e.preventDefault()
            }}
            draggable="false"
            src="/images/reel/05.png"
            alt="img"
          />
        </div>
        <div className={cx('reel-item')}>
          <img
            onDragStart={e => {
              e.preventDefault()
            }}
            draggable="false"
            src="/images/reel/06.png"
            alt="img"
          />
        </div>
        <div className={cx('reel-item')}>
          <img
            onDragStart={e => {
              e.preventDefault()
            }}
            draggable="false"
            src="/images/reel/07.png"
            alt="img"
          />
        </div>
        <div className={cx('reel-item')}>
          <img
            onDragStart={e => {
              e.preventDefault()
            }}
            draggable="false"
            src="/images/reel/08.png"
            alt="img"
          />
        </div>
        <div className={cx('reel-item')}>
          <img
            onDragStart={e => {
              e.preventDefault()
            }}
            draggable="false"
            src="/images/reel/09.png"
            alt="img"
          />
        </div>
        <div className={cx('reel-item')}>
          <img
            onDragStart={e => {
              e.preventDefault()
            }}
            draggable="false"
            src="/images/reel/10.png"
            alt="img"
          />
        </div>
      </div>
    </div>
  )
}

SectionReel.propTypes = {
  className: PropTypes.string,
  showBorders: PropTypes.bool,
}

const mapStateToProps = ({ showBorders }) => {
  return { showBorders }
}

export default connect(mapStateToProps)(SectionReel)
