/* eslint-disable react/prop-types */
const Notification = ({ message, isAnError }) => {
  const notificationStyleGreen = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const notificationStyleRed = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }

  return <div style={isAnError ? notificationStyleRed : notificationStyleGreen}>{message}</div>;
};

export default Notification;
