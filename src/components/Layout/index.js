import React, {
  useState,
  useEffect,
  useRef
} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import classnames from 'classnames/bind'
import { connect } from "react-redux"
import gsap, { Linear } from "gsap"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Holder from './holder'
import Header from "../header"

import "./layout.css"
import styles from './Layout.module.scss'

const cx = classnames.bind(styles)

const Index = ({ count, increment, set, children }) => {
  //GUIパラメータの準備
  let gui = useRef()

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
  let handleInletChange = useRef()
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

      // 👇 specific timeline scale
      // gs.current.timeScale(inlets.speed)

      // 🌎 Global Scale
      gsap.globalTimeline.timeScale(inlets.speed)
    }
  }, [inlets])

  // Stats
  let stats = useRef()

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

  // THREE
  const width = 960
  const height = 540
  let scene = useRef()
  let camera = useRef()
  let renderer = useRef()
  let controls = useRef()
  let mesh = useRef()

  let initializeOrbits = useRef()
  initializeOrbits.current = () => {
    if(!controls) { return }
    controls.current.rotateSpeed = 1.0
    controls.current.zoomSpeed = 1.2
    controls.current.panSpeed = 0.8
  };

  let initializeCamera = useRef()
  initializeCamera.current = () => {
    if(!camera) { return }
    camera.current.position.x = 0
    camera.current.position.y = 0
    camera.current.position.z = 2.5
  }


  // componentDidMount
  useEffect(() => {
    console.log('🌈 layout mounted')


    /** Stats **/
    stats.current = new window.Stats()
    stats.current.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.current.dom.style.top = 'auto'
    stats.current.dom.style.left = 'auto'
    stats.current.dom.style.right = '15px'
    stats.current.dom.style.bottom = '0'
    document.body.appendChild(stats.current.dom)



    /** GUI **/
    gui.current = new window.dat.GUI()
    const { current } = gui
    current.add(inletsHolder.current, 'message').onChange(handleInletChange.current).listen()
    current.add(inletsHolder.current, 'speed', 0.0, 2.0).onChange(handleInletChange.current).listen()
    current.add(inletsHolder.current, 'count', 0, 100).onChange(handleInletChange.current).listen()
    current.addColor(inletsHolder.current, 'color').onChange(handleInletChange.current).listen()
    current.add(inletsHolder.current, 'fontSize', 6, 48).onChange(handleInletChange.current).listen()
    current.add(inletsHolder.current, 'border').onChange(handleInletChange.current).listen()
    current.add(inletsHolder.current, 'fontFamily', [
      "sans-serif",
      "serif",
      "cursive",
      "ＭＳ 明朝",
      "monospace"
    ]).onChange(handleInletChange).listen()
    handleInletChange.current()



    /** THREE **/
    scene.current = new THREE.Scene()
    // scene.current.background = new THREE.Color( 0xff0000 )
    camera.current = new THREE.PerspectiveCamera(75, width/height, 0.1, 10000)
    renderer.current = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasElement.current
    })
    renderer.current.setSize(width, height)
    controls.current = new OrbitControls(camera.current, renderer.current.domElement)
    // console.log(canvasElement)

    initializeOrbits.current()
    initializeCamera.current()

    let geometry = new THREE.SphereGeometry(
      3,
      8,
      8,
      0,
      Math.PI * 2,
      0,
      Math.PI * 2
    )
    let material = new THREE.MeshNormalMaterial({
      // wireframe: true,
      flatShading: true,
    })
    mesh.current = new THREE.Mesh(geometry, material)
    scene.current.add(mesh.current)

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.current.add( light );



    /** GSAP **/
    gs.current = gsap.timeline({
      repeat: -1,
      timeScale: 1.0,
      // paused: true,
    })
    gs.current.to(targetElement.current, 1, {
      rotation: 360,
      ease: Linear.easeNone,
    }, 0)
    gs.current.to(mesh.current.rotation, 1, {
      y: Math.PI / 2,
      ease: Linear.easeNone,
    }, 0)


    /** Animate Kickoff **/
    animate.current()


    /** CleanUp **/
    return () => {
      gui.current.destroy()
      document.body.removeChild(stats.current.dom)
    }
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
    gsap.to(targetElement.current, 1, {
      scale: 12.0,
      ease: Linear.ease
    })
  }

  function scaleDown() {
    gsap.to(targetElement.current, 1, {
      scale: 1.0,
      ease: Linear.ease,
      onComplete: () => {
        console.log('scaledown animation ended 🎬')
      }
    })
  }



  // ANIMATE
  let animate = useRef()
  animate.current = () => {
    stats && stats.current && stats.current.begin()

    // animate stuff
    renderer.current.render(scene.current, camera.current)

    requestAnimationFrame(animate.current)
    stats.current.end()
  }

  return (
    <Holder>
      <Header siteTitle={siteData.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 0 1.45rem`,
          boxSizing: 'border-box',
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
          <div className={cx('container')}>
            <canvas className={cx('canvas')} ref={canvasElement} width={width} height={height} />

            <div
              onMouseEnter={scaleUp}
              onMouseLeave={scaleDown}
              ref={targetElement}
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
