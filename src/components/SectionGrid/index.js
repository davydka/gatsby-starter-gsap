import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import faker from 'faker'

import styles from './SectionGrid.module.scss'
import Text from '@components/Text'

const cx = classnames.bind(styles)

const SectionGrid = ({ className, showBorders }) => {
  // todo: nested grid cols are weird when using unique cols per each breakpoint
  const latticeItemStyle = `col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-5 ${cx('lattice-item-holder')}`
  const latticeItems = Array.from({ length: 12 }, (i, index) => (
    <div key={index} className={latticeItemStyle}>
      <div className={cx('lattice-item')}>
        <Text tag={`span`} type={`bold`}>
          <img src={faker.image.imageUrl(200, 200, 'abstract')} alt={`fake image ${index + 1}`} />
          {`item ${index + 1}`}
        </Text>
      </div>
    </div>
  ))

  return (
    <div className={`section-container ${cx('section-grid', className, { borders: showBorders })}`}>
      <div className={`section ${cx('section-borders')}`}>
        <div className={`row`}>
          <div
            className={`
              col-xl-4
              offset-xl-4
              col-lg-4
              offset-lg-4
              col-md-4
              offset-md-2
              col-sm-4
              offset-sm-2
              col-xs-8
              offset-xs-1
            `}
          >
            <Text tag="h3" type="h3" className={cx('section-title')}>
              Lattice Section.
            </Text>
          </div>

          <div className={`col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-8 col-sm-8 col-xs-10`}>
            <div className={cx('lattice-holder')}>
              <div className={`row ${cx('lattice')}`}>{latticeItems}</div>
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
