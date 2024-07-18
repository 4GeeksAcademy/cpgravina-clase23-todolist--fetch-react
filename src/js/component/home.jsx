import React, { useState, useEffect } from "react";

const Home = () => {
  const [newEntry, setNewEntry] = useState("");
  const [toDoList, setToDoList] = useState([]);

  const onChangeHandler = (e) => {
    const newListItem = e.target.value;
    setNewEntry(newListItem);
  };

  const onSubmitHandler = (e) => {
    console.log("funciona");
    e.preventDefault();
    createUserToDoList(newEntry);
    setNewEntry("");
  };

  useEffect(() => {
    getToDoList();
  }, []);

  const getToDoList = () => {
    const protocol = "https";
    const baseUrl = "playground.4geeks.com/todo";
    const path = "/users/cpgravina";
    const fullUrl = `${protocol}://${baseUrl}${path}`;
    fetch(fullUrl)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          createUser();
        } else return response.json();
      })
      .then((data) => {
        console.log(data);

        setToDoList(data.todos);
      })
      .catch((error) => {
        console.log("The user has not been found", error);
      });
  };

  const createUser = () => {
    const protocol = "https";
    const baseUrl = "playground.4geeks.com/todo";
    const path = "/users/cpgravina";
    const fullUrl = `${protocol}://${baseUrl}${path}`;
    fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        getToDoList();
      })
      .catch((error) => {
        console.log("The user has not been created", error);
      });
  };

  const createUserToDoList = (newEntry) => {
    const protocol = "https";
    const baseUrl = "playground.4geeks.com/todo";
    const path = "/todos/cpgravina";
    const fullUrl = `${protocol}://${baseUrl}${path}`;
    fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: newEntry,
        is_done: false,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        getToDoList();
      })
      .catch((error) => {
        console.log("The todo list has not been found", error);
      });
  };

  const deleteToDo = (id) => {
    console.log(id);
    const protocol = "https";
    const baseUrl = "playground.4geeks.com/todo";
    const path = "/todos";
    const fullUrl = `${protocol}://${baseUrl}${path}/${id}`;
    fetch(fullUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        getToDoList();
      })
      .catch((error) => {
        console.log("The todo list has not been found", error);
      });
  };

  return (
    <div className="container-sm">
      <h1 className="ps-3 d-flex justify-content-center fw-lighter">Todos</h1>
      <div className="m-auto" style={{ width: "40rem" }}>
        <form onSubmit={onSubmitHandler}>
          <input
            onChange={onChangeHandler}
            value={newEntry}
            type="text"
            className="form-control ps-0 fs-1 fw-lighter bg-white ps-3"
            id="to-do"
            placeholder="What needs to be done?"
          ></input>
        </form>
        <ol className="ps-0">
          {toDoList.map((toDo, index) => (
            <li
              className="d-flex justify-content-between border border-light-subtle p-3"
              style={{ height: "4rem" }}
              key={index}
            >
              {toDo.label}
              <button
                className="d-flex justify-content-end bg-white border-0 delete-button"
                onClick={() => deleteToDo(toDo.id)}
              >
                <i className="fa-solid fa-x bg-white"></i>
              </button>
            </li>
          ))}
        </ol>
        <p className="align-items-end ps-3">
          {toDoList.length > 0
            ? toDoList.length + " item(s) left"
            : "Please add a new task"}
        </p>
      </div>
    </div>
  );
};

export default Home;
