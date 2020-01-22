import React, { useRef, createRef, forwardRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import faker from 'faker'

import styles from './SectionCover.module.scss'
import Text from '@components/Text'
import Link from '@components/Link'
import Play from '@components/Logo/Play'
import Pause from '@components/Logo/Pause'

const cx = classnames.bind(styles)

const SectionCover = ({ className, showBorders, type }) => {
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

  const Cover = forwardRef(({ sku, type, image, count }, ref) => {
    return (
      <div ref={ref} className={cx(type)}>
        <Link to="/" className={cx('')}>
          <img src={`/moon-glyph/images/${type}/${image}.png`} alt={type} height={1400} width={840} />
        </Link>

        <button className={cx('play-pause', 'play')} onClick={() => handleClick(sku)}>
          <Play />
        </button>

        <button className={cx('play-pause', 'pause')} onClick={() => handleClick(false)}>
          <Pause />
        </button>

        <Link to="/" className={cx('content')}>
          <Text tag="h4" type="h4" className={cx('band-name')}>
            {(count / 2) % 1 ? `Capricorn Vertical Slum` : `${faker.hacker.verb()} ${faker.hacker.noun()}`}
          </Text>

          <Text tag="h4" type="h4" className={cx('title')}>
            {(count / 2) % 1
              ? `Various Portals & Sleazo Inputs Vol.1: Tourism`
              : `${faker.hacker.ingverb()} ${faker.random.word()}`}
          </Text>
        </Link>
      </div>
    )
  })

  Cover.displayName = 'Cover'

  Cover.propTypes = {
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
  ]

  const elRef = useRef([...Array(itemsArray.length)].map(() => createRef()))
  const items = itemsArray.map((item, index) => {
    const target = (
      <Cover ref={elRef.current[index]} key={index} count={index} sku={item.sku} type={item.type} image={item.image} />
    )

    if (!type) {
      return target
    } else if (item.type === type) {
      return target
    }
  })

  return (
    <div className={`section-container ${cx('section-cover', className, { borders: showBorders })}`}>
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

SectionCover.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  showBorders: PropTypes.bool,
}

const mapStateToProps = ({ showBorders }) => {
  return { showBorders }
}

// SectionCover.whyDidYouRender = {
//   logOnDifferentValues: true,
// }

export default connect(mapStateToProps)(SectionCover)
