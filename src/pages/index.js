import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="GSAP Gatsby Starter"/>
    <h1>HELLO</h1>
    <Link to="/page-2/" state={{ test: 'hello' }}>Go to page 2 using
      gatsby link with state</Link>
    <br/>
    <Link to="/page-2/">Go to page 2 using gatsby Link</Link>
    <br/>
    <a href='/page-2/'>Go to page 2 using anchor tag</a>
  </Layout>
)

export default IndexPage
