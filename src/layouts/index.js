import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import gsap from 'gsap'
import smoothscroll from 'smoothscroll-polyfill'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import WaveformData from 'waveform-data'
import * as Nexus from 'nexusui'

import styles from './Layout.module.scss'
import GridHelper from './GridHelper'
import soundFile from './snake-heist.mp3'
import soundFileData from './snake-heist.json'

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
  initWaveform,
} from './utils'
import Menu from '@components/Menu'
import Target from '@components/Target'

const cx = classnames.bind(styles)

const loader = new GLTFLoader()

const Layout = ({
  setPrevLocation,
  setCurrentScroll,
  location, // location comes from /pages, location.state.prevComponent comes from gatsby-browser
  heroRef,
  showBorders,
  e2,
  param1,
  param2,
  param3,
  sete2,
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

  /** Waveform **/
  const player = useRef()
  const [playerLoaded /*setPlayerLoaded*/] = useState(false)
  useEffect(() => {
    if (!player.current || !playerLoaded) return
    console.log('🎭🎼 audio file loaded')
  }, [playerLoaded])

  const handlePlayTouchStart = () => {
    player.current.play()
    // gs.current.play()
  }

  useEffect(() => {
    if (!player.current) return

    player.current.oncanplay = () => {
      console.log('html audio element soundfile ready \n\tduration in seconds: ', player.current.duration)
      initGSAP(gs, player, scene, camera, textMesh1, e2)
    }
    player.current.ontimeupdate = () => {
      // gs.current.progress(player.current.currentTime/player.current.duration)
      // console.log(player.current.currentTime/player.current.duration)
      // console.log(gs.current.duration())
      // console.log(player.current.currentTime)
    }
  }, [player])

  const [waveDown, setWaveDown] = useState(false)
  const handleWaveformClick = e => {
    if (!waveDown && e.type !== 'mousedown') return

    gs.current.clear()
    initGSAP(gs, player, scene, camera, textMesh1, e2)
  }

  const envelopeHolder = useRef(null)
  const envelope = useRef(null)
  useEffect(() => {
    if (!envelopeHolder.current) return
    if (envelopeHolder.current.destroy) envelope.current.destroy()

    Nexus.colors.accent = '#ffff00ff'
    Nexus.colors.fill = '#ffffff00'

    envelope.current = new Nexus.Envelope(envelopeHolder.current, {
      size: [window.innerWidth, 200],
      points: e2.points,
    })
    envelope.current.on('change', v => {
      sete2({ points: v })
    })
  }, [envelopeHolder])

  useEffect(() => {
    if (!textMesh1.current) return

    gs.current.clear()
    initGSAP(gs, player, scene, camera, textMesh1, e2)
  }, [e2])

  // GUI Inlets
  const inletsHolder = useRef({
    speed: 1.0,
    param1: 0,
    param2: 0,
    param3: 0,
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

    // 🌎 Global Scale
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
  const canvasWaveform = useRef(null)
  const waveform = useRef(null)
  const playHead = useRef(null)
  const heroTarget = useRef(null)
  const halfPageHelperRef = useRef(null)
  const menuRef = useRef(null)

  // THREE
  const sceneSize = 3.55 // in meters
  const scene = useRef()
  const camera = useRef()
  const renderer = useRef()
  const controls = useRef()
  const mesh = useRef()
  const textMesh1 = useRef()
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

    /* Audio */

    // On first load, mobile browsers have different initial viewport heights that change after scrolling
    // capture that difference here as a CSS variable
    document.documentElement.style.setProperty(
      '--vhThreshold',
      `${heightRef.current.offsetHeight - window.innerHeight}px`
    )
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)

    /** Stats **/
    initStats(stats)

    /** GUI **/
    initGUI(gui, inletsHolder, handleInletChange)

    /** THREE **/
    scene.current = new THREE.Scene()
    // scene.current.background = new THREE.Color(0xf1f1f1)
    scene.current.background = new THREE.Color(0x151515)
    // scene.current.scale.set(0.25)
    // camera.current = new THREE.PerspectiveCamera(75, 960 / 540, 0.1, 10000)

    const aspect = canvasElement.current.clientWidth / canvasElement.current.clientHeight
    camera.current = new THREE.OrthographicCamera(
      sceneSize / -2,
      sceneSize / 2,
      (sceneSize * aspect) / 2,
      (sceneSize * aspect) / -2,
      1,
      10000
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

    addMesh(sceneSize, textMesh1, scene)
    addSceneHelperMesh(sceneSize, sceneHelperMesh, axisHelper, scene)

    const light = new THREE.AmbientLight(0x404040) // soft white light
    scene.current.add(light)

    /** 3D Model **/
    loader.load(
      // resource URL
      '/snake/rattlesnake.gltf',
      // called when resource is loaded
      object => {
        let material = new THREE.MeshNormalMaterial({
          // wireframe: true,
          flatShading: true,
        })

        // console.log(object.scene.children)

        // RATTLESNAKE
        let rattlesnake = object.scene.children.filter(item => item.name.toLowerCase() === 'rattlesnake')
        rattlesnake = rattlesnake.length > 0 ? rattlesnake[0] : false
        rattlesnake.material = material
        rattlesnake.position.set(0, 0, 0)
        rattlesnake.rotation.set(Math.PI / 2, 0, Math.PI / 2)
        mesh.current = rattlesnake
        // console.log(rattlesnake)

        scene.current.add(rattlesnake)
      },

      // called when loading is in progresses
      (/*xhr*/) => {
        // console.log('model loading: ', (xhr.loaded / xhr.total) * 100 + '% loaded')
      },

      // called when loading has errors
      error => {
        console.log('An error happened', error)
      }
    )

    /** GSAP **/
    // initGSAP(gs, player, textMesh1)

    /** Waveform Data**/
    waveform.current = WaveformData.create(soundFileData)
    initWaveform(waveform, canvasWaveform)

    /** Animate Kickoff **/
    resizeRendererToDisplaySize(
      canvasElement,
      canvasWaveform,
      renderer,
      camera,
      sceneSize,
      heightRef,
      initWaveform,
      waveform
    )
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
    canvasElement
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

    setCurrentScroll(window.pageYOffset | document.documentElement.scrollTop)

    resizeRendererToDisplaySize(
      canvasElement,
      canvasWaveform,
      renderer,
      camera,
      sceneSize,
      heightRef,
      initWaveform,
      waveform
    )
    resizeThreeScene(heroRef, canvasElement, raycaster, scene, camera, sceneSize)
    handleScroll(showBordersRef, halfPageHelperRef, lastScrollQ, setLastScrollQ, menuRef, heightRef, canvasElement)

    renderer.current.render(scene.current, camera.current)
    controls.current.update()

    if (player.current && gs.current && player.current.duration > 0) {
      // console.log(player.current.currentTime/player.current.duration)
      gs.current.progress(player.current.currentTime / player.current.duration)
      playHead.current.style.left = `calc(${(player.current.currentTime / player.current.duration) * 100}%)`
    }

    tick.current = tick.current + 1
    if (tick.current >= 5) {
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
      <button
        onClick={handlePlayTouchStart}
        style={{ position: 'fixed', top: '0', left: '0', backgroundColor: 'pink', zIndex: '100', fontSize: '64px' }}
        className={cx('playbutton')}
      >
        <h1>PLAY</h1>
      </button>

      <audio ref={player} id={cx('player')} controls preload="auto">
        <source type="audio/mp3" src={soundFile} />
      </audio>

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
      <Target className={cx('heroTarget')} ref={heroTarget} target={heroRef} />
      {showBorders && <div ref={halfPageHelperRef} className={cx('halfPageHelper')} />}
      <Menu menuRef={menuRef} siteTitle={siteData.site.siteMetadata.title} className={cx('menu-container')} />
      {children}
      <footer className={cx('footer')}>© {new Date().getFullYear()}, Footer goes here</footer>
      <canvas className={cx('canvas')} ref={canvasElement} />

      <canvas
        height={200}
        onMouseDown={e => {
          setWaveDown(true)
          handleWaveformClick(e)
        }}
        onMouseMove={handleWaveformClick}
        onMouseUp={() => setWaveDown(false)}
        onMouseLeave={() => setWaveDown(false)}
        className={cx('canvas-waveform')}
        ref={canvasWaveform}
      />
      <div ref={envelopeHolder} className={cx('envelopeHolder')} />
      <div style={{ height: '200px' }} className={cx('playhead')} ref={playHead} />
    </main>
  )
}

Layout.propTypes = {
  e2: PropTypes.object,
  children: PropTypes.node.isRequired,
  heroRef: PropTypes.object,
  location: PropTypes.object,
  param1: PropTypes.number.isRequired,
  param2: PropTypes.number.isRequired,
  param3: PropTypes.number.isRequired,
  sete2: PropTypes.func.isRequired,
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
}

const mapStateToProps = ({ heroRef, e2, param1, param2, param3, showBorders, currentScroll }) => {
  return { heroRef, e2, param1, param2, param3, showBorders, currentScroll }
}

const mapDispatchToProps = dispatch => {
  return {
    sete2: target => dispatch({ type: `SETE2`, payload: target }),
    setparam1: target => dispatch({ type: `SETPARAM1`, payload: target }),
    setparam2: target => dispatch({ type: `SETPARAM2`, payload: target }),
    setparam3: target => dispatch({ type: `SETPARAM3`, payload: target }),
    toggleGrid: target => dispatch({ type: `TOGGLESHOWGRID`, payload: target }),
    toggleBorders: target => dispatch({ type: `TOGGLESHOWBORDERS`, payload: target }),
    setPrevLocation: loc => dispatch({ type: `SETPREVLOCATION`, payload: loc }),
    setCurrentScroll: target => dispatch({ type: `SETCURRENTSCROLL`, payload: target }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
