import React from 'react'
import { Link } from 'gatsby'

import SEO from '@components/seo'
import Text from '@components/Text'

const SecondPage = () => (
  <>
    <SEO title="Page two" />
    <Text className="h1" tag="h1">
      Hi from the second page
    </Text>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage using gatsby Link</Link>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>more content</p>
  </>
)

export default SecondPage
