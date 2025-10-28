export default function Notification({ message, color }) {
  const styles = { borderColor: color, color }

  return <p className='notification' style={styles}>{message}</p>
}