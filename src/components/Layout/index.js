import React, { useState, useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import classnames from 'classnames/bind'

import Header from "../header"
import "./layout.css"
import styles from './Layout.module.scss'

const cx = classnames.bind(styles)

const Index = ({ children }) => {
  let guiElement = useRef(null)
  const [controls, setControls] = useState({text: 'hello world', test: false})
  const [test, setTest] = useState(false)

  const siteData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [data, setData] = useState({
    package: 'react-dat-gui',
    power: 9000,
    isAwesome: true,
    feelsLike: '#2FA1D6',
  })

  useEffect(() => {
    console.log('layout mounted')
    console.log(window.app.gui)
    console.log(controls)

    guiElement.innerHTML = ''
    guiElement.appendChild(window.app.gui.domElement)
    window.app.gui.add(controls, 'test')
    window.app.gui.add(controls, 'text')
  }, [])

  useEffect(() => {
    console.log(window.app.gui.__controllers)
    for (var i in window.app.gui.__controllers) {
      window.app.gui.__controllers[i].updateDisplay();
    }
  }, [controls])

  const handleClick = () => {
    setControls({
      ...controls,
      test: !controls.test
    })
  }

  return (
    <>
      <Header siteTitle={siteData.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <div className={cx('gui')} ref={element => {guiElement = element}} />
        <button onClick={handleClick}>test gui</button>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Index.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Index
