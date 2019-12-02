import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { useStaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import gsap, { Linear } from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import styles from './Layout.module.scss'
import GridHelper from './GridHelper'
import Header from '@components/Header'
import Target from '@components/Target'
import debounce from '@utils/debounce'
import isiOS from '@utils/isiOS'

const cx = classnames.bind(styles)

const Layout = ({
  prevLocation, // eslint-disable-line no-unused-vars
  setPrevLocation,
  location, // location comes from /pages, location.state.prevComponent comes from gatsby-browser
  heroRef,
  showBorders,
  param,
  param2,
  param3,
  setparam,
  setparam2,
  setparam3,
  toggleGrid,
  toggleBorders,
  children,
  // ...props
}) => {
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

  //GUIパラメータの準備
  let gui = useRef()

  // GUI Inlets
  let inletsHolder = useRef({
    speed: 1.0,
    param: 0,
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
    setparam(inletsHolder.current.param)
    setparam2(inletsHolder.current.param2)
    setparam3(inletsHolder.current.param3)
    toggleGrid(inletsHolder.current.gridHelper)
    toggleBorders(inletsHolder.current.showBorders)

    // 🌎 Global Scale
    gsap.globalTimeline.timeScale(inletsHolder.current.speed)
  }

  // GUI Inlets Console
  useEffect(() => {
    if (!inlets) {
      return
    }
    // console.log('inlets', inlets)
  }, [inlets])

  // Stats
  let stats = useRef()

  // GSAP
  let gs = useRef()

  // Ref Elements
  const mainRef = useRef(null)
  const canvasElement = useRef(null)
  const heroTarget = useRef(null)
  const halfPageHelperRef = useRef(null)

  // THREE
  const sceneSize = 6 // in meters
  const scene = useRef()
  const camera = useRef()
  const renderer = useRef()
  const controls = useRef()
  const mesh = useRef()
  const axisHelper = useRef()
  const pageVec = useRef()
  const pagePos = useRef()
  const sceneHelperMesh = useRef()
  const raycaster = useRef()
  const raycaster2 = useRef()

  const initializeOrbits = useRef()
  initializeOrbits.current = () => {
    if (!controls) {
      return
    }
    controls.current.rotateSpeed = 1.0
    controls.current.zoomSpeed = 1.2
    controls.current.panSpeed = 0.8
  }

  const initializeCamera = useRef()
  initializeCamera.current = () => {
    if (!camera) {
      return
    }
    camera.current.position.x = 0
    camera.current.position.y = 0
    camera.current.position.z = 2.5
  }

  useEffect(() => {
    if (location && location.state && location.state.prevLocation) {
      setPrevLocation(location.state.prevLocation)
    }
  }, [location, setPrevLocation])

  const handleOrientationChange = () => {
    // note - for mobileSafari, we're not updating 100vh (cover) params onresize,
    //                                                only on orientation change
    // reasoning is that these items are generally for "above the fold" features
    // and we don't want too much resize thrashing (at this point)
    // also calling this change onScroll causes visible jumps on Mobile Safari
    // iOS 100vh - https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    // for Chome on Android, it's not too bad * Tested Pixel 3, Android 9
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    handleScroll()
  }

  const handleScroll = () => {
    // halfPageHelperRef can't use position sticky because Firefox's
    // webgl performance drops when too many position: fixed elements
    // are on top of the webgl element
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop
    if (showBordersRef.current === true && halfPageHelperRef.current) {
      halfPageHelperRef.current.style.top = `${currentScroll + window.innerHeight / 2}px`
    }
  }

  // componentDidMount
  useEffect(() => {
    console.log('🌈 layout mounted')
    console.log(
      `%c    THREE JS version - ${THREE.REVISION}    `,
      'background-color: fuchsia; color: white; font-weight: bold;'
    )

    const debounceAmount = 50

    if (isiOS()) {
      window.addEventListener('orientationchange', debounce(handleOrientationChange, debounceAmount))
    } else {
      window.addEventListener('resize', debounce(handleOrientationChange, debounceAmount))
    }
    handleOrientationChange()

    window.addEventListener('scroll', handleScroll)

    /** Stats **/
    stats.current = new window.Stats()
    stats.current.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.current.dom.style.zIndex = '9999'
    stats.current.dom.style.top = 'auto'
    stats.current.dom.style.left = 'auto'
    stats.current.dom.style.right = '15px'
    stats.current.dom.style.bottom = '0'
    document.body.appendChild(stats.current.dom)

    /** GUI **/
    gui.current = new window.dat.GUI()
    gui.current
      .add(inletsHolder.current, 'speed', 0.0, 2.0)
      .onChange(handleInletChange.current)
      .listen()
    gui.current
      .add(inletsHolder.current, 'param', -7.5, 7.5)
      .onChange(handleInletChange.current)
      .listen()
    gui.current
      .add(inletsHolder.current, 'param2', -7.5, 7.5)
      .onChange(handleInletChange.current)
      .listen()
    gui.current
      .add(inletsHolder.current, 'param3', -7.5, 7.5)
      .onChange(handleInletChange.current)
      .listen()
    gui.current
      .add(inletsHolder.current, 'showMain')
      .onChange(handleInletChange.current)
      .name('main')
      .listen()
    gui.current
      .add(inletsHolder.current, 'gridHelper')
      .onChange(handleInletChange.current)
      .name('grid helper')
      .listen()
    gui.current
      .add(inletsHolder.current, 'showBorders')
      .onChange(handleInletChange.current)
      .name('show borders')
      .listen()
    handleInletChange.current()

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
    controls.current = new OrbitControls(camera.current, renderer.current.domElement)

    initializeOrbits.current()
    initializeCamera.current()
    raycaster.current = new THREE.Raycaster()
    raycaster2.current = new THREE.Raycaster()

    let geometry = new THREE.SphereGeometry(sceneSize / 2, 8, 8, 0, Math.PI * 2, 0, Math.PI * 2)
    let material = new THREE.MeshNormalMaterial({
      // wireframe: true,
      flatShading: true,
    })
    mesh.current = new THREE.Mesh(geometry, material)
    // mesh.current.visible = false
    mesh.current.position.setZ(-mesh.current.geometry.parameters.radius * 2)
    scene.current.add(mesh.current)

    let g = new THREE.PlaneGeometry(sceneSize, sceneSize, 12, 12)
    let m = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xff6666,
      flatShading: true,
    })
    sceneHelperMesh.current = new THREE.Mesh(g, m)
    sceneHelperMesh.current.visible = false
    scene.current.add(sceneHelperMesh.current)

    const light = new THREE.AmbientLight(0x404040) // soft white light
    scene.current.add(light)

    axisHelper.current = new THREE.AxesHelper(sceneSize)
    scene.current.add(axisHelper.current)

    pageVec.current = new THREE.Vector3()
    pagePos.current = new THREE.Vector3()

    /** GSAP **/
    gs.current = gsap.timeline({
      repeat: -1,
      timeScale: 1.0,
      // paused: true,
    })
    // gs.current.fromTo(
    //   mesh.current.rotation,
    //   { y: 0 },
    //   {
    //     duration: 4,
    //     y: (Math.PI / 2),
    //     ease: Linear.easeNone,
    //   },
    //   0
    // )

    /** Animate Kickoff **/
    resizeRendererToDisplaySize()
    flip.current = 0
    animate.current()
    resizeThreeScene()

    /** CleanUp **/
    return () => {
      console.log('🧹tidying up 🧹')

      gui.current.destroy()
      document.body.removeChild(stats.current.dom)
      if (animationID.current) {
        window.cancelAnimationFrame(animationID.current)
        animationID.current = undefined
      }
      window.removeEventListener('orientationchange', debounce(handleOrientationChange, debounceAmount))
      window.removeEventListener('resize', debounce(handleOrientationChange, debounceAmount))
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const showBordersRef = useRef(showBorders)
  useEffect(() => {
    showBordersRef.current = showBorders // ref here for eventlistener not updating with Redux Store state
    handleScroll()

    if (axisHelper.current) {
      axisHelper.current.visible = showBorders
    }
    if (sceneHelperMesh.current) {
      sceneHelperMesh.current.visible = showBorders
    }
  }, [showBorders])

  useEffect(() => {
    gsap.to(scene.current.position, 1, {
      z: param,
      ease: Linear.ease,
    })
  }, [param, inlets])

  useEffect(() => {
    gsap.to(scene.current.position, 1, {
      x: param2,
      ease: Linear.ease,
    })
  }, [param2, inlets])

  useEffect(() => {
    gsap.to(scene.current.position, 1, {
      y: param3,
      ease: Linear.ease,
    })
  }, [param3, inlets])

  // ANIMATE
  let animationID = useRef()
  let animate = useRef()
  let flip = useRef()
  animate.current = () => {
    stats && stats.current && stats.current.begin()

    // animate stuff
    animationID.current = undefined

    resizeRendererToDisplaySize()
    resizeThreeScene()

    renderer.current.render(scene.current, camera.current)
    controls.current.update()

    flip.current = flip.current + 1
    if (flip.current >= 3) {
      // do something at a lower framerate here
      flip.current = 0
    }

    animationID.current = requestAnimationFrame(animate.current)
    stats.current.end()
  }

  const resizeRendererToDisplaySize = () => {
    const width = canvasElement.current.clientWidth | 0
    const height = canvasElement.current.clientHeight | 0
    const needResize = canvasElement.current.width !== width || canvasElement.current.height !== height
    if (needResize) {
      renderer.current.setSize(width, height, false)

      // Perspective Camera
      // camera.current.aspect = canvasElement.current.clientWidth / canvasElement.current.clientHeight
      // camera.current.updateProjectionMatrix()

      // Ortho Camera
      const aspect = canvasElement.current.clientHeight / canvasElement.current.clientWidth
      camera.current.left = sceneSize / -2
      camera.current.right = sceneSize / 2
      camera.current.top = (sceneSize * aspect) / 2
      camera.current.bottom = (-sceneSize * aspect) / 2
      camera.current.updateProjectionMatrix()

      // resizeThreeScene()
    }
    return needResize
  }

  const resizeThreeScene = () => {
    if (heroRef === null) {
      return
    }
    const bounds = heroRef.getBoundingClientRect()
    const left = bounds.left + 1 // magic number for various paddings and margins
    const ndcLeft = (left / canvasElement.current.clientWidth) * 2 - 1
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const ptIntrsct = new THREE.Vector3()
    raycaster.current.setFromCamera(new THREE.Vector2(ndcLeft, 0), camera.current)
    raycaster.current.ray.intersectPlane(plane, ptIntrsct)
    const scale = Math.abs(ptIntrsct.x / (sceneSize / 2))
    if (scale > 0) {
      scene.current.scale.set(scale, scale, scale)
      // setting the scale in resizeThreeScene() is a little funky
      // because once taking into account the aspect ratio changes, sizing gets distorted by the FOV
      // example: https://i.imgur.com/LALJydf.gifv
      // when targeting mainRef, setting the mesh position seems to help
      // mesh.current.position.setZ(-mesh.current.geometry.parameters.radius * 2 * scale)
    }
  }

  return (
    <main
      className={cx('main', { borders: showBorders, 'mobile-safari': isiOS(), hideMain: inlets && !inlets.showMain })}
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

      <GridHelper />
      <Target className={cx('heroTarget')} ref={heroTarget} target={heroRef} />
      {showBorders && <div ref={halfPageHelperRef} className={cx('halfPageHelper')} />}
      <Header siteTitle={siteData.site.siteMetadata.title} className={cx('header-container')} />
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
  prevLocation: PropTypes.object,
  setPrevLocation: PropTypes.func,
  param: PropTypes.number.isRequired,
  param2: PropTypes.number.isRequired,
  param3: PropTypes.number.isRequired,
  setparam: PropTypes.func.isRequired,
  setparam2: PropTypes.func.isRequired,
  setparam3: PropTypes.func.isRequired,
  toggleGrid: PropTypes.func,
  showBorders: PropTypes.bool,
  toggleBorders: PropTypes.func,
  pageTransitioning: PropTypes.bool,
}

const mapStateToProps = ({ heroRef, prevLocation, param, param2, param3, showBorders }) => {
  return { heroRef, prevLocation, param, param2, param3, showBorders }
}

const mapDispatchToProps = dispatch => {
  return {
    setPrevLocation: loc => dispatch({ type: `SETPREVLOCATION`, payload: loc }),
    setparam: target => dispatch({ type: `SETPARAM`, payload: target }),
    setparam2: target => dispatch({ type: `SETPARAM2`, payload: target }),
    setparam3: target => dispatch({ type: `SETPARAM3`, payload: target }),
    toggleGrid: target => dispatch({ type: `TOGGLESHOWGRID`, payload: target }),
    toggleBorders: target => dispatch({ type: `TOGGLESHOWBORDERS`, payload: target }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
