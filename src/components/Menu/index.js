import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'
import querystring from 'query-string'
import gsap from 'gsap'

import styles from './Menu.module.scss'
import Logo from '@components/Logo'
import Peace from '@components/Logo/Peace'
import Cart from '@components/Logo/Cart'
import Close from '@components/Logo/Close'
import Link from '@components/Link'
import Text from '@components/Text'

const cx = classnames.bind(styles)

const Menu = ({ className, showBorders, menuRef, setMobileOpen, mobileOpen, FTUI, theme }) => {
  const parsed =
    typeof location !== `undefined` && typeof location.search !== `undefined` && location.search !== ''
      ? querystring.parse(location.search)
      : { page: '', bylist: '' }

  useEffect(() => {
    if (!menuRef) return

    gsap.fromTo(
      menuRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        delay: FTUI ? 1 : 0,
      }
    )
  }, [])

  useEffect(() => {
    if (!menuRef) return
    if (FTUI) {
      menuRef.current.classList.add(cx('FTUI'))
    } else {
      menuRef.current.classList.remove(cx('FTUI'))
    }
  }, [FTUI])

  const getSelected = page => {
    if (typeof page === 'undefined' && (typeof parsed.page === 'undefined' || parsed.page === '')) return true
    return page === parsed.page
  }

  const buildTo = (to, page, forceByList) => {
    // records?page=records&bylist=true
    let target = to

    if (to !== '/' && page !== '') {
      target = `${target}?page=${page}`
      if (!parsed.bylist && forceByList) {
        target = `bylist-${target}&bylist=true`
      }
      if (parsed.bylist && typeof forceByList === 'undefined') {
        target = `bylist-${target}&bylist=true`
      }
    }

    if (to !== '/' && page === '') {
      if (!parsed.bylist && forceByList) {
        target = `bylist-${target}?bylist=true`
      }
      if (parsed.bylist && typeof forceByList === 'undefined') {
        target = `bylist-${target}?bylist=true`
      }
    }

    if (to === '/') {
      if (parsed.bylist && typeof forceByList === 'undefined') {
        target = `bylist${target}?bylist=true`
      }
    }

    return `/${target}`
  }

  return (
    <div
      ref={menuRef}
      className={`section-container ${cx('menu-container', className, {
        light: theme === 'light',
        dark: theme === 'dark',
        bylist: parsed.bylist,
        borders: showBorders,
        'mobile-open': mobileOpen,
      })}`}
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
                  <Link
                    to={buildTo('page-2', parsed.page ? parsed.page : '', true)}
                    className={cx('menu-link', 'callout')}
                  >
                    By List
                  </Link>
                </Text>
              </li>
            </ul>

            <ul className={cx('non-mobile')}>
              <li>
                <Text tag="h4" type="h4" className={`${cx('menu-link-holder')}`}>
                  <Link to={buildTo('/')} className={`${cx('menu-link', { selected: getSelected() })}`}>
                    All
                  </Link>
                </Text>
              </li>
              <li>
                <Text tag="h4" type="h4" className={`${cx('menu-link-holder')}`}>
                  <Link
                    to={buildTo('records', 'records')}
                    className={`${cx('menu-link', { selected: getSelected('records') })}`}
                  >
                    Records
                  </Link>
                </Text>
              </li>
              <li>
                <Text tag="h4" type="h4" className={`${cx('menu-link-holder')}`}>
                  <Link
                    to={buildTo('cassettes', 'cassettes')}
                    className={`${cx('menu-link', { selected: getSelected('cassettes') })}`}
                  >
                    Cassettes
                  </Link>
                </Text>
              </li>
              <li>
                <Text tag="h4" type="h4" className={`${cx('menu-link-holder')}`}>
                  <Link
                    to={buildTo('in-print', 'inprint')}
                    className={`${cx('menu-link', { selected: getSelected('inprint') })}`}
                  >
                    In Print
                  </Link>
                </Text>
              </li>
              <li className={cx('list-or-cover')}>
                <Text tag="h4" type="h4" className={`${cx('menu-link-holder', '')}`}>
                  <Link
                    to={buildTo('page-2', parsed.page ? parsed.page : '', true)}
                    className={`${cx('menu-link', 'callout')}`}
                  >
                    {parsed.bylist ? 'By Cover' : 'By List'}
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
  FTUI: PropTypes.bool,
  theme: PropTypes.string,
  menuRef: PropTypes.object,
  className: PropTypes.string,
  mobileOpen: PropTypes.bool,
  showBorders: PropTypes.bool,
  setMobileOpen: PropTypes.func,
}

const mapStateToProps = ({ showBorders, mobileOpen, FTUI, theme }) => {
  return { showBorders, mobileOpen, FTUI, theme }
}

const mapDispatchToProps = dispatch => {
  return {
    setMobileOpen: target => dispatch({ type: `SETMOBILEOPEN`, payload: target }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
