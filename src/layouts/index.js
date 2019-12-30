import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import smoothscroll from 'smoothscroll-polyfill'

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
  resizeRendererToDisplaySize,
  resizeThreeScene,
  usePrevLocation,
  useShowBorders,
  useParam1,
  useParam2,
  useParam3,
  useScrollRotateMesh,
} from './utils'
import getBreakpoint from '@utils/getBreakpoint'
import Menu from '@components/Menu'
import Target from '@components/Target'

const cx = classnames.bind(styles)

const storage = typeof window !== `undefined` ? window.localStorage : false
if (storage && !storage.getItem('FTUI')) {
  storage.setItem('FTUI', 'true')
}

const Layout = ({
  setPrevLocation,
  setCurrentScroll,
  setStoreMobileOpen,
  mobileOpen,
  FTUI,
  setFTUI,
  location, // location comes from /pages, location.state.prevComponent comes from gatsby-browser
  heroRef,
  showBorders,
  param1,
  param2,
  param3,
  setparam1,
  setparam2,
  setparam3,
  currentScroll,
  toggleGrid,
  toggleBorders,
  children,
}) => {
  // Gatsby
  const siteData = useSiteMetadata()
  usePrevLocation(location, setPrevLocation)

  //GUIパラメータの準備
  const gui = useRef()

  // GUI Inlets
  const inletsHolder = useRef({
    browserWidth: typeof window !== `undefined` ? window.innerWidth : 1920,
    breakpoint: '',
    speed: 1.0,
    param1: 0,
    param2: 0,
    param3: 0,
    FTUI: storage && storage.getItem('FTUI') === 'true',
    showMain: true,
    gridHelper: false,
    showBorders: false,
  })
  const [inlets, setInlets] = useState(null)

  // GUI Inlets Handler
  const showBordersRef = useRef(showBorders)
  const handleInletChange = useRef()
  handleInletChange.current = () => {
    setInlets(Object.assign({}, inletsHolder.current))
    setparam1(inletsHolder.current.param1)
    setparam2(inletsHolder.current.param2)
    setparam3(inletsHolder.current.param3)
    toggleGrid(inletsHolder.current.gridHelper)
    toggleBorders(inletsHolder.current.showBorders)
    setFTUI(inletsHolder.current.FTUI)
    if (inletsHolder.current.FTUI && !initialFTUI) {
      storage.setItem('FTUI', 'true')
      if (typeof window !== `undefined`) window.location.reload()
    }

    // 🌎 Global Scale
    document.documentElement.style.setProperty('--speed', inletsHolder.current.speed)
    gsap.globalTimeline.timeScale(inletsHolder.current.speed)
  }

  // Stats
  const stats = useRef()

  // GSAP
  const gs = useRef()

  // Ref Elements
  const widthRef = useRef(null)
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
  const animationID = useRef()
  const animate = useRef()
  const tick = useRef()
  const [lastScrollQ, setLastScrollQ] = useState(0)

  // componentDidMount
  useEffect(() => {
    console.log('🌈 layout mounted')
    console.log(
      `%c    THREE JS version - ${THREE.REVISION}    `,
      'background-color: fuchsia; color: white; font-weight: bold;'
    )
    smoothscroll.polyfill()

    // On first load, mobile browsers have different initial viewport heights that change after scrolling
    // capture that difference here as a CSS variable
    document.documentElement.style.setProperty(
      '--vhThreshold',
      `${heightRef.current.offsetHeight - window.innerHeight}px`
    )
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    document.documentElement.style.setProperty('--speed', `1.0`)

    /** Stats **/
    initStats(stats)

    /** GUI **/
    initGUI(gui, inletsHolder, handleInletChange)

    /** THREE **/
    scene.current = new THREE.Scene()
    scene.current.background = new THREE.Color(0xf1f1f1)
    scene.current.scale.set(0.25)
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
    resizeRendererToDisplaySize(canvasElement, renderer, camera, sceneSize, heightRef, setStoreMobileOpen)
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
    }
  }, [])

  // HELPERS
  useShowBorders(
    showBorders,
    showBordersRef,
    handleScroll,
    axisHelper,
    sceneHelperMesh,
    halfPageHelperRef,
    lastScrollQ,
    setLastScrollQ,
    menuRef,
    heightRef,
    canvasElement,
    mobileOpen,
    setFTUI
  )
  useParam1(param1, scene, inlets)
  useParam2(param2, scene, inlets)
  useParam3(param3, scene, inlets)
  useScrollRotateMesh(currentScroll, mesh)

  // ANIMATE Method
  animate.current = () => {
    stats && stats.current && stats.current.begin()

    // animate stuff
    animationID.current = undefined

    // handleFTUIScroll()
    setCurrentScroll(window.pageYOffset | document.documentElement.scrollTop)

    resizeRendererToDisplaySize(canvasElement, renderer, camera, sceneSize, heightRef, setStoreMobileOpen)
    resizeThreeScene(heroRef, canvasElement, raycaster, scene, camera, sceneSize)
    handleScroll(
      showBordersRef,
      halfPageHelperRef,
      lastScrollQ,
      setLastScrollQ,
      menuRef,
      heightRef,
      canvasElement,
      mobileOpen
    )
    inletsHolder.current.browserWidth = window.innerWidth
    inletsHolder.current.breakpoint = getBreakpoint()

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

  /** FTUI **/
  const [initialFTUI] = useState(FTUI)
  useEffect(() => {
    if (!FTUI && !initialFTUI) return

    const target = window.innerHeight / 2 - 40

    if (currentScroll <= target && !FTUI && initialFTUI) {
      setFTUI(true)
      inletsHolder.current.FTUI = true
    }

    if (currentScroll >= target && FTUI) {
      setFTUI(false)
      inletsHolder.current.FTUI = false
      storage.setItem('FTUI', 'false')
    }
  }, [currentScroll, FTUI])

  return (
    <main
      className={cx('main', {
        borders: showBorders,
        hideMain: inlets && !inlets.showMain,
        getBreakpoint,
        'mobile-open': mobileOpen,
      })}
    >
      {/*dummy section containers for imperative width/height measurements*/}
      <div className={`section-container`}>
        <div className={`section`}>
          <div className={`row`}>
            <div className={`col`}>
              <div ref={widthRef} style={{ visibility: 'none' }} />
            </div>
          </div>
        </div>
      </div>
      <div ref={heightRef} style={{ position: 'absolute', top: 0, left: 0, height: '100vh' }} />

      <GridHelper />
      <div className={cx('overlay')} />
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
  param1: PropTypes.number.isRequired,
  param2: PropTypes.number.isRequired,
  param3: PropTypes.number.isRequired,
  setparam1: PropTypes.func.isRequired,
  setparam2: PropTypes.func.isRequired,
  setparam3: PropTypes.func.isRequired,
  toggleGrid: PropTypes.func,
  showBorders: PropTypes.bool,
  toggleBorders: PropTypes.func,
  setPrevLocation: PropTypes.func,
  pageTransitioning: PropTypes.bool,
  setCurrentScroll: PropTypes.func,
  currentScroll: PropTypes.number,
  mobileOpen: PropTypes.bool,
  setStoreMobileOpen: PropTypes.func,
  FTUI: PropTypes.bool,
  setFTUI: PropTypes.func,
}

const mapStateToProps = ({ heroRef, param1, param2, param3, showBorders, currentScroll, mobileOpen, FTUI }) => {
  return { heroRef, param1, param2, param3, showBorders, currentScroll, mobileOpen, FTUI }
}

const mapDispatchToProps = dispatch => {
  return {
    setparam1: target => dispatch({ type: `SETPARAM1`, payload: target }),
    setparam2: target => dispatch({ type: `SETPARAM2`, payload: target }),
    setparam3: target => dispatch({ type: `SETPARAM3`, payload: target }),
    toggleGrid: target => dispatch({ type: `TOGGLESHOWGRID`, payload: target }),
    toggleBorders: target => dispatch({ type: `TOGGLESHOWBORDERS`, payload: target }),
    setPrevLocation: loc => dispatch({ type: `SETPREVLOCATION`, payload: loc }),
    setCurrentScroll: target => dispatch({ type: `SETCURRENTSCROLL`, payload: target }),
    setStoreMobileOpen: target => dispatch({ type: `SETMOBILEOPEN`, payload: target }),
    setFTUI: target => dispatch({ type: `SETFTUI`, payload: target }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
