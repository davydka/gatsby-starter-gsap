import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"

const SecondPage = () => (
  <>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage using gatsby Link</Link>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <p>more content</p>
  </>
)

export default SecondPage
