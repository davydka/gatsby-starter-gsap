import React, {
  useState,
  useEffect,
  useRef
} from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import classnames from 'classnames/bind'

import Header from "../header"
import "./layout.css"
import styles from './Layout.module.scss'

const cx = classnames.bind(styles)

const Index = ({ children }) => {
  //GUIパラメータの準備
  let gui = useRef(null);
  let inletsHolder = useRef({
    message: 'dat.guiのサンプル',
    color: '#ff0000',
    fontSize: '24',
    border: false,
    fontFamily: 'sans-serif'
  })
  let [inlets, setInlets] = useState('')

  const siteData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const handleChange = () => {
    setInlets(Object.assign({}, inletsHolder.current))
    console.log(inlets)
  }

  useEffect(() => {
    console.log('🌈 layout mounted')

    gui.current = new window.dat.GUI()
    const { current } = gui
    current.add(inletsHolder.current, 'message').onChange(handleChange);
    current.addColor(inletsHolder.current, 'color').onChange(handleChange);
    current.add(inletsHolder.current, 'fontSize', 6, 48).onChange(handleChange);
    current.add(inletsHolder.current, 'border').onChange(handleChange);
    current.add(inletsHolder.current, 'fontFamily',["sans-serif", "serif", "cursive", "ＭＳ 明朝", "monospace"]).onChange(handleChange);
    handleChange()
  }, [])


  const handleClick = () => {
    console.log('click')
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
        <button onClick={handleClick}>test gui</button>
        <div style={{
          background: inlets.color,
          fontSize: inlets.fontSize,
          fontFamily: inlets.fontFamily,
          border: inlets.border ? '10px solid black' : '',
        }} className={cx('target')}>{inlets.message}</div>
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
