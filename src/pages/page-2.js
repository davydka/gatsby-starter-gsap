import React, { useEffect } from 'react'
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

const cx = classnames.bind({ ...styles, ...layoutStyles })

const IndexPage = ({ location, showBorders }) => {
  // componentDidMount
  useEffect(() => {
    console.log('📟 Page mounted')

    /** CleanUp **/
    return () => {}
  }, [])

  return (
    <PageTransition location={location} pagePath="page-2">
      <div className={cx('index-page', { 'page-borders': showBorders })}>
        <SEO title="GSAP - Starter" />

        <div className="section-container">
          <div className="section">
            <div className={cx('row')}>
              <div className={cx('col')}>
                <div className={cx('logo-container')}>
                  <Moon className={cx('moon')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object,
  showBorders: PropTypes.bool,
}

const mapStateToProps = ({ showBorders }) => {
  return { showBorders }
}

export default connect(mapStateToProps)(IndexPage)
