import React, { useState, useEffect } from "react";
import "./todoList.css";
import icon from "../../src/images/icon.png";
import logout from "../../src/images/logout.png";
import uncheckedImage from "../../src/images/unchecked.png";
import checkedImage from "../../src/images/checked.png";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [reminder, setReminder] = useState("");
  const [email, setEmail] = useState(""); // New state for email
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }

    const interval = setInterval(checkReminders, 6000);

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, null, window.location.href);
    });
    return () => clearInterval(interval);
  }, []);

  const addTask = async () => {
    if (task === "" || email === "") {
      alert("You must write a task and provide an email!");
      return;
    } else {
      const newTask = { text: task, checked: false, reminder };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTask("");
      setReminder("");
      saveData(updatedTasks);

      if (reminder) {
        await sendReminderEmail(newTask);
      }
    }
  };

  const sendReminderEmail = async (newTask) => {
    try {
      const response = await fetch("http://localhost:5000/sendReminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          task: newTask.text,
          reminderTime: newTask.reminder,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      alert("Reminder email scheduled!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const toggleCheck = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, checked: !task.checked } : task
    );
    setTasks(updatedTasks);
    saveData(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveData(updatedTasks);
  };

  const saveData = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleLogout = () => {
    navigate("/");
  };

  const checkReminders = () => {
    const currentTime = new Date();
    tasks.forEach((task) => {
      if (task.reminder) {
        const reminderTime = new Date(task.reminder);
        if (reminderTime <= currentTime && !task.checked) {
          showNotification(task.text);
        }
      }
    });
  };

  const showNotification = (taskText) => {
    if (Notification.permission == "granted") {
      new Notification("Task Reminder", {
        body: `Reminder: ${taskText}`,
        icon: icon,
      });
    } else {
      alert(`Reminder: ${taskText}`);
    }
  };

  return (
    <div className="container">
      <div className="Todo-List">
        <h2>
          To-Do List
          <img src={icon} alt="icon" className="icon" />
          <img src={logout} alt="logout" id="logout" onClick={handleLogout} />
        </h2>
        <div className="row">
          <input
            type="text"
            id="input-box"
            placeholder="Add Your Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="datetime-local"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul id="list-container">
          {tasks.map((task, index) => (
            <li key={index} className={task.checked ? "checked" : ""}>
              <div
                className="circle"
                onClick={() => toggleCheck(index)}
                style={{
                  backgroundImage: `url(${
                    task.checked ? checkedImage : uncheckedImage
                  })`,
                }}
              />
              {task.text}
              {task.reminder && (
                <span>
                  (Reminder: {new Date(task.reminder).toLocaleString()})
                </span>
              )}
              <span onClick={() => deleteTask(index)}>&times;</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
