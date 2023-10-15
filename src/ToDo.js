import React, { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id, title) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getRemainingTasks = () => tasks.filter((task) => !task.completed);

  return (
    <div
      className={`hero "bg-gray-100 h-screen md:min-h-[700px]  w-full m-auto flex flex-col items-center mt-14 `}
    >
      <div
        className={`flex flex-col space-y-6 w-[600px] md:w-[100%] z-10 p-4 text-black`}
      >
        <div className=" w-full flex items-center justify-center">
          <h1 className=" uppercase text-4xl font-bold text-white tracking-widest mb-4 md:text-3xl">
            {/* Task Manager */}
            TODO List
          </h1>
        </div>
        <div className=" shadow-md">
          <AddTaskForm onAddTask={addTask} />
        </div>

        <div
          className={`scroll  bg-white
           w-full h-[400px] md:h-[500px] px-2 overflow-y-scroll rounded-md shadow-lg relative `}
        >
          <div
            className={`w-full overflow-hidden mb- sticky top-0  "bg-white"
             flex items-center justify-center text-gray-500 border-b`}
          >
            <p className=" text-black px-2 py-3">
              {getRemainingTasks().length} tasks left{" "}
            </p>
          </div>

          {tasks.length ? (
            <TaskList
              tasks={tasks}
              onEditTask={editTask}
              onDeleteTask={deleteTask}
              onToggleCompleted={toggleCompleted}
            />
          ) : (
            <div className=" w-full h-[80%] flex items-center justify-center overflow-hidden">
              <p className=" text-gray-500 text-center z-10">Empty task</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;