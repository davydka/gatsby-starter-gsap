import React, { useCallback, useEffect } from 'react'
// import { Link } from 'gatsby'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import styles from './Index.module.scss'
import layoutStyles from '../layouts/Layout.module.scss'

import PageTransition from '@components/PageTransition'
import SEO from '@components/seo'
// import Text from '@components/Text'
import Moon from '@components/Logo/Moon'
import SectionLorem from '@components/SectionLorem'
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
    <PageTransition location={location} pagePath="page-2">
      <div className={cx('index-page', { 'page-borders': showBorders, 'mobile-safari': isiOS() })}>
        <SEO title="GSAP - Starter" />

        <div className={cx('section-container')}>
          <div className={cx('section')}>
            <div className={cx('row')}>
              <div className={cx('col')}>
                <div className={cx('logo-container')}>
                  <Moon ref={localHeroRef} className={cx('moon')} />
                </div>
              </div>
            </div>
          </div>
        </div>

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
