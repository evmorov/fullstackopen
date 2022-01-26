import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, kind } = useSelector((state) => state.notification)

  if (!message) return null

  const notificationColor = () => {
    let color = 'lightgrey'
    switch (kind) {
      case 'info':
        color = 'green'
        break
      case 'error':
        color = 'red'
        break
      default:
        console.error(`Unkown notification kind ${kind}`)
    }
    return color
  }

  const notificationStyle = {
    color: notificationColor(),
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  return (
    <div style={notificationStyle} data-test="notification">
      {message}
    </div>
  )
}

export default Notification
