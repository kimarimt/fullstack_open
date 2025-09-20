const Notification = ({ message, color }) => {
  const styles = { borderColor: color, color }

  return <p style={styles} className='notification'>{message}</p>
}

export default Notification