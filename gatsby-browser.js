import * as dat from'dat.gui'

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

export const onInitialClientRender = (_, opts) => {
  // console.log(opts)
  window.app = {}
  window.app.gui = new dat.GUI({ autoPlace: false });
}
