import React, { useCallback, useEffect, useState, useRef } from 'react'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import styles from './Index.module.scss'
import layoutStyles from '../layouts/Layout.module.scss'

import PageTransition from '@components/PageTransition'
import SEO from '@components/seo'
import Logo from '@components/Logo'
import SectionCover from '@components/SectionCover'
import isiOS from '@utils/isiOS'

const cx = classnames.bind({ ...styles, ...layoutStyles })

const IndexPage = ({ location, showBorders, setHeroRef, FTUI }) => {
  const indexRef = useRef(null)
  const sectionRef = useRef(null)
  const [initialFTUI] = useState(FTUI)

  useEffect(() => {
    if (!indexRef.current) return
    if (!sectionRef.current) return

    if (initialFTUI === false) {
      indexRef.current.classList.add(cx('no-ftui'))
    }
    if (initialFTUI === true) {
      sectionRef.current.classList.add(cx('ftui-in'))
    }
  }, [showBorders])

  const localHeroRef = useCallback(node => {
    if (node !== null) {
      setHeroRef(node)
    }
  }, [])

  return (
    <PageTransition location={location} pagePath="/">
      <div
        ref={indexRef}
        className={cx('index-page', {
          'page-borders': showBorders,
          'mobile-safari': isiOS(),
          FTUI,
          'ftui-complete': !FTUI && initialFTUI,
        })}
      >
        <SEO title="Records, Tapes" />

        <div className={`section-container ${cx('section-spacer')}`}>
          <div className={`section`}>
            <div className={`row`}>
              <div className={`col`}>
                <div className={cx('logo-container')} />
              </div>
            </div>
          </div>
        </div>

        <div ref={sectionRef} className={`section-container`}>
          <div className={`section`}>
            <div className={`row`}>
              <div className={`col`}>
                <div className={cx('logo-container')}>
                  <Logo ref={localHeroRef} className={cx('logo')} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionCover />
      </div>
    </PageTransition>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object,
  FTUI: PropTypes.bool,
  showBorders: PropTypes.bool,
  setHeroRef: PropTypes.func,
}

const mapStateToProps = ({ showBorders, FTUI }) => {
  return { showBorders, FTUI }
}

const mapDispatchToProps = dispatch => {
  return {
    setHeroRef: target => dispatch({ type: `SETHEROREF`, payload: target }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
