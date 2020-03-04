import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'

import styles from './SectionList.module.scss'

const cx = classnames.bind(styles)

const CoverImage = ({ atPageTop, mobileMenuShow, image, type }) => {
  return (
    <img
      className={cx('cover-image', { 'is-tall': mobileMenuShow, 'at-top': atPageTop })}
      src={`/moon-glyph/images/${type}/${image}.png`}
      alt={type}
      height={1400}
      width={840}
    />
  )
}

CoverImage.propTypes = {
  atPageTop: PropTypes.bool,
  children: PropTypes.node,
  mobileMenuShow: PropTypes.bool,
  image: PropTypes.string,
  type: PropTypes.string,
}

const mapStateToProps = ({ showBorders, mobileMenuShow, atPageTop }) => {
  return { showBorders, mobileMenuShow, atPageTop }
}

export default connect(mapStateToProps)(CoverImage)
