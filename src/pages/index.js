import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Canvas from "../components/Canvas"

const IndexPage = () => (
  <Layout>
    <SEO title="GSAP Gatsby Starter"/>
    <h1>HELLO</h1>
    <Canvas width='640' height='480'/>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
