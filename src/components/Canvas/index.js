import React, {useEffect, useRef} from 'react';
import {TweenMax, Linear} from 'gsap';
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

import styles from './Canvas.module.scss'
const cx = classnames.bind(styles)

const Canvas = ({width, height}) => {
  let canvasElement = useRef(null)
  let targetElement = useRef(null)
  let gsTween = useRef({current: null})

  useEffect(() => {
    console.log(canvasElement)
    gsTween.current = TweenMax.to(
      targetElement,
      1,
      {
        repeat: -1,
        rotation: 360,
        ease: Linear.easeNone
      }
    )
  }, []);

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

  return (
    <div className={cx('container')} width={width} height={height}>
      <canvas className={cx('canvas')} ref={element => {canvasElement = element}} width={width} height={height} />

      <div onMouseEnter={scaleUp} onMouseLeave={scaleDown} ref={element => {targetElement = element}} className={cx('target')}>
        hello!
      </div>
    </div>
  );
}

Canvas.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
}

export default Canvas
