import React, { useState, useEffect } from "react";
import DeleteAll from "./DeleteAll.jsx";
import NoToDo from "./NoToDo.jsx";

const TodoList = () => {

//HOOKS

  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState([]);
  let [counter, setCounter] = useState(0);


//FETCH 

//RETRIEVE TASKS (GET)

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/heylga", {
      method: "GET",
    }).then((response) => {
      if (response.status === 404) {
        createUser("heylga");
      } else {
        getList("heylga");
      }
    });
  }, []);

  const getList = (user) => {
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTask(data), setCounter(counter + 1));
  };

  const createUser = (user) => {
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify([]),
    })
      .then((response) => response.json())
      .then((data) => setTask(data));
  };

//ADD/UPDATE AND STORE NEW TASK (PUT)

  const addTask = (text) => {
    console.log("text", text);
    let newTask = [...task, { label: text, done: false }];

    console.log("here you see the new tasks", newTask);

    fetch("https://assets.breatheco.de/apis/fake/todos/user/heylga", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setInputValue("");
        setTask(newTask);
        setCounter(counter + 1);
      });
  };


// ADDING TASK WHEN CLICKING ENTER KEY

  const handleKey = (event) => {
    if (event.key === "Enter" && inputValue !== " " && inputValue !== "") {
      addTask(inputValue);
      setCounter(counter + 1);
      setInputValue("");
    }
  };

// FUNCTION TO DELETE ONE ITEM

  const DeleteItems = (key) => {
    let newTask = task.filter((t, i) => i !== key);

    fetch("https://assets.breatheco.de/apis/fake/todos/user/heylga", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTask(newTask);
        setCounter(counter - 1);
      });
  };


// FUNCTION TO DELETE ALL ITEMS

  const deleteAll = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/heylga", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTask([]);
        setCounter(0);
      });
  };

// RETURN

  return (
    <>
      
      <div className="container-fluid justify-content-center">       
        <div className="justify-content-center TodoList">
            <h1 className="d-flex justify-content-center todo">ToDos</h1>
            <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">

          </div>
          <input
          className="todotodo text-center"
           onChange={(e) => setInputValue(e.target.value)}
            onKeyPressCapture={(e) => handleKey(e)}
            type="text"
            size="72.5"
            value={inputValue}
            placeholder="What's need to be done?"
          /> 
        <div className="col-lg-4"></div>
        </div>
          <div>
            <ul>
              {task.length > 0 &&
                task.map((t, key) => (
                  <li key={key} className="tasklist list-group-item index">
                    {t.label}
                    <button
                      className="btn DelItem"
                      onClick={() => DeleteItems(key)}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </li>
                ))}
                {/* <hr></hr> */}
             <div className="footer">
					 {/* <li className="list-group-item">
                {"" +
                  (counter === 0
                    ? "Currently there are no pending tasks"
                    : counter + " tasks left")}
               </li> */}
			{/*		<div className="list-group-item shadow bottom "></div>
					<div className="list-group-item shadow bottom-leaf"></div>
					<div className="list-group-item shadow bottom-last"></div> */}
				</div>
           
            </ul>
           
          </div>
          <div onClick={() => deleteAll()}>
            {counter === 0 ? <NoToDo /> : <DeleteAll />}{" "}
          </div>
        </div>
      </div>
  
    </>
  );
};
export default TodoList;
