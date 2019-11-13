import React, {
  useState,
  useEffect,
  useRef
} from "react"
import { connect } from "react-redux"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import classnames from 'classnames/bind'

import Holder from './holder'
import Header from "../header"
import "./layout.css"
import styles from './Layout.module.scss'

const cx = classnames.bind(styles)

const Index = ({ count, increment, set, children }) => {
  //GUIパラメータの準備
  let gui = useRef(null);
  let inletsHolder = useRef({
    message: 'dat.guiのサンプル',
    count: 0,
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
    set(inletsHolder.current.count)
  }

  useEffect(() => {
    if(inlets){
      console.log('inlets', inlets)
    }
  }, [inlets])

  useEffect(() => {
    console.log('🌈 layout mounted')

    gui.current = new window.dat.GUI()
    const { current } = gui
    current.add(inletsHolder.current, 'message').onChange(handleChange).listen()
    current.add(inletsHolder.current, 'count', 0, 100).onChange(handleChange).listen()
    current.addColor(inletsHolder.current, 'color').onChange(handleChange).listen()
    current.add(inletsHolder.current, 'fontSize', 6, 48).onChange(handleChange).listen()
    current.add(inletsHolder.current, 'border').onChange(handleChange).listen()
    current.add(inletsHolder.current, 'fontFamily',[
      "sans-serif",
      "serif",
      "cursive",
      "ＭＳ 明朝",
      "monospace"
    ]).onChange(handleChange).listen()

    handleChange()
  }, [])

  const handleClick = () => {
    console.log('click')
    increment(2)
    increment(2)
  }

  useEffect(() => {
    inletsHolder.current.count = count
  }, [count])

  return (
    <Holder>
      <Header siteTitle={siteData.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <div>{count} <span role='img' aria-label='emoji'>👈</span> counts</div>
        <button onClick={handleClick}>test gui REDUX</button>

        <div style={{
          background: inlets.color,
          fontSize: `${inlets.fontSize}px`,
          fontFamily: inlets.fontFamily,
          border: inlets.border ? '10px solid black' : '',
        }} className={cx('target')}>
          {inlets.message}
        </div>

        <main>{children}</main>

        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </Holder>
  )
}

Index.propTypes = {
  children: PropTypes.node.isRequired,
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
}

const mapStateToProps = ({ count }) => {
  return { count }
}

const mapDispatchToProps = dispatch => {
  return {
    increment: (amount) => dispatch({ type: `INCREMENT`, payload: amount }),
    set: (target) => dispatch({ type: `SET`, payload: target }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
