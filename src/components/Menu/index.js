import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'

import styles from './Menu.module.scss'
import Link from '@components/Link'
import Text from '@components/Text'

const cx = classnames.bind(styles)

const Menu = ({ className, showBorders, menuRef }) => {
  const type = 'h6'
  return (
    <div ref={menuRef} className={cx('section-container', 'menu-container', className, { borders: showBorders })}>
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
              'offset-xs-1',
              'menu'
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
    </div>
  )
}

Menu.propTypes = {
  menuRef: PropTypes.object,
  className: PropTypes.string,
  showBorders: PropTypes.bool,
  setPageNavigate: PropTypes.func,
}

const mapStateToProps = ({ showBorders }) => {
  return { showBorders }
}

export default connect(mapStateToProps)(Menu)
