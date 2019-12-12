import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'

import styles from './SectionVideo.module.scss'
import Text from '@components/Text'

const cx = classnames.bind(styles)

const SectionVideo = ({ className, showBorders }) => {
  return (
    <div className={`${cx(className, 'section-video', { borders: showBorders })}`}>
      <div className={`section-container`}>
        <div className={`section ${cx('section-borders')}`}>
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
                Video Section.
              </Text>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('video-holder')}>
        <video width={`1280`} height={`720`} autoPlay muted playsInline loop preload="true" poster="jelly.png">
          <source src="jelly.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

SectionVideo.propTypes = {
  className: PropTypes.string,
  showBorders: PropTypes.bool,
}

const mapStateToProps = ({ showBorders }) => {
  return { showBorders }
}

export default connect(mapStateToProps)(SectionVideo)
