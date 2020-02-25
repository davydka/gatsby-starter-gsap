import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'

import styles from './SectionList.module.scss'

const cx = classnames.bind(styles)

const MobileInfo = ({ mobileMenuShow, children }) => {
  return <div className={cx('mobile-info', { 'is-tall': mobileMenuShow })}>{children}</div>
}

MobileInfo.propTypes = {
  children: PropTypes.node,
  mobileMenuShow: PropTypes.bool,
}

const mapStateToProps = ({ showBorders, mobileMenuShow }) => {
  return { showBorders, mobileMenuShow }
}

export default connect(mapStateToProps)(MobileInfo)
