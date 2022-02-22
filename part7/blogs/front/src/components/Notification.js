import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const { message, kind } = useSelector((state) => state.notification)

  if (!message) return null

  return (
    <Alert variant={kind} data-test="notification">
      {message}
    </Alert>
  )
}

export default Notification
