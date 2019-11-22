import React from 'react'
// import { Link } from 'gatsby'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import styles from './Index.module.scss'
import SEO from '@components/seo'
// import Text from '@components/Text'
import Logo from '@components/Logo'

const cx = classnames.bind(styles)

const IndexPage = ({ showBorders }) => (
  <div className={cx('index-page', { borders: showBorders })}>
    <SEO title="Page Two - GSAP Starter" />

    <div className="section-container">
      <div className="section">
        <div className={cx('row')}>
          <div className={cx('col')}>
            <div className={cx('logo-container')}>
              <Logo className={cx('logo')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

IndexPage.propTypes = {
  showBorders: PropTypes.bool,
}

const mapStateToProps = ({ showBorders }) => {
  return { showBorders }
}

export default connect(mapStateToProps)(IndexPage)
