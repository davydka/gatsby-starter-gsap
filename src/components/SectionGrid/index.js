import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'

import styles from './SectionGrid.module.scss'

const cx = classnames.bind(styles)

const SectionGrid = ({ className, showBorders }) => {
  return (
    <div className={cx('section-container', className, { borders: showBorders })}>
      <div className={cx('section')}>
        <div className={cx('row')}>
          <div className={cx('col')}>
            <div className={cx('content-container')}>
              Grid Section <br />
              Grid Section <br />
              Grid Section <br />
              Grid Section <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SectionGrid.propTypes = {
  className: PropTypes.string,
  showBorders: PropTypes.bool,
}

const mapStateToProps = ({ showBorders }) => {
  return { showBorders }
}

export default connect(mapStateToProps)(SectionGrid)
