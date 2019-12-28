import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

// import { black } from '@styles/variables.module.scss'
import BaseSvg from '@components/BaseSvg'

const Close = forwardRef(({ className }, ref) => {
  return (
    <BaseSvg width="100%" height="100%" viewBox="0 0 13 14" className={className}>
      {/*<svg width="13" height="14" xmlns="http://www.w3.org/2000/svg">*/}
      <g ref={ref} fill="none" fillRule="evenodd">
        <g stroke="#151515" strokeLinecap="square" strokeWidth="2">
          <path d="M1.89 1.971l9.22 10.058M1.89 12.029l9.22-10.058" />
        </g>
      </g>
      {/*</svg>*/}
    </BaseSvg>
  )
})

Close.displayName = 'Close'

Close.propTypes = {
  className: PropTypes.string,
}

export default Close
