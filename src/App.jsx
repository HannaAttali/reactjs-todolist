import { useState ,useEffect} from "react"
import TodoInput from "./components/Todoinput"
import Todolist from "./components/Todolist"

function App() {
  
const [todos, setTodos] = useState([])
const [todoValue, setTodoValue] = useState('')
function presistData(newList) {
  localStorage.setItem('todos', JSON.stringify({todos:newList}))  
}

/**
 * Adds a new todo item to the list of todos.
 *
 * @param {Object} newtodo - The new todo item to be added.
 */
function addTodo (newtodo){
  setTodos([...todos, newtodo])
  presistData([...todos, newtodo])
}

/**
 * Deletes a todo item from the list based on the provided index.
 *
 * @param {number} params - The index of the todo item to be deleted.
 */
function deleteTodo(params) {
  setTodos(todos.filter((todo, index) => index !== params))
  presistData(todos.filter((todo, index) => index !== params))
}

function editTodo(index) {
const valueToBoEdited = todos[index]
setTodoValue(valueToBoEdited)
deleteTodo(index)
}
useEffect(() => {
  if (!localStorage)
    return
  const localTodos = localStorage.getItem('todos')
  if (!localTodos)
    return
  setTodos(JSON.parse(localTodos).todos)
    
}, [])

  return (
    <>
        <TodoInput todoValue={todoValue} setTodoValue = {setTodoValue} addTodo = {addTodo} />
        <Todolist editTodo = {editTodo} deleteTodo ={deleteTodo}  todos = {todos} />
    </>
  )
}

export default App
