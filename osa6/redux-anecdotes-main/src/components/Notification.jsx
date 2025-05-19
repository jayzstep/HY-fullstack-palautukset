import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../reducers/notificationReducer";
import { useEffect } from "react";

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(({ notification }) => {
    return notification;
  });
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  useEffect(() => {
    if (notification !== "") {
      const timer = setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  return (
  <div>
      {(notification !=="") && <div style={style}>{notification}</div>}
    </div>
  )
};

export default Notification;
