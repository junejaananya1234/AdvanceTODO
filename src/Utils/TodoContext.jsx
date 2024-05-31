import { createContext } from "react";
import { useReducer } from "react";


const TodoContext = createContext();

const initialState = {
    todo : [],
}
const TodoReducer = (state, action)=>{
    switch(action.type){
        case "ADD_TODO" :
        return {
          ...state,
          todo : [...state.todo, action.payload],
        };
        case "DELETE_TODO" :
            return{
                ...state,
                todo : state.todo.filter(each => each.id !== action.payload)
            };
       case "EDIT_TODO" : 
       return {
        ...state,
        todo: state.todo.map(todo =>
            todo.id === action.payload.id ? { ...todo, task: action.payload.task } : todo
        ),
    };
    default :
     return state;

    }
}

export const TodoProvider = ({ children })=>{
const [state, dispatch] = useReducer(TodoReducer,initialState);
     return(
        <TodoContext.Provider value={{state, dispatch}}>
        {children}
        </TodoContext.Provider>
     )
}


export default TodoContext;