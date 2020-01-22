import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Link = ({ children, to, className, setPageNavigate, setMobileOpen }) => {
  const handleClick = e => {
    e.preventDefault()
    setMobileOpen(false)
    setPageNavigate(to)
  }

  return (
    <GatsbyLink to={to} className={className} onClick={handleClick}>
      {children}
    </GatsbyLink>
  )
}

Link.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  setPageNavigate: PropTypes.func,
  setMobileOpen: PropTypes.func,
}

const mapDispatchToProps = dispatch => {
  return {
    setPageNavigate: target => dispatch({ type: `SETPAGETRANSITIONURLTARGET`, payload: target }),
    setMobileOpen: target => dispatch({ type: `SETMOBILEOPEN`, payload: target }),
  }
}

export default connect(null, mapDispatchToProps)(Link)
