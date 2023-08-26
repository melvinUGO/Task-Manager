import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getFromLocalStorage } from "../utils";

const Task = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [saving, setSaving] = useState(false);

  const baseUrl = "http://localhost:5000/api/v1/tasks";
  const access_token = getFromLocalStorage("token");

  const getTask = async () => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setName(response.data.task.name);
      setChecked(response.data.task.completed);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      axios.patch(
        `${baseUrl}/${id}`,
        { name, completed: checked },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setSaving(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <>
      <div className="container">
        <form className="single-task-form">
          <h4>Edit Task</h4>
          <div className="form-control">
            <label>Task ID</label>
            <p className="task-edit-id">{id}</p>
          </div>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="task-edit-name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="completed">completed</label>
            <input
              type="checkbox"
              name="completed"
              className="task-edit-completed"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          </div>
          <button
            type="submit"
            className="block btn task-edit-btn"
            onClick={updateTask}
          >
            {saving ? "Loading..." : "edit"}
          </button>
          <div className="form-alert"></div>
        </form>
        <Link to={"/"} className="btn back-link">
          back to tasks
        </Link>
      </div>
    </>
  );
};

export default Task;
