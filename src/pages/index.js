import React from 'react'
import { Link } from 'gatsby'

import SEO from '@components/seo'
import Text from '@components/Text'

const IndexPage = () => (
  <>
    <SEO title="GSAP Gatsby Starter" />

    <div className="module-container">
      <div className="module">
        <Text type="h1" tag="h1">
          HELLO
        </Text>
        <Link to="/page-2/" state={{ test: 'hello' }}>
          Go to page 2 using gatsby link with state
        </Link>
        <br />
        <Link to="/page-2/">Go to page 2 using gatsby Link</Link>
        <br />
        <a href="/page-2/">Go to page 2 using anchor tag</a>
      </div>
    </div>
    <div>
      <Text tag="h6" type="h6">
        Content outside the module
      </Text>
    </div>
  </>
)

export default IndexPage
