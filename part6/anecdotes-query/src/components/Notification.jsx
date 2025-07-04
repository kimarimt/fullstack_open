import { useNotificationValue } from "./NotificationContext"

const Notification = () => {
  const notification = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 20
  }

  return (
    <>
      {notification && <div style={style}>{notification}</div>}
    </>
  )
}

export default Notification
