import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

// import { black } from '@styles/variables.module.scss'
import BaseSvg from '@components/BaseSvg'

const Cart = forwardRef(({ className }, ref) => {
  return (
    <BaseSvg width="100%" height="100%" viewBox="0 0 19 27" className={className}>
      {/*<svg width="19" height="27" xmlns="http://www.w3.org/2000/svg">*/}
      <g ref={ref} stroke="#151515" strokeWidth="1.5" fill="none" fillRule="evenodd">
        <path d="M2 6.825h14.5l1 18.908H1z" />
        <path d="M5.9 10V4.867C5.9 3.15 6.764 1 9.126 1 11.487 1 12.7 2.698 12.7 4.867V10" strokeLinecap="round" />
      </g>
      {/*</svg>*/}
    </BaseSvg>
  )
})

Cart.displayName = 'Cart'

Cart.propTypes = {
  className: PropTypes.string,
}

export default Cart
