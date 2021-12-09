const Notification = ({ notification: { message, type } }) => {
  if (!message) return null

  const notificationColor = () => {
    let color = 'lightgrey'
    switch (type) {
      case 'info':
        color = 'green'
        break
      case 'error':
        color = 'red'
        break
      default:
        console.error(`Unkown notification type ${type}`)
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

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
