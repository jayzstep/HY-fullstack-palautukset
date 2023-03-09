const notificationStyle = {
    color: 'red',
    background: 'lightgrey'
}
const Notification = ({ message }) => (
    <h1 style={notificationStyle}>{message}</h1>
)

export default Notification