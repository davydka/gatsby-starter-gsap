import React from 'react'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'

import styles from './GridHelper.module.scss'
import variables from '@styles/variables.module.scss'
import PropTypes from 'prop-types'

const cx = classnames.bind(styles)

const gridSetup = {
  xs: {
    cols: parseInt(variables.colsXs),
    colClass: 'col-xs',
  },
  sm: {
    cols: parseInt(variables.colsSm),
    colClass: 'col-sm',
  },
  md: {
    cols: parseInt(variables.colsMd),
    colClass: 'col-md',
  },
  lg: {
    cols: parseInt(variables.colsLg),
    colClass: 'col-lg',
  },
  xl: {
    cols: parseInt(variables.colsXl),
    colClass: 'col-xl',
  },
}

const GridHelper = ({ showGridHelper }) => {
  if (!showGridHelper) {
    return null
  }

  return (
    <div className={cx('grid-helper')}>
      {Object.keys(gridSetup).map((_, index) => {
        return (
          <div key={index} className={cx('row-helper', 'row', `${_}-helper`)}>
            {Array(gridSetup[_].cols)
              .fill(null)
              .map((__, _index) => (
                <div key={_index} className={cx('col-helper', 'col')}>
                  <div className={cx('col-content-helper')} />
                </div>
              ))}
          </div>
        )
      })}
    </div>
  )
}

GridHelper.propTypes = {
  showGridHelper: PropTypes.bool,
}

const mapStateToProps = ({ showGridHelper }) => {
  return { showGridHelper }
}

export default connect(mapStateToProps)(GridHelper)
