import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import styles from './Layout.module.scss'
import GridHelper from './GridHelper'
import {
  useSiteMetadata,
  initStats,
  initGUI,
  initGSAP,
  initOrbitsThunk,
  initCameraThunk,
  addMesh,
  addSceneHelperMesh,
  handleScroll,
  handleOrientationChange,
  resizeRendererToDisplaySize,
  resizeThreeScene,
  usePrevLocation,
  useShowBorders,
  useParam1,
  useParam2,
  useParam3,
} from './utils'
import Menu from '@components/Menu'
import Target from '@components/Target'
import debounce from '@utils/debounce'
import isiOS from '@utils/isiOS'

const cx = classnames.bind(styles)

const Layout = ({
  setPrevLocation,
  location, // location comes from /pages, location.state.prevComponent comes from gatsby-browser
  heroRef,
  showBorders,
  param1,
  param2,
  param3,
  setparam1,
  setparam2,
  setparam3,
  toggleGrid,
  toggleBorders,
  children,
}) => {
  // Gatsby
  const siteData = useSiteMetadata()
  usePrevLocation(location, setPrevLocation)

  //GUIパラメータの準備
  let gui = useRef()

  // GUI Inlets
  let inletsHolder = useRef({
    speed: 1.0,
    param1: 0,
    param2: 0,
    param3: 0,
    showMain: true,
    gridHelper: false,
    showBorders: true,
  })
  const [inlets, setInlets] = useState(null)

  // GUI Inlets Handler
  let handleInletChange = useRef()
  handleInletChange.current = () => {
    setInlets(Object.assign({}, inletsHolder.current))
    setparam1(inletsHolder.current.param1)
    setparam2(inletsHolder.current.param2)
    setparam3(inletsHolder.current.param3)
    toggleGrid(inletsHolder.current.gridHelper)
    toggleBorders(inletsHolder.current.showBorders)

    // 🌎 Global Scale
    gsap.globalTimeline.timeScale(inletsHolder.current.speed)
  }

  // Stats
  let stats = useRef()

  // GSAP
  let gs = useRef()

  // Ref Elements
  const mainRef = useRef(null)
  const heightRef = useRef(null)
  const canvasElement = useRef(null)
  const heroTarget = useRef(null)
  const halfPageHelperRef = useRef(null)
  const menuRef = useRef(null)

  // THREE
  const sceneSize = 6 // in meters
  const scene = useRef()
  const camera = useRef()
  const renderer = useRef()
  const controls = useRef()
  const mesh = useRef()
  const axisHelper = useRef()
  const sceneHelperMesh = useRef()
  const raycaster = useRef()

  const initializeOrbits = useRef()
  initializeOrbits.current = initOrbitsThunk(controls)

  const initializeCamera = useRef()
  initializeCamera.current = initCameraThunk(camera)

  // ANIMATE and SCROLL Handling/Logic
  let animationID = useRef()
  let animate = useRef()
  let tick = useRef()
  let [lastScroll, setLastScroll] = useState(0)

  // componentDidMount
  useEffect(() => {
    console.log('🌈 layout mounted')
    console.log(
      `%c    THREE JS version - ${THREE.REVISION}    `,
      'background-color: fuchsia; color: white; font-weight: bold;'
    )

    const debounceAmount = 50

    if (isiOS()) {
      window.addEventListener(
        'orientationchange',
        debounce(
          handleOrientationChange(showBordersRef, halfPageHelperRef, lastScroll, setLastScroll, menuRef, heightRef),
          debounceAmount
        )
      )
    } else {
      window.addEventListener(
        'resize',
        debounce(
          handleOrientationChange(showBordersRef, halfPageHelperRef, lastScroll, setLastScroll, menuRef, heightRef),
          debounceAmount
        )
      )
    }
    handleOrientationChange(showBordersRef, halfPageHelperRef, lastScroll, setLastScroll, menuRef, heightRef)()

    document.documentElement.style.setProperty(
      '--vhThreshold',
      `${heightRef.current.offsetHeight - window.innerHeight}px`
    )

    /** Stats **/
    initStats(stats)

    /** GUI **/
    initGUI(gui, inletsHolder, handleInletChange)

    /** THREE **/
    scene.current = new THREE.Scene()
    scene.current.background = new THREE.Color(0xf1f1f1)
    // camera.current = new THREE.PerspectiveCamera(75, 960 / 540, 0.1, 10000)

    const aspect = canvasElement.current.clientWidth / canvasElement.current.clientHeight
    camera.current = new THREE.OrthographicCamera(
      sceneSize / -2,
      sceneSize / 2,
      (sceneSize * aspect) / 2,
      (sceneSize * aspect) / -2,
      1,
      1000
    )

    renderer.current = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasElement.current,
    })
    renderer.current.setSize(960, 540)
    renderer.current.setPixelRatio(window.devicePixelRatio)

    raycaster.current = new THREE.Raycaster()
    controls.current = new OrbitControls(camera.current, renderer.current.domElement)

    initializeOrbits.current()
    initializeCamera.current()

    addMesh(sceneSize, mesh, scene)
    addSceneHelperMesh(sceneSize, sceneHelperMesh, axisHelper, scene)

    const light = new THREE.AmbientLight(0x404040) // soft white light
    scene.current.add(light)

    /** GSAP **/
    initGSAP(gs)

    /** Animate Kickoff **/
    resizeRendererToDisplaySize(canvasElement, renderer, camera, sceneSize)
    tick.current = 0
    animate.current()
    resizeThreeScene(heroRef, canvasElement, raycaster, scene, camera, sceneSize)

    /** CleanUp **/
    return () => {
      console.log('🧹tidying up 🧹')
      gui.current.destroy()
      document.body.removeChild(stats.current.dom)
      if (animationID.current) {
        window.cancelAnimationFrame(animationID.current)
        animationID.current = undefined
      }
      window.removeEventListener(
        'orientationchange',
        debounce(
          handleOrientationChange(showBordersRef, halfPageHelperRef, lastScroll, setLastScroll, heightRef),
          debounceAmount
        )
      )
      window.removeEventListener(
        'resize',
        debounce(
          handleOrientationChange(showBordersRef, halfPageHelperRef, lastScroll, setLastScroll, heightRef),
          debounceAmount
        )
      )
    }
  }, [])

  // HELPERS
  const showBordersRef = useRef(showBorders)
  useShowBorders(
    showBorders,
    showBordersRef,
    handleScroll,
    axisHelper,
    sceneHelperMesh,
    halfPageHelperRef,
    lastScroll,
    setLastScroll,
    menuRef,
    heightRef
  )
  useParam1(param1, scene, inlets)
  useParam2(param2, scene, inlets)
  useParam3(param3, scene, inlets)

  // ANIMATE Method
  animate.current = () => {
    stats && stats.current && stats.current.begin()

    // animate stuff
    animationID.current = undefined

    resizeRendererToDisplaySize(canvasElement, renderer, camera, sceneSize)
    resizeThreeScene(heroRef, canvasElement, raycaster, scene, camera, sceneSize)
    handleScroll(showBordersRef, halfPageHelperRef, lastScroll, setLastScroll, menuRef, heightRef)

    renderer.current.render(scene.current, camera.current)
    controls.current.update()

    tick.current = tick.current + 1
    if (tick.current >= 3) {
      // do something at a lower framerate here
      tick.current = 0
    }

    animationID.current = requestAnimationFrame(animate.current)
    stats.current.end()
  }

  return (
    <main
      className={cx('main', {
        borders: showBorders,
        hideMain: inlets && !inlets.showMain,
      })}
    >
      {/*dummy section container for imperative width measurements*/}
      <div className="section-container">
        <div className="section">
          <div className={cx('row')}>
            <div className={cx('col')}>
              <div ref={mainRef} style={{ visibility: 'none' }} />
            </div>
          </div>
        </div>
      </div>
      <div ref={heightRef} style={{ position: 'absolute', top: 0, left: 0, height: '100vh' }} />

      <GridHelper />
      <Target className={cx('heroTarget')} ref={heroTarget} target={heroRef} />
      {showBorders && <div ref={halfPageHelperRef} className={cx('halfPageHelper')} />}
      <Menu menuRef={menuRef} siteTitle={siteData.site.siteMetadata.title} className={cx('menu-container')} />
      {children}
      <footer className={cx('footer')}>© {new Date().getFullYear()}, Footer goes here</footer>
      <canvas className={cx('canvas')} ref={canvasElement} />
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  heroRef: PropTypes.object,
  location: PropTypes.object,
  setPrevLocation: PropTypes.func,
  param1: PropTypes.number.isRequired,
  param2: PropTypes.number.isRequired,
  param3: PropTypes.number.isRequired,
  setparam1: PropTypes.func.isRequired,
  setparam2: PropTypes.func.isRequired,
  setparam3: PropTypes.func.isRequired,
  toggleGrid: PropTypes.func,
  showBorders: PropTypes.bool,
  toggleBorders: PropTypes.func,
  pageTransitioning: PropTypes.bool,
}

const mapStateToProps = ({ heroRef, param1, param2, param3, showBorders }) => {
  return { heroRef, param1, param2, param3, showBorders }
}

const mapDispatchToProps = dispatch => {
  return {
    setPrevLocation: loc => dispatch({ type: `SETPREVLOCATION`, payload: loc }),
    setparam1: target => dispatch({ type: `SETPARAM1`, payload: target }),
    setparam2: target => dispatch({ type: `SETPARAM2`, payload: target }),
    setparam3: target => dispatch({ type: `SETPARAM3`, payload: target }),
    toggleGrid: target => dispatch({ type: `TOGGLESHOWGRID`, payload: target }),
    toggleBorders: target => dispatch({ type: `TOGGLESHOWBORDERS`, payload: target }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
