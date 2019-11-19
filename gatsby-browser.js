/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import wrapWithProvider from "./wrap-with-provider"

export const wrapRootElement = wrapWithProvider

export const onInitialClientRender = (_, opts) => {
  console.log('🎨🎨🎨 Initial Client Render 🎨🎨🎨')
}

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (location && location.state)
    location.state.prevLocation = prevLocation ? prevLocation : null
}