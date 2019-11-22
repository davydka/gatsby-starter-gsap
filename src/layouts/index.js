import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import { Transition, TransitionGroup } from 'react-transition-group'
import gsap, { Linear } from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Holder from './Holder'
import Header from '@components/Header'
import debounce from '@src/utils/debounce'

import styles from './Layout.module.scss'

const cx = classnames.bind(styles)

const Layout = ({
  prevLocation, // eslint-disable-line no-unused-vars
  setPrevLocation,
  location, // location comes from /pages, location.state.prevComponent comes from gatsby-browser
  param,
  setparam,
  toggleGrid,
  showBorders,
  toggleBorders,
  children,
  // ...props
}) => {
  //GUIパラメータの準備
  let gui = useRef()

  // GUI Inlets
  let inletsHolder = useRef({
    speed: 1.0,
    param: 0.5,
    gridHelper: false,
    showBorders: false,
  })
  let [inlets, setInlets] = useState()

  // GUI Inlets Handler
  let handleInletChange = useRef()
  handleInletChange.current = () => {
    setInlets(Object.assign({}, inletsHolder.current))
    setparam(inletsHolder.current.param)
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
    console.log('inlets', inlets)
  }, [inlets])

  // Stats
  let stats = useRef()

  // GSAP
  let gs = useRef()

  // Canvas
  let canvasElement = useRef()

  // Page Transition Container
  let pageContainer = useRef()
  let pageContainerNode = useRef()

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

  // todo: does this need to be a ref?
  let initializeOrbits = useRef()
  initializeOrbits.current = () => {
    if (!controls) {
      return
    }
    controls.current.rotateSpeed = 1.0
    controls.current.zoomSpeed = 1.2
    controls.current.panSpeed = 0.8
  }

  // todo: does this need to be a ref?
  let initializeCamera = useRef()
  initializeCamera.current = () => {
    if (!camera) {
      return
    }
    camera.current.position.x = 0
    camera.current.position.y = 0
    camera.current.position.z = 2.5
  }

  useEffect(() => {
    if (location && location.state) {
      setPrevLocation(location.state.prevLocation)
    }
  }, [location, setPrevLocation])

  const handleOrientationChange = () => {
    // note - we're not updating 100vh (cover) params onresize, only on orientation change
    // reasoning is taht these items are generally for "above the fold" features
    // and we don't want too much resize thrashing (at this point)
    // iOS 100vh - https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  const handleResize = () => {
    const height = pageContainerNode && pageContainerNode.current && pageContainerNode.current.scrollHeight
    if (height && pageContainer && pageContainer.current) {
      pageContainer.current.style.minHeight = `${height}px`
    }
  }

  // componentDidMount
  useEffect(() => {
    console.log('🌈 layout mounted')

    window.addEventListener('orientationchange', debounce(handleOrientationChange, 200))
    handleOrientationChange()

    window.addEventListener('resize', debounce(handleResize, 200))
    handleResize()

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
      .add(inletsHolder.current, 'param', 0, 100)
      .onChange(handleInletChange.current)
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
    // scene.current.background = new THREE.Color( 0xff0000 )
    camera.current = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000)
    renderer.current = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasElement.current,
    })
    renderer.current.setSize(width, height)
    controls.current = new OrbitControls(camera.current, renderer.current.domElement)

    initializeOrbits.current()
    initializeCamera.current()

    let geometry = new THREE.SphereGeometry(3, 8, 8, 0, Math.PI * 2, 0, Math.PI * 2)
    let material = new THREE.MeshNormalMaterial({
      // wireframe: true,
      flatShading: true,
    })
    mesh.current = new THREE.Mesh(geometry, material)
    scene.current.add(mesh.current)

    const light = new THREE.AmbientLight(0x404040) // soft white light
    scene.current.add(light)

    /** GSAP **/
    gs.current = gsap.timeline({
      repeat: -1,
      timeScale: 1.0,
      // paused: true,
    })
    gs.current.fromTo(
      mesh.current.rotation,
      { y: 0 },
      {
        duration: 1,
        y: Math.PI / 2,
        ease: Linear.easeNone,
      },
      0
    )

    /** Animate Kickoff **/
    flip.current = 0
    animate.current()

    /** CleanUp **/
    return () => {
      console.log('🧹tidying up 🧹')

      gui.current.destroy()
      document.body.removeChild(stats.current.dom)
      if (animationID.current) {
        window.cancelAnimationFrame(animationID.current)
        animationID.current = undefined
      }
      window.removeEventListener('orientationchange', debounce(handleOrientationChange, 200))
      window.removeEventListener('resize', debounce(handleResize, 200))
    }
  }, [])

  useEffect(() => {
    gsap.to(camera.current.position, 1, {
      z: param,
      ease: Linear.ease,
    })
  }, [param])

  // ANIMATE
  let animationID = useRef()
  let animate = useRef()
  let flip = useRef()
  animate.current = () => {
    stats && stats.current && stats.current.begin()

    // animate stuff
    animationID.current = undefined
    renderer.current.render(scene.current, camera.current)

    flip.current = flip.current + 1
    if (flip.current >= 3) {
      // do something at a lower framerate here
      flip.current = 0
    }

    animationID.current = requestAnimationFrame(animate.current)
    stats.current.end()
  }

  return (
    <Holder className={cx('holder', { borders: showBorders })}>
      <Header siteTitle={siteData.site.siteMetadata.title} className={cx('header-container')} />
      <main>
        <div className={cx('page-container')} ref={pageContainer}>
          <TransitionGroup className={cx('page-container__transition-group')}>
            <Transition
              // timeout={100} // turn this off when using addEndListener
              key={location.pathname}
              appear
              mountOnEnter
              unmountOnExit
              onEnter={(node, isAppearing) => {
                // isAppearing happens on 1st render, this one (onEnter) happens before initialClientRender (gatsby event)
                if (isAppearing) {
                  return
                }
                console.log('📃 page: on enter')
                handleResize()
              }}
              onEntering={
                (/*node, isAppearing*/) => {
                  console.log('📃 page: on entering')
                  handleResize()
                }
              }
              onEntered={
                (/*node, isAppearing*/) => {
                  console.log('📃 page: on entered')
                  handleResize()
                }
              }
              addEndListener={(node, done) => {
                const loadingOut = parseFloat(node.style.opacity) === 1
                gsap.to(node, 1.5, {
                  opacity: loadingOut ? 0 : 1,
                  x: loadingOut ? 100 : 0,
                  startAt: {
                    opacity: loadingOut ? 1 : 0,
                    x: loadingOut ? 0 : 100,
                  },
                  onComplete: () => {
                    handleResize()
                    console.log('📃 page transition end!!')
                    done()
                  },
                })
              }}
            >
              <div ref={pageContainerNode} className={cx('page-container__node')}>
                {children}
              </div>
            </Transition>
          </TransitionGroup>
        </div>
        {/*  END transitionContainer */}
      </main>

      <footer className={cx('footer')}>© {new Date().getFullYear()}, Footer goes here</footer>
    </Holder>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
  prevLocation: PropTypes.object,
  setPrevLocation: PropTypes.func,
  param: PropTypes.number.isRequired,
  setparam: PropTypes.func.isRequired,
  toggleGrid: PropTypes.func,
  showBorders: PropTypes.bool,
  toggleBorders: PropTypes.func,
}

const mapStateToProps = ({ prevLocation, param, showBorders }) => {
  return { prevLocation, param, showBorders }
}

const mapDispatchToProps = dispatch => {
  return {
    setPrevLocation: loc => dispatch({ type: `SETPREVLOCATION`, payload: loc }),
    setparam: target => dispatch({ type: `SETPARAM`, payload: target }),
    toggleGrid: target => dispatch({ type: `TOGGLESHOWGRID`, payload: target }),
    toggleBorders: target => dispatch({ type: `TOGGLESHOWBORDERS`, payload: target }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
