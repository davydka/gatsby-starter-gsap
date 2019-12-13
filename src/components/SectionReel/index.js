import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'

import styles from './SectionReel.module.scss'
import Text from '@components/Text'

const cx = classnames.bind(styles)

const SectionReel = ({ className, showBorders }) => {
  return (
    <div className={`${cx(className, 'section-reel', { borders: showBorders })}`}>
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

      <div className={cx('reel')}>
        <div className={cx('reel-item')}>
          <img src="/images/reel/01.png" alt="img" />
        </div>
        <div className={cx('reel-item')}>
          <img src="/images/reel/02.png" alt="img" />
        </div>
        <div className={cx('reel-item')}>
          <img src="/images/reel/03.png" alt="img" />
        </div>
        <div className={cx('reel-item')}>
          <img src="/images/reel/04.png" alt="img" />
        </div>
        <div className={cx('reel-item')}>
          <img src="/images/reel/05.png" alt="img" />
        </div>
        <div className={cx('reel-item')}>
          <img src="/images/reel/06.png" alt="img" />
        </div>
        <div className={cx('reel-item')}>
          <img src="/images/reel/07.png" alt="img" />
        </div>
        <div className={cx('reel-item')}>
          <img src="/images/reel/08.png" alt="img" />
        </div>
        <div className={cx('reel-item')}>
          <img src="/images/reel/09.png" alt="img" />
        </div>
        <div className={cx('reel-item')}>
          <img src="/images/reel/10.png" alt="img" />
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
