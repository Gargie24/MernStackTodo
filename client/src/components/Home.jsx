import React, { useEffect, useState } from "react";
import Header from "./partials/Header";
import Todo from "./partials/Todo";
import AddTodoModal from "./partials/AddTodoModal";
import { getToken } from "../services/api";
import { useNavigate } from "react-router-dom";
import { getTodoListApi } from "../services/api";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const navigation = useNavigate();
  const [completedList, setCompletedList] = useState([]);
  const [notCompletedList, setNotCompletedList] = useState([]);
  const [refreshList, setRefreshList] = useState();

  useEffect(() => {
    if (!getToken()) {
      navigation("/login");
    }
    fetchTodoList();
  }, [refreshList]);

  async function fetchTodoList() {
    const result = await getTodoListApi();
    console.log("todolist", result);
    if (result.status === 200 && result.data.status === 200) {
      const todos = result.data.data.todos;
      const completedTodos = todos.filter((todo) => todo.isCompleted);
      const notCompletedTodos = todos.filter((todo) => !todo.isCompleted);
      setCompletedList(completedTodos);
      setNotCompletedList(notCompletedTodos);
    }
  }

  const allTodosCompleted = notCompletedList.length === 0;

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="container">
        <h2>Completed Todos</h2>
        <div className="row justify-content-md-center mt-4">
          {completedList.map((todo) => (
            <Todo key={todo._id} {...todo} setRefreshList={setRefreshList} />
          ))}
        </div>
        {allTodosCompleted ? (
          <div className="motivational-message">
            <p>Hurray! You've completed all your tasks for the day.</p>
            {/* You can add more motivational content here */}
          </div>
        ) : (
          <div>
            <h2>Not Completed Todos</h2>
            <div className="row justify-content-md-center mt-4">
              {notCompletedList.map((todo) => (
                <Todo key={todo._id} {...todo} setRefreshList={setRefreshList} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        className=""
        style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
      >
        <AddTodoModal setRefreshList={setRefreshList} />
      </div>
    </div>
  );
}

export default Home;
