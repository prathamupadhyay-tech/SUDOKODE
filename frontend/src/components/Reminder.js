import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../css/reminder.css";
import axios from "axios";
import UserReminders from "./UserReminders";
import { Link } from "react-router-dom";
import AddRemider from "./AddReminders";
const Reminder = () => {
  const id = localStorage.getItem("userId");
  const [isDisabled, setisDisabled] = useState(false);
  const [isCrossed, setisCrossed] = useState(false);
  const [reminders, setreminders] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/reminders/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setreminders(data.message));
  }, []);

  // const [allreminders, setallreminders] = useState();
  // const sendRequest = async () => {
  //   const res = await axios
  //     .get("http://localhost:5000/api/reminders")
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return data;
  // };
  // useEffect(() => {
  //   sendRequest().then((data) => console.log(data));
  // });

  return (
    <>
      <div className="reminder-app">
        <div className="main-container">
          <div className="reminder-main-main-container">
            {reminders && reminders.length ? (
              reminders.map((reminder, index) => (
                <UserReminders
                  id={reminder._id}
                  ourUser={localStorage.getItem("Name")}
                  reminders={reminders}
                  setreminders={setreminders}
                  title={reminder.title}
                  difficulty={reminder.difficulty}
                  noofques={reminder.noofques}
                  time={reminder.time}
                  topic={reminder.topic}
                />
              ))
            ) : (
              <div>
                <h1 className="not_added_reminder_title">
                  Add a reminder now to get started !!!
                </h1>
              </div>
            )}
          </div>
          <div className="black-line-2"></div>

          <button
            className="add-reminder-btn"
            onClick={() => setisCrossed(true)}
          >
            Add reminder{" "}
          </button>
        </div>
      </div>
      {isCrossed && (
        <AddRemider
          setisCrossed={setisCrossed}
          reminders={reminders}
          setreminders={setreminders}
        ></AddRemider>
      )}
    </>
  );
};
export default Reminder;
