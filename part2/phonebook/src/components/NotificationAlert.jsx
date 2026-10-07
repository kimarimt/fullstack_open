const NotificationAlert = ({ message, color }) => {
  const alertColor = {
    borderColor: color,
    color
  }

  return (
    <div className='alert' style={alertColor}>
      <p>{message}</p>
    </div>
  )
}

export default NotificationAlert