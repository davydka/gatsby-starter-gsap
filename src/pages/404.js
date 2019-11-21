import React from 'react'

import SEO from '@components/seo'
import Text from '@components/Text'

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Text tag="h1" type="h1">
      NOT FOUND
    </Text>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </>
)

export default NotFoundPage
