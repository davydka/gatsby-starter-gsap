import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import faker from 'faker'

import styles from './SectionLorem.module.scss'

const cx = classnames.bind(styles)

const SectionLorem = ({ className, showBorders }) => {
  return (
    <div className={`section-container ${cx(className, { borders: showBorders })}`}>
      <div className={`section`}>
        <div className={`row`}>
          <div className={`col`}>
            <div className={cx('content-container')}>
              <p>{faker.lorem.paragraph(12)}</p>
              <p>{faker.lorem.paragraph(12)}</p>
              <p>{faker.lorem.paragraph(12)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SectionLorem.propTypes = {
  className: PropTypes.string,
  showBorders: PropTypes.bool,
}

const mapStateToProps = ({ showBorders }) => {
  return { showBorders }
}

export default connect(mapStateToProps)(SectionLorem)
