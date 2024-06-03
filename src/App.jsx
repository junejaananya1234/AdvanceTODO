
import './App.css'
import Header from './Components/Header/Header'
import { ToastContainer } from 'react-toastify'
import Todos from './Components/Todos/Todos'
import { TodoProvider } from './Utils/TodoContext'

function App() {
 

  return (
    <>
    <TodoProvider>

      <Header></Header>
      <Todos></Todos>
    </TodoProvider>
    
    </>
  )
}

export default App
