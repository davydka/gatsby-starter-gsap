import { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import gsap, { Linear } from 'gsap'
import * as THREE from 'three'

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
  gui.current.useLocalStorage = true
  gui.current.remember(inletsHolder.current)
  gui.current
    .add(inletsHolder.current, 'speed', 0.0, 2.0)
    .onChange(handleInletChange.current)
    .listen()
  gui.current
    .add(inletsHolder.current, 'param1', -7.5, 7.5)
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
}

/**********/
/** GSAP **/
export const initGSAP = gs => {
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
    camera.current.position.z = 2.5
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
export const handleScroll = (showBordersRef, halfPageHelperRef) => {
  // halfPageHelperRef can't use position fixed because Firefox's
  // webgl performance drops when too many position: fixed elements
  // are on top of the webgl element
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop
  if (showBordersRef && showBordersRef.current === true && showBordersRef && halfPageHelperRef.current) {
    halfPageHelperRef.current.style.top = `${currentScroll + window.innerHeight / 2}px`
  }
}

export const handleOrientationChange = (showBordersRef, halfPageHelperRef) => {
  // note - for mobileSafari, we're not updating 100vh (cover) params onresize,
  //                                                only on orientation change
  // reasoning is that these items are generally for "above the fold" features
  // and we don't want too much resize thrashing (at this point)
  // also calling this change onScroll causes visible jumps on Mobile Safari
  // iOS 100vh - https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  // for Chome on Android, it's not too bad * Tested Pixel 3, Android 9
  return () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    handleScroll(showBordersRef, halfPageHelperRef)
  }
}

export const resizeRendererToDisplaySize = (canvasElement, renderer, camera, sceneSize) => {
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

export const resizeThreeScene = (heroRef, canvasElement, raycaster, scene, camera, sceneSize) => {
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
  halfPageHelperRef
) => {
  useEffect(() => {
    showBordersRef.current = showBorders // ref here for eventlistener not updating with Redux Store state
    handleScroll(handleScroll(showBordersRef, halfPageHelperRef))

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
