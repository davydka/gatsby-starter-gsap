import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import { siteMaxWidth } from '@styles/variables.module.scss'
import Text from '@components/Text'

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: siteMaxWidth,
        padding: `1.45rem 0`,
      }}
    >
      <Text tag="h1" type="h1" style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </Text>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
