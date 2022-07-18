import React, { useState, useEffect } from "react";

const TodoList = () => {

    // HOOKS


    const [inputMessage, setInputMessage] = useState("");
    const [task, setTask] = useState([]);
    const [counter, setCounter] = useState(0);
  

    // FETCH

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
            setInputMessage("");
            setTask(newTask);
            setCounter(counter + 1);
          });
      };

    // ADDING TASK WHEN CLICKING ENTER KEY

    const handleKey = (event) => {
        if (event.key === "Enter" && inputMessage !== " " && inputMessage !== "") {
                addTask(inputMessage);
                setCounter(counter + 1);
                inputMessage("");
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

    return (
        <div className="ToDo">

            <div className="container-fluid justify-content-center">

                <h1 className="text-center mt-5"> ToDo List </h1>

                <form className="d-flex justify-content-center">

                    <input 
                    className="list-group-item w-25 fs-4 py-3 shadow p-3"
                    type="text"
                    size="72.5"
                    placeholder="What's need to be done?"
                    onChange={(e) => setInputMessage(e.target.value)}
                    value={inputMessage}
                    onKeyPressCapture={(e) => handleKey(e)}
                    />

                </form>


                <ul className="todo-list list-group ">
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

				<div className="footer">
					<li className="taskLeft d-flex justify-content-center list-group-item">
						<h5>{task.length} item left</h5>
					</li>
					<div className="list-group-item shadow bottom "></div>
					<div className="list-group-item shadow bottom-leaf"></div>
					<div className="list-group-item shadow bottom-last"></div>
				</div>
			</ul>

            </div>

        </div>
    )
};
export default TodoList;
