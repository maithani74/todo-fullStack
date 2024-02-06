import React, { useEffect, useState } from "react";
import axios from "axios";
import './todo.css'
const Todo = () => {
  const [todos, setTodos] = useState({});
  const [newTask, setNewTask] = useState("");
  const [updated, setUpdated] = useState("");
  const [yes, setYes] = useState(0);
  const [id, setId] = useState();
  let tasks;

  const createTodos = async () => {
    try {
      if (!yes) {
        const newTodo = await axios.post("http://localhost:8080/create", {
          task: newTask,
        });
      } else {
        const newTodo = await axios.put(`http://localhost:8080/update/${id}`, {
          task: newTask,
        });
      }
      getAllTodos();
      setNewTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTodos = async () => {
    try {
      tasks = await axios.get("http://localhost:8080/read");
      setTodos(tasks);
      if (tasks?.success) {
        console.log("Success");
      }
      console.log(todos?.data?.tasks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTodos();
  }, [tasks]);

  const handleDelete = async (id) => {
    try {
      const task = await axios.delete(`http://localhost:8080/delete/${id}`);
      getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (t) => {
    setYes(1);
    setNewTask(t.task);
    setId(t._id);
  };

  return (
    <>
      <div className="container text-center">
        <h1>MY TODOS</h1>
        <div className="about">
          <input
            type="text"
            name="Add"
            id=""
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add Something"
          />
          <button className="btn btn-primary" onClick={createTodos}> Save</button>
        </div>
        {todos?.data?.tasks?.map((t) => (
          <>
              <hr style={{width:"700px", marginLeft:"300px"}} />
            <div className="tasks">
              <h5>{t.task}</h5>
              <div className="buttons">

              <button className="btn btn-primary" onClick={() => handleUpdate(t)}>
                Update
              </button>
              <button className="btn btn-danger m-1" onClick={() => handleDelete(t._id)}>
                DELETE
              </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Todo;
