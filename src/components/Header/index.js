import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

import styles from './Header.module.scss'
import Text from '@components/Text'
import { connect } from 'react-redux'

const cx = classnames.bind(styles)

const Header = ({ className, showBorders }) => {
  const type = 'h6'
  return (
    <header className={cx('section-container', 'header', className, { borders: showBorders })}>
      <div className={cx('section')}>
        <div className={cx('row')}>
          <div
            className={cx(
              'col-xl-4',
              'offset-xl-4',
              'col-lg-4',
              'offset-lg-4',
              'col-md-4',
              'offset-md-2',
              'col-sm-4',
              'offset-sm-2',
              'col-xs-8',
              'offset-xs-1'
            )}
          >
            <ul>
              <li>
                <Text tag="h3" type={type}>
                  <Link to="/">Home</Link>
                </Text>
              </li>
              <li>
                <Text tag="h3" type={type}>
                  <Link to="/page-2">Page 2</Link>
                </Text>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  className: PropTypes.string,
  showBorders: PropTypes.bool,
}

const mapStateToProps = ({ showBorders }) => {
  return { showBorders }
}

export default connect(mapStateToProps)(Header)
