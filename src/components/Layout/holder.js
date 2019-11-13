import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { connect } from "react-redux"

const Counter = ({ count, increment }) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>Increment</button>
  </div>
)

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
}

const mapStateToProps = ({ count }) => {
  return { count }
}

const mapDispatchToProps = dispatch => {
  return { increment: () => dispatch({ type: `INCREMENT` }) }
}

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter)

class Holder extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <h3>Redux example</h3>
        </Link>
        <ConnectedCounter />
        {this.props.children}
      </div>
    )
  }
}

export default Holder