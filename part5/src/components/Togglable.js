import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef(({ showLabel, hideLabel, children }, ref) => {
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

  return (
    <>
      <span style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{showLabel}</button>
      </span>
      <span style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{hideLabel}</button>
      </span>
    </>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
