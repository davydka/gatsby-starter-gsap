import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

// import { black } from '@styles/variables.module.scss'
import BaseSvg from '@components/BaseSvg'

const Play = forwardRef(({ className }, ref) => {
  return (
    <BaseSvg width="100%" height="100%" viewBox="0 0 45 45" className={className}>
      {/*<svg width="45" height="45" xmlns="http://www.w3.org/2000/svg">*/}
      <g ref={ref} fill="none" fillRule="evenodd">
        <circle fill="#151515" cx="22.5" cy="22.5" r="22.5" />
        <g fill="#FFF">
          <path d="M18 16.2h2.4v12.6H18zM24.6 16.2H27v12.6h-2.4z" />
        </g>
      </g>
      {/*</svg>*/}
    </BaseSvg>
  )
})

Play.displayName = 'Play'

Play.propTypes = {
  className: PropTypes.string,
}

export default Play
