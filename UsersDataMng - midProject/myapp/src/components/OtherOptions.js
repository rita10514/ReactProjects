

import {useEffect,useState} from 'react'
import axios from 'axios'
import UsersComp from './Users'

function OtherOptionsComp(props) {

  const [showAddTodos,setShowAddTodos] = useState(false)
  const [showAddPosts,setShowAddPosts] = useState(false)
  const [todoInput,setTodoInput] = useState("")
  const [postInput,setPostInput] = useState({title: "", body: ""})

  const addTodo = () =>{
    let newTodo = {title : todoInput,
                  id: props.user.todos.length+1,
                  completed:false,
                  userId: props.user.id}
    props.addTodo(newTodo)
    props.setIsAllDone(false)
    setShowAddTodos(false)            
  }

  const addPost = () =>{
    let newPost = {title : postInput.title,
                  id: props.user.posts.length+1,
                  body:postInput.body,
                  userId: props.user.id}
    props.addPost(newPost)
    setShowAddPosts(false)
  
  }

  const MarkCompleted = (userId,todoId) => {
    props.updateCompleted(userId,todoId)
    props.setMarkedFlag(!props.markedFlag)
  }

  return (
    <div id="otherOptions">
            {!showAddTodos && <div>

                Todos: <input className="marginLeft" type="button" value="Add" onClick={() =>setShowAddTodos(true)} /><br/><br/>
                <div className="popUps">

                { props.user.todos.map(todo => {
                  return <div className="popUpItems" key={todo.id}>
                    Title: {todo.title}<br/>
                    Completed: {todo.completed.toString()}<br/>
                    {
                      !todo.completed && <input type="button" value="Mark Completed" onClick={() => MarkCompleted(todo.userId,todo.id)}/>
                    }
                  </div>
                })}
                
                </div><br/><br/>
            </div>}

            {
              showAddTodos && <div className="addWin" >
                Add Todo: <br/><br/>
                Title : <input type="text" onChange={(e) =>{setTodoInput(e.target.value)}}/><br/>
                <input className="btn" type="button" value="Cancle" onClick={() =>setShowAddTodos(false)}/>
                <input className="btn" type="button" value="Add" onClick={() =>{addTodo()}}/>
              </div>
            }

            {!showAddPosts && <div>
                Posts: <input className="marginLeft" type="button" value="Add" onClick={() => setShowAddPosts(true)} /><br/><br/>
                <div className="popUps">

                      { props.user.posts.map(post => {
                        return <div className="popUpItems" key={post.id}>
                          Title: {post.title}<br/>
                          Body: {post.body}<br/>
                        </div>
                      })}

                </div>
            </div>}

            {
              showAddPosts && <div className="addWin" >
                Add Post: <br/><br/>
                Title: <input type="text" onChange={(e) =>{setPostInput({...postInput,title:e.target.value})}} /><br/>
                Body: <input type="text" onChange={(e) =>{setPostInput({...postInput,body:e.target.value})}} /><br/>
                <input className="btn" type="button" value="Cancle" onClick={() => setShowAddPosts(false)}/>
                <input className="btn" type="button" value="Add" onClick={() =>{addPost()}}/>
              </div>
            }
    </div>
  );
}

export default OtherOptionsComp;
