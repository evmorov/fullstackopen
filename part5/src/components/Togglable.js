import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef(({ showLabel, hideLabel, children, hidePosition }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const hideLabelButton = <button onClick={toggleVisibility}>{hideLabel}</button>

  let showSection = null

  switch (hidePosition) {
    case 'top':
      showSection = (
        <>
          {hideLabelButton}
          {children}
        </>
      )
      break
    case 'bottom':
      showSection = (
        <>
          {children}
          {hideLabelButton}
        </>
      )
      break
    default:
      showSection = (
        <>
          {children}
          {hideLabelButton}
        </>
      )
  }

  return (
    <>
      <span style={hideWhenVisible}>
        <button data-test="toggle-button" onClick={toggleVisibility}>{showLabel}</button>
      </span>
      <span style={showWhenVisible}>{showSection}</span>
    </>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  hidePosition: PropTypes.string.isRequired,
}

export default Togglable
