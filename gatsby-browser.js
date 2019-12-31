import React from 'react'

import './src/styles/fonts.scss'
import './src/styles/resets.scss'
import './src/styles/defaults.scss'

import wrapWithProvider from './wrap-with-provider'

export const wrapRootElement = wrapWithProvider

export const onInitialClientRender = () => {
  console.log('🎨🎨🎨 Initial Client Render 🎨🎨🎨')
}

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (location && location.state) location.state.prevLocation = prevLocation ? prevLocation : null
}

// disabling for now...
export const shouldUpdateScroll = () => {
  return false
}

/* eslint-disable */
export const onClientEntry = () => {
  if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render')
    whyDidYouRender(React)
  }
}
/* eslint-enable */
