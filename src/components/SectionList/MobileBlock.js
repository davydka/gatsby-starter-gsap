import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'

import styles from './SectionList.module.scss'

const cx = classnames.bind(styles)

const MobileBlock = ({ atPageTop, mobileMenuShow }) => {
  return <div className={cx('mobile-block', { 'is-tall': mobileMenuShow, 'at-top': atPageTop })} />
}

MobileBlock.propTypes = {
  atPageTop: PropTypes.bool,
  mobileMenuShow: PropTypes.bool,
}

const mapStateToProps = ({ showBorders, mobileMenuShow, atPageTop }) => {
  return { showBorders, mobileMenuShow, atPageTop }
}

export default connect(mapStateToProps)(MobileBlock)
