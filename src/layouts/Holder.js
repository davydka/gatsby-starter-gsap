import React from 'react'
import PropTypes from 'prop-types'

import GridHelper from './GridHelper'

class Holder extends React.Component {
  render() {
    const props = this.props

    return (
      <div className={props.className}>
        <GridHelper />
        {props.children}
      </div>
    )
  }
}

Holder.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Holder
