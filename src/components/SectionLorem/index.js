import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { connect } from 'react-redux'

import styles from './SectionLorem.module.scss'

const cx = classnames.bind(styles)

const SectionLorem = ({ className, showBorders }) => {
  return (
    <div className={cx('section-container', className, { borders: showBorders })}>
      <div className={cx('section')}>
        <div className={cx('row')}>
          <div className={cx('col')}>
            <div className={cx('content-container')}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                et dolore magna aliqua. Auctor eu augue ut lectus arcu bibendum at varius vel. Vitae auctor eu augue ut
                lectus arcu bibendum at. Neque volutpat ac tincidunt vitae semper quis lectus nulla at. Semper feugiat
                nibh sed pulvinar proin gravida hendrerit. Non curabitur gravida arcu ac. Egestas integer eget aliquet
                nibh praesent. Mi quis hendrerit dolor magna eget est lorem. Id cursus metus aliquam eleifend mi in.
                Adipiscing commodo elit at imperdiet dui.
              </p>
              <p>
                Euismod in pellentesque massa placerat duis ultricies lacus sed. Sodales ut etiam sit amet nisl purus in
                mollis. Fermentum iaculis eu non diam phasellus vestibulum lorem. Cursus mattis molestie a iaculis at
                erat. Morbi non arcu risus quis. Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies. Eu
                tincidunt tortor aliquam nulla facilisi cras. Leo a diam sollicitudin tempor id eu nisl nunc.
                Condimentum mattis pellentesque id nibh. Malesuada fames ac turpis egestas integer. Feugiat in ante
                metus dictum at tempor commodo. Suspendisse sed nisi lacus sed. Consectetur adipiscing elit ut aliquam
                purus sit amet luctus. Adipiscing diam donec adipiscing tristique risus nec. Convallis tellus id
                interdum velit laoreet id donec ultrices tincidunt. Leo urna molestie at elementum eu facilisis sed
                odio. A erat nam at lectus urna duis convallis convallis. Sapien pellentesque habitant morbi tristique
                senectus et netus et. Enim neque volutpat ac tincidunt vitae semper. Ac placerat vestibulum lectus
                mauris ultrices eros in.
              </p>
              <p>
                In nisl nisi scelerisque eu ultrices vitae auctor. Ut faucibus pulvinar elementum integer. Tincidunt
                ornare massa eget egestas purus viverra. Viverra vitae congue eu consequat ac. Quam elementum pulvinar
                etiam non quam lacus suspendisse faucibus. Quisque id diam vel quam elementum. Eget felis eget nunc
                lobortis mattis. Nec feugiat nisl pretium fusce id velit ut tortor. Ipsum dolor sit amet consectetur
                adipiscing elit. Nisl nunc mi ipsum faucibus. Dui sapien eget mi proin sed libero enim sed. Id eu nisl
                nunc mi ipsum faucibus vitae aliquet. Luctus accumsan tortor posuere ac. Viverra vitae congue eu
                consequat ac felis donec. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla.
              </p>
              <p>
                Ac ut consequat semper viverra. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Sed arcu non
                odio euismod lacinia. Massa vitae tortor condimentum lacinia quis. Rhoncus est pellentesque elit
                ullamcorper dignissim. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis.
                Scelerisque felis imperdiet proin fermentum leo. Sed turpis tincidunt id aliquet risus feugiat in ante
                metus. Velit scelerisque in dictum non consectetur a. Lectus proin nibh nisl condimentum id venenatis a.
                Cras pulvinar mattis nunc sed blandit libero. Feugiat sed lectus vestibulum mattis ullamcorper velit sed
                ullamcorper.
              </p>
              <p>
                Amet massa vitae tortor condimentum lacinia quis vel eros donec. Non tellus orci ac auctor. At quis
                risus sed vulputate. Vulputate odio ut enim blandit volutpat maecenas volutpat. Orci porta non pulvinar
                neque laoreet suspendisse interdum. Parturient montes nascetur ridiculus mus mauris vitae ultricies.
                Egestas sed tempus urna et. Ullamcorper malesuada proin libero nunc consequat interdum varius sit amet.
                Egestas quis ipsum suspendisse ultrices gravida dictum. Diam donec adipiscing tristique risus nec
                feugiat. Sit amet purus gravida quis blandit turpis cursus in hac.
              </p>
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
