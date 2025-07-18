import PropTypes from 'prop-types'

const Notification = ({ message, color }) => {
  const styles = {
    backgroundColor: '#D3D3D3',
    borderColor: color,
    borderStyle: 'solid',
    borderWidth: '3px',
    borderRadius: '5px',
    color,
    fontSize: '1.25rem',
    padding: '0.5rem 1rem',
  }

  return <p style={styles}>{message}</p>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default Notification
