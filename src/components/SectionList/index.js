import React, { useLayoutEffect, useRef, createRef, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import faker from 'faker'

import styles from './SectionList.module.scss'
import Text from '@components/Text'
import Link from '@components/Link'
import Play from '@components/Logo/Play'
import Pause from '@components/Logo/Pause'

import MobileBlock from './MobileBlock'
import MobileInfo from './MobileInfo'
import CoverImage from './CoverImage'

const cx = classnames.bind(styles)

const SectionList = ({ className, showBorders, type }) => {
  const handleClick = sku => {
    itemsArray.map((item, index) => {
      const targetRef = elRef.current[index]

      if (!targetRef.current) return

      if (item.sku === sku) {
        targetRef.current.classList.add(cx('playing'))
      } else {
        targetRef.current.classList.remove(cx('playing'))
      }
    })
  }

  const handleMouseEnter = sku => {
    return () => {
      itemsArray.map((item, index) => {
        const targetRef = elRef.current[index]

        if (!targetRef.current) return

        if (item.sku === sku) {
          targetRef.current.classList.add(cx('hovered'))
        } else {
          targetRef.current.classList.remove(cx('hovered'))
        }
      })
    }
  }

  useLayoutEffect(() => {
    handleMouseEnter(itemsArray[0].sku)()
  }, [])

  const [fakename] = useState(`${faker.hacker.verb()} ${faker.hacker.noun()}`)
  const List = forwardRef(({ sku, type, image, count }, ref) => {
    return (
      <div ref={ref} className={cx(type)} /*onMouseEnter={handleMouseEnter(sku)}*/>
        <CoverImage image={image} type={type} />

        <MobileInfo>
          <Text tag="h4" type="h4" className={cx('mobile-band-name')}>
            {(count / 2) % 1 ? `Capricorn Vertical Slum` : fakename}
          </Text>
        </MobileInfo>

        <div className={cx('content')}>
          <div className={cx('band-name-container', 'play-pause-container')}>
            <div className={cx('mobile-playpause')}>
              <button className={cx('play-pause', 'play')} onClick={() => handleClick(sku)}>
                <Play />
              </button>

              <button className={cx('play-pause', 'pause')} onClick={() => handleClick(false)}>
                <Pause />
              </button>
            </div>

            <Link to="/">
              <Text tag="h4" type="h2" className={cx('band-name')}>
                {(count / 2) % 1 ? `Capricorn Vertical Slum` : fakename}
              </Text>
            </Link>
          </div>

          <div className={cx('title', 'play-pause-container')}>
            <div className={cx('desktop-playpause')}>
              <button className={cx('play-pause', 'play')} onClick={() => handleClick(sku)}>
                <Play />
              </button>

              <button className={cx('play-pause', 'pause')} onClick={() => handleClick(false)}>
                <Pause />
              </button>
            </div>

            <Text tag="h4" type="h2">
              {(count / 2) % 1 ? `Various Portals & Sleazo Inputs Vol.1: Tourism` : fakename}
            </Text>
          </div>

          <Link to="/" className={cx('release-format')}>
            <Text tag="h4" type="h2" className={cx('type')}>
              {Math.random() > 0.5 ? `LP/CS` : `CS`}
            </Text>
          </Link>

          <Link to="/" className={cx('sku')}>
            <Text tag="h4" type="h2">
              {sku}
            </Text>
          </Link>
        </div>
      </div>
    )
  })

  List.displayName = 'Cover'

  List.propTypes = {
    sku: PropTypes.string,
    type: PropTypes.string,
    selected: PropTypes.bool,
    image: PropTypes.string,
    count: PropTypes.number,
  }

  const itemsArray = [
    { sku: 'mg001', type: 'cassette', image: '01' },
    { sku: 'mg002', type: 'cassette', image: '02' },
    { sku: 'mg003', type: 'cassette', image: '03' },
    { sku: 'mg004', type: 'cassette', image: '04' },
    { sku: 'mg005', type: 'cassette', image: '05' },

    { sku: 'mg006', type: 'vinyl', image: '01' },
    { sku: 'mg007', type: 'vinyl', image: '02' },
    { sku: 'mg008', type: 'vinyl', image: '03' },

    { sku: 'mg009', type: 'cassette', image: '06' },
    { sku: 'mg010', type: 'vinyl', image: '04' },
    { sku: 'mg011', type: 'cassette', image: '07' },
    { sku: 'mg012', type: 'cassette', image: '08' },

    { sku: 'mg013', type: 'cassette', image: '01' },
    { sku: 'mg014', type: 'cassette', image: '02' },
    { sku: 'mg015', type: 'cassette', image: '03' },
    { sku: 'mg016', type: 'cassette', image: '04' },
    { sku: 'mg017', type: 'cassette', image: '05' },

    { sku: 'mg018', type: 'vinyl', image: '01' },
    { sku: 'mg019', type: 'vinyl', image: '02' },
    { sku: 'mg020', type: 'vinyl', image: '03' },

    { sku: 'mg021', type: 'cassette', image: '06' },
    { sku: 'mg022', type: 'vinyl', image: '04' },
    { sku: 'mg023', type: 'cassette', image: '07' },
    { sku: 'mg024', type: 'cassette', image: '08' },

    { sku: 'mg025', type: 'cassette', image: '01' },
    { sku: 'mg026', type: 'cassette', image: '02' },
    { sku: 'mg027', type: 'cassette', image: '03' },
    { sku: 'mg028', type: 'cassette', image: '04' },
    { sku: 'mg029', type: 'cassette', image: '05' },

    { sku: 'mg030', type: 'vinyl', image: '01' },
    { sku: 'mg031', type: 'vinyl', image: '02' },
    { sku: 'mg032', type: 'vinyl', image: '03' },

    { sku: 'mg033', type: 'cassette', image: '06' },
    { sku: 'mg034', type: 'vinyl', image: '04' },
    { sku: 'mg035', type: 'cassette', image: '07' },
    { sku: 'mg036', type: 'cassette', image: '08' },

    { sku: 'mg037', type: 'cassette', image: '01' },
    { sku: 'mg038', type: 'cassette', image: '02' },
    { sku: 'mg039', type: 'cassette', image: '03' },
    { sku: 'mg040', type: 'cassette', image: '04' },
    { sku: 'mg041', type: 'cassette', image: '05' },

    { sku: 'mg042', type: 'vinyl', image: '01' },
    { sku: 'mg043', type: 'vinyl', image: '02' },
    { sku: 'mg044', type: 'vinyl', image: '03' },

    { sku: 'mg045', type: 'cassette', image: '06' },
    { sku: 'mg046', type: 'vinyl', image: '04' },
    { sku: 'mg047', type: 'cassette', image: '07' },
    { sku: 'mg048', type: 'cassette', image: '08' },
  ]

  const elRef = useRef([...Array(itemsArray.length)].map(() => createRef()))
  const items = itemsArray.map((item, index) => {
    const target = (
      <List ref={elRef.current[index]} key={index} count={index} sku={item.sku} type={item.type} image={item.image} />
    )

    if (!type) {
      return target
    } else if (item.type === type) {
      return target
    }
  })

  return (
    <div className={`section-container ${cx('section-list', className, { borders: showBorders })}`}>
      <MobileBlock />
      <div className={`section`}>
        <div className={`row`}>
          <div className={`col`}>
            <div className={cx('content-container')}>{items}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

SectionList.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  showBorders: PropTypes.bool,
}

const mapStateToProps = ({ showBorders }) => {
  return { showBorders }
}

// SectionList.whyDidYouRender = {
//   logOnDifferentValues: true,
// }

export default connect(mapStateToProps)(SectionList)
