import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'

import styles from './SectionList.module.scss'

const cx = classnames.bind(styles)

const MobileBlock = ({ mobileMenuShow }) => {
  return <div className={cx('mobile-block', { 'is-tall': mobileMenuShow })} />
}

MobileBlock.propTypes = {
  mobileMenuShow: PropTypes.bool,
}

const mapStateToProps = ({ showBorders, mobileMenuShow }) => {
  return { showBorders, mobileMenuShow }
}

export default connect(mapStateToProps)(MobileBlock)
