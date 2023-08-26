import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiCheckCircle, BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "../utils";
import SelectInput from "../components/SelectInput";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [filterOption, setFilterOption] = useState("ascending");

  const baseUrl = "http://localhost:5000/api/v1/tasks/";
  const access_token = getFromLocalStorage("token");

  const getTasks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setTasks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post(
        baseUrl,
        { name },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setName("");
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${baseUrl}/` + id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const filterTasks = async (filter) => {
    // SORT
    if (filter === "ascending" || filter === "descending") {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl}?sort=${filter}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setTasks(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      // FILTER COMPLETE TASKS AND UNCOMPLETED TASKS
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl}?completed=${filter}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setTasks(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    filterTasks(filterOption);
  }, [filterOption]);

  useEffect(() => {
    // get all users task
    getTasks();
  }, []);

  return (
    <>
      <form className="task-form" onSubmit={handleSubmit}>
        <h4>task manager</h4>
        <div className="form-control">
          <input
            type="text"
            name="name"
            className="task-input"
            placeholder="e.g. wash car"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit" className="btn submit-btn">
            submit
          </button>
        </div>
        <div className={`form-alert`}></div>
      </form>
      <section className="tasks-container">
        <div className="filter-container">
          <SelectInput
            setFilterOption={setFilterOption}
            filterOption={filterOption}
          />
        </div>
        {isLoading && <p className="loading-text">Loading...</p>}
        <div className="tasks">
          {tasks.length < 1 ? (
            <h5 className="empty-list">No tasks in your list</h5>
          ) : (
            <>
              {tasks?.tasks.map((task, index) => {
                const { completed, _id, name } = task;
                return (
                  <div
                    key={index}
                    className={`single-task ${completed && "task-completed"}`}
                  >
                    <h5>
                      <span>
                        {completed && <BiCheckCircle color="green" />}
                      </span>
                      {name}
                    </h5>
                    <div className="task-links">
                      {/* edit link */}
                      <Link to={"/task/" + _id} className="edit-link">
                        <BiSolidEdit color="green" />
                      </Link>
                      {/* delete btn */}
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => deleteTask(_id)}
                      >
                        <MdDelete color="red" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
