import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'

import styles from './SectionList.module.scss'

const cx = classnames.bind(styles)

const MobileCoverImage = ({ mobileMenuShow, image, type }) => {
  return (
    <img
      className={cx('cover-image', { 'is-tall': mobileMenuShow })}
      src={`/moon-glyph/images/${type}/${image}.png`}
      alt={type}
      height={1400}
      width={840}
    />
  )
}

MobileCoverImage.propTypes = {
  children: PropTypes.node,
  mobileMenuShow: PropTypes.bool,
  image: PropTypes.string,
  type: PropTypes.string,
}

const mapStateToProps = ({ showBorders, mobileMenuShow }) => {
  return { showBorders, mobileMenuShow }
}

export default connect(mapStateToProps)(MobileCoverImage)
