const Notification = ({ message, color }) => {
  const style = { borderColor: color, color: color }

  return (
    <div className='notification' style={style}>
      <p>{message}</p>
    </div>
  )
}

export default Notification