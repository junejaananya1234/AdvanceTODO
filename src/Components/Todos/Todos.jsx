import { useContext, useState } from "react";
import TodoContext from "../../Utils/TodoContext";
import { toast } from 'react-toastify';
import { FaStar, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Todos = () => {
    const { state, dispatch } = useContext(TodoContext);
    const [newTask, setNewTask] = useState("");
    const [editTask, setEditTask] = useState("");
    const [editingId, setEditingId] = useState(null);

    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            const newTodo = {
                id: state.todo.length + 1,
                task: newTask
            };
            dispatch({
                type: "ADD_TODO",
                payload: newTodo
            });
            setNewTask("");
            toast.success("Task added successfully!");
        }
    };

    const handleDelete = (id) => {
        dispatch({
            type: "DELETE_TODO",
            payload: id
        });
        toast.error("Task deleted successfully");
    };

    const handleEdit = (id, task) => {
        setEditingId(id);
        setEditTask(task);
    };

    const handleUpdateTask = () => {
        if (editTask.trim() !== "") {
            dispatch({
                type: "EDIT_TODO",
                payload: {
                    id: editingId,
                    task: editTask
                }
            });
            setEditingId(null);
            setEditTask("");
            toast.info("Task updated successfully!");
        }
    };

    const handleFav = (task) => {
        // Add functionality to handle favorite task here
        toast.info("Added to favorites");
    };

    return (
        <div className="h-[90%] w-[40%] containerTheme shadow-lg rounded-xl bg-white flex flex-col p-6 gap-4 items-start relative">
            <p className="text-3xl text-pink-500 font-semibold">Tasks</p>
            <div className="w-full flex flex-col h-[300px] overflow-y-auto">
                {
                    state.todo.map((ele) => (
                        <div className="flex w-[90%] items-center p-2 justify-between hover:bg-slate-900 text-gray-400 text-sm gap-2 transition-all rounded-lg hover:text-white cursor-pointer" key={ele.id}>
                            <div className="w-full flex gap-2">
                                <p>{ele.id}.</p>
                                <p>{ele.task}</p>
                            </div>
                            <div className="flex gap-4 text-sm">
                                <FaStar className="text-yellow-400 hover:scale-125 transition-all hover:text-yellow-300" onClick={() => handleFav(ele)} />
                                <FaPencilAlt className="hover:scale-125 transition-all" onClick={() => handleEdit(ele.id, ele.task)} />
                                <MdDelete className="text-rose-500 hover:scale-125 transition-all hover:text-rose-300" onClick={() => handleDelete(ele.id)} />
                            </div>
                        </div>
                    ))
                }
            </div>
            <Popup 
                trigger={<button className="text-white bg-black p-2 rounded-lg hover:bg-pink-800 transition-all absolute bottom-6 self-center">Add Task</button>} 
                modal
                nested
            >
                {close => (
                    <div className="bg-white p-6 rounded-lg shadow-lg border-0">
                        <button className="text-black float-right hover:scale-110 transition-all" onClick={close}>&times;</button>
                        <h2 className="text-black text-lg mb-4">Add New Task</h2>
                        <input 
                            type="text" 
                            value={newTask} 
                            onChange={(e) => setNewTask(e.target.value)} 
                            className="w-full p-2 rounded-lg mb-4 focus:outline-none text-sm text-black"
                            placeholder="Enter your task"
                        />
                        <button 
                            className="text-white bg-pink-800 p-2 rounded-lg hover:bg-pink-800 transition-all"
                            onClick={() => {
                                handleAddTask();
                                close();
                            }}
                        >
                            Add Task
                        </button>
                    </div>
                )}
            </Popup>
            <Popup 
                open={editingId !== null}
                onClose={() => setEditingId(null)}
                modal
                nested
            >
                {close => (
                    <div className="bg-white p-6 rounded-lg shadow-lg border-0">
                        <button className="text-black float-right hover:scale-110 transition-all" onClick={close}>&times;</button>
                        <h2 className="text-black text-lg mb-4">Edit Task</h2>
                        <input 
                            type="text" 
                            value={editTask} 
                            onChange={(e) => setEditTask(e.target.value)} 
                            className="w-full p-2 rounded-lg mb-4 focus:outline-none text-sm text-black"
                            placeholder="Edit your task"
                        />
                        <button 
                            className="text-white bg-pink-900 p-2 rounded-lg hover:bg-pink-800 transition-all"
                            onClick={() => {
                                handleUpdateTask();
                                close();
                            }}
                        >
                            Update Task
                        </button>
                    </div>
                )}
            </Popup>
        </div>
    );
};

export default Todos;
