import React, { useState } from 'react'
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

const SectionCover = ({ className, showBorders }) => {
  const [selected, setSelected] = useState(false)

  const Cover = ({ sku, type, image }) => {
    return (
      <div className={cx(type, { playing: sku === selected })}>
        <Link to="/" className={cx('')}>
          <img src={`/moon-glyph/images/${type}/${image}.png`} alt={type} />
        </Link>

        {sku !== selected && (
          <button className={cx('play-pause')} onClick={() => setSelected(sku)}>
            <Play />
          </button>
        )}

        {sku === selected && (
          <button className={cx('play-pause')} onClick={() => setSelected(false)}>
            <Pause />
          </button>
        )}

        <Link to="/" className={cx('content')}>
          <Text tag="h4" type="h4" className={cx('band-name')}>
            {faker.hacker.verb()} {faker.hacker.noun()}
          </Text>

          <Text tag="h4" type="h4" className={cx('title')}>
            {faker.hacker.ingverb()} {faker.random.word()}
          </Text>
        </Link>
      </div>
    )
  }

  Cover.propTypes = {
    sku: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
  }

  return (
    <div className={`section-container ${cx('section-cover', className, { borders: showBorders })}`}>
      <div className={`section`}>
        <div className={`row`}>
          <div className={`col`}>
            <div className={cx('content-container')}>
              <Cover sku="mg001" type="cassette" image="01" />
              <Cover sku="mg002" type="cassette" image="02" />
              <Cover sku="mg003" type="cassette" image="03" />
              <Cover sku="mg004" type="cassette" image="04" />
              <Cover sku="mg005" type="cassette" image="05" />

              <Cover sku="mg006" type="vinyl" image="01" />
              <Cover sku="mg007" type="vinyl" image="02" />
              <Cover sku="mg008" type="vinyl" image="03" />

              <Cover sku="mg009" type="cassette" image="06" />
              <Cover sku="mg010" type="vinyl" image="04" />
              <Cover sku="mg011" type="cassette" image="07" />
              <Cover sku="mg012" type="cassette" image="08" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SectionCover.propTypes = {
  className: PropTypes.string,
  showBorders: PropTypes.bool,
}

const mapStateToProps = ({ showBorders }) => {
  return { showBorders }
}

export default connect(mapStateToProps)(SectionCover)
