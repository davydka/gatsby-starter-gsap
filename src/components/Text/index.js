import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

import { TYPES } from './constants'

import styles from './Text.module.scss'

const cx = classnames.bind(styles)

const Text = forwardRef(({ tag: Tag, children, className, type, ...props }, ref) => (
  <Tag ref={ref} className={cx(styles[type], className)} {...props}>
    {children}
  </Tag>
))

Text.displayName = 'Text'

Text.propTypes = {
  tag: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(TYPES).isRequired,
}

export default Text
