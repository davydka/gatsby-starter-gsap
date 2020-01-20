import { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import gsap, { Linear } from 'gsap'
import * as THREE from 'three'
import debounce from 'lodash.debounce'

import { holderMarginTop, menuHeight } from '@styles/variables.module.scss'
import remStringToFloat from '@src/utils/remStringToFloat'

const menuSize = remStringToFloat(holderMarginTop) + remStringToFloat(menuHeight)

/************/
/** GATSBY **/
export const useSiteMetadata = () => {
  return useStaticQuery(
    graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
}

/***********/
/** STATS **/
export const initStats = stats => {
  stats.current = new window.Stats()
  stats.current.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
  stats.current.dom.style.zIndex = '9999'
  stats.current.dom.style.top = 'auto'
  stats.current.dom.style.left = 'auto'
  stats.current.dom.style.right = '15px'
  stats.current.dom.style.bottom = '0'
  document.body.appendChild(stats.current.dom)
}

/*******/
/* GUI */
export const initGUI = (gui, inletsHolder, handleInletChange) => {
  gui.current = new window.dat.GUI()
  // gui.current.useLocalStorage = true
  // gui.current.remember(inletsHolder.current)
  // gui.current
  //   .add(inletsHolder.current, 'speed', 0.0, 2.0)
  //   .onChange(handleInletChange.current)
  //   .listen()
  // gui.current
  //   .add(inletsHolder.current, 'param1', -7.5, 7.5)
  //   .onChange(handleInletChange.current)
  //   .listen()
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
}

/**********/
/** GSAP **/
export const initGSAP = (gs, player, scene, camera, textMesh1, e1) => {
  gs.current = gsap.timeline({
    // repeat: -1,
    timeScale: 1.0,
    paused: true,
    duration: player.current.duration, // seconds
    onStart: () => {
      textMesh1.current.scale.set(0, 0, 0)
      textMesh1.current.position.set(-12, 0, 0)
    },
  })

  gs.current.to(
    textMesh1.current.position,
    {
      startAt: { x: -3.55 * e1.end.y },
      x: 3.55 * e1.end.y,
      duration: (e1.end.x - e1.start.x) * player.current.duration,
    },
    e1.start.x * player.current.duration
    // 0
  )
  gs.current.to(
    textMesh1.current.scale,
    {
      startAt: { x: e1.start.y, y: e1.start.y, z: e1.start.y },
      x: e1.end.y,
      y: e1.end.y,
      z: e1.end.y,
      duration: (e1.end.x - e1.start.x) * player.current.duration,
    },
    e1.start.x * player.current.duration
    // 0
  )
  gs.current.to(
    textMesh1.current.position,
    {
      dummyVal: 0,
      duration: 1,
    },
    // 3.5
    player.current.duration
  )
}

/***********/
/** THREE **/
export const initOrbitsThunk = controls => {
  return () => {
    controls.current.rotateSpeed = 1.0
    controls.current.zoomSpeed = 1.2
    controls.current.panSpeed = 0.8
  }
}

export const initCameraThunk = camera => {
  return () => {
    camera.current.position.x = 0
    camera.current.position.y = 0
    camera.current.position.z = 20.5
  }
}

export const addMesh = (sceneSize, mesh, scene) => {
  let geometry = new THREE.SphereGeometry(sceneSize / 2, 8, 8, 0, Math.PI * 2, 0, Math.PI * 2)
  let material = new THREE.MeshNormalMaterial({
    // wireframe: true,
    flatShading: true,
  })
  mesh.current = new THREE.Mesh(geometry, material)
  // mesh.current.visible = false
  mesh.current.position.setZ(-mesh.current.geometry.parameters.radius * 2)
  scene.current.add(mesh.current)
}

export const addSceneHelperMesh = (sceneSize, sceneHelperMesh, axisHelper, scene) => {
  let g = new THREE.PlaneGeometry(sceneSize, sceneSize, 12, 12)
  let m = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0xff6666,
    opacity: 0.25,
    transparent: true,
    flatShading: true,
  })
  sceneHelperMesh.current = new THREE.Mesh(g, m)
  sceneHelperMesh.current.visible = false
  scene.current.add(sceneHelperMesh.current)

  axisHelper.current = new THREE.AxesHelper(sceneSize)
  scene.current.add(axisHelper.current)
}

/************/
/** SCROLL **/
export const handleScroll = (
  showBordersRef,
  halfPageHelperRef,
  lastScroll,
  setLastScroll,
  menuRef,
  heightRef,
  // eslint-disable-next-line no-unused-vars
  canvasElement
) => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop
  const topThreshold = heightRef.current.offsetHeight - window.innerHeight
  const initialThreshold = parseFloat(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--vhThreshold')
      .replace('px', '')
  )

  const end = () => {
    if (currentScroll !== lastScroll) {
      setLastScroll(currentScroll)
    }
    return true
  }

  const debounceMs = 10
  const debounceOpts = { leading: true, trailing: false }
  const hideMenu = () => {
    menuRef.current.style.transform = `translate3d(0px, -${menuSize + 1}px, 0)`
  }
  const showMenu = () => {
    menuRef.current.style.transform = 'translate3d(0px, 0, 0)'
  }

  const initialCanvas = () => {
    // canvasElement.current.style.transform = `translate3d(0px, -${initialThreshold - menuSize / 2}px, 0)`
  }
  const smallCanvas = () => {
    // if near the top, before the 'resize zone' on mobile
    if (currentScroll <= initialThreshold) {
      initialCanvas()
    } else {
      // canvasElement.current.style.transform = `translate3d(0px, -${initialThreshold}px, 0)`
    }
  }
  const fullCanvas = () => {
    // canvasElement.current.style.transform = `translate3d(0px, -${initialThreshold / 2}px, 0)`
  }

  // bottom 'bounce zone' (inertial scrolling) on mobile
  if (currentScroll > document.body.offsetHeight - window.innerHeight - 2) {
    debounce(hideMenu, debounceMs, debounceOpts)()
    debounce(fullCanvas, debounceMs, debounceOpts)()
    return end()
  }
  // show menu when mobile browser chrome is showing
  if (topThreshold > 0) {
    debounce(showMenu, debounceMs, debounceOpts)()
    debounce(smallCanvas, debounceMs, debounceOpts)()
    return end()
  }
  // down
  if (currentScroll > lastScroll && currentScroll > 0) {
    debounce(hideMenu, debounceMs, debounceOpts)()
    debounce(fullCanvas, debounceMs, debounceOpts)()
    return end()
  }
  // up
  if (currentScroll < lastScroll || currentScroll < 0) {
    debounce(showMenu, debounceMs, debounceOpts)()

    // do not fire 'smallCanvas' here
    // in this case, we'll let `browser chrome showing` logic handle the canvas size
    // debounce(smallCanvas, debounceMs, debounceOpts)()
    return end()
  }
}

export const resizeRendererToDisplaySize = (
  canvasElement,
  canvasWaveform,
  renderer,
  camera,
  sceneSize,
  heightRef,
  initWaveform,
  waveform,
  e1
) => {
  // css sets actual height and width
  const width = canvasElement.current.clientWidth | 0
  const height = canvasElement.current.clientHeight | 0

  // check height and width attribute values and compare to clientWidth and clientHeight
  const pxRatio = window.devicePixelRatio
  const needResize =
    canvasElement.current.width / pxRatio !== width || canvasElement.current.height / pxRatio !== height

  if (needResize) {
    document.documentElement.style.setProperty(
      '--vhThreshold',
      `${heightRef.current.offsetHeight - window.innerHeight}px`
    )
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    canvasWaveform.current.width = window.innerWidth
    // canvasWaveform.current.height = '200'
    initWaveform(waveform, canvasWaveform, e1)

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

export const resizeThreeScene = (heroRef, canvasElement, raycaster, scene, camera, sceneSize) => {
  if (heroRef === null) {
    return
  }
  const bounds = heroRef.getBoundingClientRect()
  if (!bounds.left) {
    return
  }
  const left = bounds.left + 1 // magic number for various paddings and margins
  const ndcLeft = (left / canvasElement.current.clientWidth) * 2 - 1
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  const ptIntrsct = new THREE.Vector3()
  raycaster.current.setFromCamera(new THREE.Vector2(ndcLeft, 0), camera.current)
  raycaster.current.ray.intersectPlane(plane, ptIntrsct)
  const scale = Math.abs(ptIntrsct.x / (sceneSize / 2))
  if (scale > 0 && !gsap.globalTimeline.paused()) {
    scene.current.scale.set(scale, scale, scale)
    // setting the scale in resizeThreeScene() is a little funky
    // because once taking into account the aspect ratio changes, sizing gets distorted by the FOV
    // example: https://i.imgur.com/LALJydf.gifv
    // when targeting heroRef, setting the mesh position seems to help
    // mesh.current.position.setZ(-mesh.current.geometry.parameters.radius * 2 * scale)
  }
}

/***********/
/** HOOKS **/
export const usePrevLocation = (location, setPrevLocation) => {
  useEffect(() => {
    if (location && location.state && location.state.prevLocation) {
      setPrevLocation(location.state.prevLocation)
    }
  }, [location, setPrevLocation])
}

export const useShowBorders = (
  showBorders,
  showBordersRef,
  handleScroll,
  axisHelper,
  sceneHelperMesh,
  halfPageHelperRef,
  lastScroll,
  setLastScroll,
  menuRef,
  heightRef,
  canvasElement
) => {
  useEffect(() => {
    showBordersRef.current = showBorders // ref here for eventlistener not updating with Redux Store state
    handleScroll(showBordersRef, halfPageHelperRef, lastScroll, setLastScroll, menuRef, heightRef, canvasElement)

    if (axisHelper.current) {
      axisHelper.current.visible = showBorders
    }
    if (sceneHelperMesh.current) {
      sceneHelperMesh.current.visible = showBorders
    }
  }, [showBorders])
}

export const useParam1 = (param1, ref, inlets) => {
  useEffect(() => {
    gsap.to(ref.current.position, 1, {
      z: param1,
      ease: Linear.ease,
    })
  }, [param1, inlets])
}

export const useParam2 = (param2, ref, inlets) => {
  useEffect(() => {
    gsap.to(ref.current.position, 1, {
      x: param2,
      ease: Linear.ease,
    })
  }, [param2, inlets])
}

export const useParam3 = (param3, ref, inlets) => {
  useEffect(() => {
    gsap.to(ref.current.position, 1, {
      y: param3,
      ease: Linear.ease,
    })
  }, [param3, inlets])
}

export const useScrollRotateMesh = (currentScroll, ref) => {
  useEffect(() => {
    if (!ref.current) return
    // scale scroll position from 0 to 1
    const targetHeight = currentScroll / (document.body.clientHeight - window.innerHeight)
    gsap.to(ref.current.rotation, 1, {
      z: Math.PI / 2 + targetHeight * Math.PI * 8,
      ease: Linear.ease,
    })
  }, [currentScroll])
}

/** Waveform Data **/
export const initWaveform = (waveform, canvasWaveform, e1) => {
  if (!canvasWaveform.current) return

  const scaleY = (amplitude, height) => {
    const range = 256
    const offset = 128

    return height - ((amplitude + offset) * height) / range
  }

  const ctx = canvasWaveform.current.getContext('2d')
  ctx.clearRect(0, 0, canvasWaveform.current.width, canvasWaveform.current.height)
  ctx.strokeStyle = '#000'
  ctx.fillStyle = '#000'
  ctx.beginPath()

  const channel = waveform.current.channel(0)
  const xStep = canvasWaveform.current.width / waveform.current.length

  // Loop forwards, drawing the upper half of the waveform
  for (let x = 0; x < waveform.current.length; x++) {
    const val = channel.max_sample(x)

    ctx.lineTo(x * xStep + 0.5, scaleY(val, canvasWaveform.current.height) + 0.5)
  }

  // Loop backwards, drawing the lower half of the waveform
  for (let x = waveform.current.length - 1; x >= 0; x--) {
    const val = channel.min_sample(x)

    ctx.lineTo(x * xStep + 0.5, scaleY(val, canvasWaveform.current.height) + 0.5)
  }

  ctx.closePath()
  ctx.stroke()
  ctx.fill()

  ctx.fillStyle = '#007f00'
  ctx.strokeStyle = '#007f00'
  const w = canvasWaveform.current.width
  const h = canvasWaveform.current.height
  ctx.beginPath()
  ctx.arc(e1.start.x * w, e1.start.y * h, 9, 0, 2 * Math.PI)
  ctx.fill()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(e1.start.x * w, e1.start.y * h)
  ctx.lineTo(e1.end.x * w, e1.end.y * h)
  ctx.closePath()
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(e1.end.x * w, e1.end.y * h, 9, 0, 2 * Math.PI)
  ctx.fill()
  ctx.stroke()
}
