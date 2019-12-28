import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import querystring from 'query-string'

import styles from './Menu.module.scss'
import Logo from '@components/Logo'
import Peace from '@components/Logo/Peace'
import Cart from '@components/Logo/Cart'
import Close from '@components/Logo/Close'
import Link from '@components/Link'
import Text from '@components/Text'

const cx = classnames.bind(styles)

const Menu = ({ className, showBorders, menuRef, setStoreMobileOpen }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    setStoreMobileOpen(mobileOpen)
  }, [mobileOpen])

  const parsed = typeof location !== `undefined` ? querystring.parse(location.search) : { parsed: '' }

  const getSelected = page => {
    if (typeof page === 'undefined' && typeof parsed.page === 'undefined') return true
    return page === parsed.page
  }
  return (
    <div
      ref={menuRef}
      className={`section-container ${cx(
        'menu-container',
        className,
        { borders: showBorders },
        { 'mobile-open': mobileOpen }
      )}`}
    >
      <div className={`${cx('hover')}`} />
      <div className={`section`}>
        <div className={`row`}>
          <div className={`col ${cx('menu')}`}>
            <div className={cx('logo-container')}>
              <Link to="/" className={`${cx('logo-link')}`}>
                <Logo className={cx('logo')} />
              </Link>
            </div>

            <ul className={cx('mobile')}>
              <li>
                <Text
                  tag="button"
                  type="h4"
                  className={cx('menu-link-holder')}
                  onClick={() => setMobileOpen(!mobileOpen)}
                >
                  <span className={cx('menu-link', 'selected')}>Music</span>
                </Text>
              </li>

              <li className={cx('list-or-cover')}>
                <Text tag="h4" type="h4" className={cx('menu-link-holder', '')}>
                  <Link to="/page-2?page=bylist" className={cx('menu-link', 'callout')}>
                    By List
                  </Link>
                </Text>
              </li>
            </ul>

            <ul className={cx('non-mobile')}>
              <li>
                <Text tag="h4" type="h4" className={`${cx('menu-link-holder')}`}>
                  <Link to="/" className={`${cx('menu-link', { selected: getSelected() })}`}>
                    All
                  </Link>
                </Text>
              </li>
              <li>
                <Text tag="h4" type="h4" className={`${cx('menu-link-holder')}`}>
                  <Link
                    to="/records?page=records"
                    className={`${cx('menu-link', { selected: getSelected('records') })}`}
                  >
                    Records
                  </Link>
                </Text>
              </li>
              <li>
                <Text tag="h4" type="h4" className={`${cx('menu-link-holder')}`}>
                  <Link
                    to="/cassettes?page=cassettes"
                    className={`${cx('menu-link', { selected: getSelected('cassettes') })}`}
                  >
                    Cassettes
                  </Link>
                </Text>
              </li>
              <li>
                <Text tag="h4" type="h4" className={`${cx('menu-link-holder')}`}>
                  <Link
                    to="/in-print?page=inprint"
                    className={`${cx('menu-link', { selected: getSelected('inprint') })}`}
                  >
                    In Print
                  </Link>
                </Text>
              </li>
              <li className={cx('list-or-cover')}>
                <Text tag="h4" type="h4" className={`${cx('menu-link-holder', '')}`}>
                  <Link to={`/page-2?page=${parsed.page}`} className={`${cx('menu-link', 'callout')}`}>
                    By List
                  </Link>
                </Text>
              </li>

              <li className={cx('close')} onClick={() => setMobileOpen(!mobileOpen)}>
                <Close />
              </li>
            </ul>

            <div className={cx('cart-container')}>
              <div className={`${cx('cart-link-holder', 'peace-logo-holder')}`}>
                <Link to="/" className={`${cx('cart-link')}`}>
                  <Peace className={cx('cart-logo-item', 'peace-logo')} />
                </Link>
              </div>
              <div className={`${cx('cart-link-holder')}`}>
                <Link to="/" className={`${cx('cart-link')}`}>
                  <Cart className={cx('cart-logo-item', 'cart-logo')} />
                </Link>
              </div>
            </div>
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
  setStoreMobileOpen: PropTypes.func,
}

const mapStateToProps = ({ showBorders }) => {
  return { showBorders }
}

const mapDispatchToProps = dispatch => {
  return {
    setStoreMobileOpen: target => dispatch({ type: `SETMOBILEOPEN`, payload: target }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
