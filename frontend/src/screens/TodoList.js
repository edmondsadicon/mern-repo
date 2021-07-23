import react, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, getTodos } from '../actions/todoActions'
import Loader from '../components/Loader.js'

const TodoList = () => {

    const dispatch = useDispatch()

    const {userInfo} = useSelector((state)=>state.userLogin)
    const [todoDescription, setTodoDescription] = useState('')
    const [todoUserId, setTodoUserId] = useState(userInfo._id)
    const { todoList } = useSelector((state)=>state.todoList) 
    const {addLoading} = useSelector((state)=>state.todoAdd)
    const {deleteLoading} = useSelector((state)=>state.todoDelete)
    const todoAddHandler =  async(e) => {
        e.preventDefault()
        if(todoUserId && todoDescription){
            await dispatch(addTodo({todoDescription, todoUserId}))
            setTodoDescription('')
        }
    }
    const todoDeleteHandler =  (id) => {
        console.log('Delete :', id)
        dispatch(deleteTodo(id))
    }
    const allTodo = todoList ? 
                    todoList.map((val,i)=>{
                        return (
                            <div className='row p-2' key={val._id}>
                                <p className='col'>{val.todoDescription} </p>
                                <div className='col-auto'>
                                    <button className='btn btn-danger btn-sm' onClick={()=>todoDeleteHandler(val._id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                    : <center>No List to show</center>


    useEffect(()=>{
        dispatch(getTodos())     
    }, [ dispatch, addLoading, deleteLoading])


    return (
        <div className="container">
            {deleteLoading && <Loader variant='danger' /> }
            <form onSubmit={todoAddHandler} >
                <input type="text" value={todoDescription} placeholder='write your activity here' className=' form-control' onChange={(e)=>setTodoDescription(e.target.value)} />
                <button type='submit' className='btn btn-sm btn-success'>{addLoading ? <Loader /> : 'Add Todo'}</button>
            </form> 
            <div>
                <h4>My List</h4>
                { allTodo }
            </div>
        </div>
    )
}

export default TodoList