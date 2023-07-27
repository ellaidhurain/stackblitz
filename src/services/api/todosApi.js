import axios from "axios";

const todoApi = axios.create({
    baseURL:" http://localhost:3000"
})

export const getTodos = async() =>{
    const res = await todoApi.get("/todos")
    return res.data
}

export const addTodo = async (todo) =>{
    const res = await todoApi.post(`/todos/`, todo)
    return res.data
}

export const updateTodo = async (todo) =>{
    const res = await todoApi.patch(`/todos/${todo.id}`, todo)
    return res.data
}

export const deleteTodo = async ({id}) =>{
    const res = await todoApi.delete(`/todos/${id}`, )
    return res.data
}

export default todoApi;