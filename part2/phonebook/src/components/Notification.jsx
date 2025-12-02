const Notification = ({ message, color }) => {
  const styles = { borderColor: color, color }

  return (
    <div className='notification' style={styles}>
      <p>{message}</p>
    </div>
  )
}

export default Notification