import React, {
  useState,
  useEffect,
  useRef
} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import classnames from 'classnames/bind'
import { connect } from "react-redux"
import { TimelineMax, TweenMax, Linear } from "gsap"
import * as THREE from 'three'

import Holder from './holder'
import Header from "../header"

import "./layout.css"
import styles from './Layout.module.scss'

const cx = classnames.bind(styles)

const Index = ({ count, increment, set, children }) => {
  //GUIパラメータの準備
  let gui = useRef();

  // GUI Inlets
  let inletsHolder = useRef({
    message: 'dat.guiのサンプル',
    speed: 1.0,
    count: 0,
    color: '#ff0000',
    fontSize: '24',
    border: false,
    fontFamily: 'sans-serif'
  })
  let [inlets, setInlets] = useState()

  // GUI Inlets Handler
  let handleInletChange = useRef();
  handleInletChange.current = () => {
    setInlets(Object.assign({}, inletsHolder.current))
    set(inletsHolder.current.count)
  }

  // GUI Inlets Console
  useEffect(() => {
    if(!inlets) {
      return
    }
    console.log('inlets', inlets)

    if(inlets.speed) {
      setSpeed(inlets.speed)
      gs.current.timeScale(inlets.speed)
    }
  }, [inlets])

  // Stats
  let stats = useRef();

  // GSAP
  let gs = useRef()

  // Canvas
  let canvasElement = useRef()
  let targetElement = useRef()

  // Gatsby
  const siteData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // componentDidMount
  useEffect(() => {
    console.log('🌈 layout mounted')

    /** Stats **/
    stats.current = new window.Stats()
    stats.current.showPanel( 0 ) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.current.dom.style.top = 'auto'
    stats.current.dom.style.left = 'auto'
    stats.current.dom.style.right = '15px'
    stats.current.dom.style.bottom = '0'
    document.body.appendChild( stats.current.dom )

    /** GUI **/
    gui.current = new window.dat.GUI()
    const { current } = gui
    current.add(inletsHolder.current, 'message').onChange(handleInletChange).listen()
    current.add(inletsHolder.current, 'speed', 0.0, 2.0).onChange(handleInletChange).listen()
    current.add(inletsHolder.current, 'count', 0, 100).onChange(handleInletChange).listen()
    current.addColor(inletsHolder.current, 'color').onChange(handleInletChange).listen()
    current.add(inletsHolder.current, 'fontSize', 6, 48).onChange(handleInletChange).listen()
    current.add(inletsHolder.current, 'border').onChange(handleInletChange).listen()
    current.add(inletsHolder.current, 'fontFamily',[
      "sans-serif",
      "serif",
      "cursive",
      "ＭＳ 明朝",
      "monospace"
    ]).onChange(handleInletChange).listen()
    handleInletChange.current()

    /** GSAP **/
    gs.current = new TimelineMax({
      repeat: -1,
      timeScale: 1.0,
      // paused: true,
    })
    gs.current.to(targetElement, 1, {
      rotation: 360,
      ease: Linear.easeNone,
    })

    /** Animate Kickoff **/
    animate.current()
  }, [])




  // Redux -> GUI Inlets
  useEffect(() => {
    inletsHolder.current.count = count
  }, [count])

  const [speed, setSpeed] = useState(1.0)

  // Redux + React
  const handleClick = () => {
    console.log('click')
    increment(2)
  }

  function scaleUp() {
    TweenMax.to(targetElement, 1, {
      scale: 2.0,
      ease: Linear.ease
    });
  }

  function scaleDown() {
    TweenMax.to(targetElement, 1, {
      scale: 1.0
    });
  }



  // ANIMATE
  let animate = useRef()
  animate.current = () => {
    stats && stats.current && stats.current.begin();

    // stuff

    requestAnimationFrame(animate.current)
    stats.current.end();
  };

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
        <div>{speed} <span role='img' aria-label='emoji'>🚤</span> speed</div>
        <button onClick={handleClick}>test gui REDUX</button>

        {inlets &&
        <div style={{
          background: inlets.color,
          fontSize: `${inlets.fontSize}px`,
          fontFamily: inlets.fontFamily,
          border: inlets.border ? '10px solid black' : '',
        }} className={cx('inlet-target')}>
          {inlets.message}
        </div>
        }

        <main>
          <div className={cx('container')} width='640' height='480'>
            <canvas className={cx('canvas')} ref={element => {canvasElement = element}} width='640' height='480' />

            <div
              onMouseEnter={scaleUp}
              onMouseLeave={scaleDown}
              ref={element => {targetElement = element}}
              className={cx('target')}
            >
              hello!
            </div>
          </div>

          {children}
        </main>

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
