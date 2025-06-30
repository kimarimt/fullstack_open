import { useSelector } from "react-redux"

const Notification = () => {
  const styles = {
    notificationBorder: {
      border: 'solid',
      padding: 10,
      borderRadius: 3,
      borderWidth: 1,
    },
    text: {
      fontSize: 18,
      margin: 0
    }
  }

  const notification = useSelector(state => state.notification)

  return (
    <>
      {notification && (
        <div style={styles.notificationBorder}>
          <p style={styles.text}>{notification}</p>
        </div>
      )}
    </>
  )
}

export default Notification