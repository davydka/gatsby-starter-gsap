import React, { useEffect, useCallback } from 'react'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import styles from './Index.module.scss'
import layoutStyles from '../layouts/Layout.module.scss'

import PageTransition from '@components/PageTransition'
import SEO from '@components/seo'
import Logo from '@components/Logo'
import SectionLorem from '@components/SectionLorem'
import SectionCover from '@components/SectionCover'
import SectionVideo from '@components/SectionVideo'
import SectionReel from '@components/SectionReel'
import isiOS from '@utils/isiOS'

const cx = classnames.bind({ ...styles, ...layoutStyles })

const IndexPage = ({ location, showBorders, setHeroRef }) => {
  // componentDidMount
  useEffect(() => {
    // console.log('📟 Page mounted')

    /** CleanUp **/
    return () => {}
  }, [])

  const localHeroRef = useCallback(node => {
    if (node !== null) {
      setHeroRef(node)
    }
  }, [])

  return (
    <PageTransition location={location} pagePath="/">
      <div className={cx('index-page', { 'page-borders': showBorders, 'mobile-safari': isiOS() })}>
        <SEO title="GSAP - Starter" />

        <div className={`section-container`}>
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
        <SectionLorem />
        <SectionVideo />
        <SectionLorem />
        <SectionReel />
        <SectionLorem />
      </div>
    </PageTransition>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object,
  showBorders: PropTypes.bool,
  setHeroRef: PropTypes.func,
}

const mapStateToProps = ({ showBorders }) => {
  return { showBorders }
}

const mapDispatchToProps = dispatch => {
  return {
    setHeroRef: target => dispatch({ type: `SETHEROREF`, payload: target }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
