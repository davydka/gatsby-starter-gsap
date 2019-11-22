import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import { black } from '@styles/variables.module.scss'

const BaseSvg = forwardRef(({ viewBox, height, width, type, children, color, ...rest }, ref) => {
  // We want the default dimensions to be 100%, which covers most
  // use-cases, but only if BOTH the width and height props are not set
  const trueWidth = width || height ? width : '100%'
  const trueHeight = width || height ? height : '100%'

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      width={trueWidth}
      height={trueHeight}
      focusable="false" // IE behavior requires this,
      style={{
        display: 'block',
        userSelect: 'none',
        [type]: color,
      }}
      {...rest}
    >
      {children}
    </svg>
  )
})

BaseSvg.displayName = 'BaseSvg'

BaseSvg.defaultProps = {
  height: null,
  width: null,
  color: black,
  type: 'fill',
}

BaseSvg.propTypes = {
  viewBox: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.oneOf(['fill', 'stroke']),
  children: PropTypes.node,
}

export default BaseSvg
