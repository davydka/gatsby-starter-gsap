import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'

import styles from './SectionList.module.scss'

const cx = classnames.bind(styles)

const MobileInfo = ({ atPageTop, mobileMenuShow, children }) => {
  return <div className={cx('mobile-info', { 'is-tall': mobileMenuShow, 'at-top': atPageTop })}>{children}</div>
}

MobileInfo.propTypes = {
  atPageTop: PropTypes.bool,
  children: PropTypes.node,
  mobileMenuShow: PropTypes.bool,
}

const mapStateToProps = ({ showBorders, mobileMenuShow, atPageTop }) => {
  return { showBorders, mobileMenuShow, atPageTop }
}

export default connect(mapStateToProps)(MobileInfo)
