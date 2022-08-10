
import '../style.css'
import {useEffect,useState} from 'react'
import UserComp from './User'

function UsersComp(props) {

  const [users,setUsers] = useState([])
  const [searchInput,setSearchInput] = useState([])
  const [showAddUserWin,setShowAddUserWin] = useState(false)
  const [inputName,setInputName] = useState("")
  const [inputEmail,setInputEmail] = useState("")
  const [selectedId,setSelectedId] = useState("")

  const updateUsersTodo = (userId,todoId,newTodo) => {
    let userIndex = users.findIndex(x => x.id == userId)
    let user = users[userIndex]
    let todoIndex = user.todos.findIndex(x => x.id == todoId)
    user.totos[todoIndex] = newTodo
    users[userIndex] = user
    setUsers(users)
  }
  const updateUsersPost = (userId,postId,newPost) => {
    let userIndex = users.findIndex(x => x.id == userId)
    let user = users[userIndex]
    let postIndex = user.posts.findIndex(x => x.id == postId)
    user.posts[postIndex] = newPost
    users[userIndex] = user
    setUsers(users)
  }

  const updateUsersData = (userId,newData) => {
    let updated = users
    let userIndex = updated.findIndex(x => x.id == userId)
    updated[userIndex] = {...updated[userIndex] ,
       address: newData.address,name:newData.name,email:newData.email}
    console.log(updated[userIndex])
    setUsers(updated)
  }

  const updateCompleted = (userId,todoId) => {
    let updated = users
    let userIndex = updated.findIndex(x => x.id == userId)
    let user = updated[userIndex]
    let todoIndex = user.todos.findIndex(x => x.id == todoId)
    updated[userIndex].todos[todoIndex].completed = true
    setUsers(updated)
  }

  const deleteUser = (id) => {
    let updated = users.filter(x => x.id != id)
    setUsers(updated)
  }

  const checkisAllDone = (todos) => {
    let ans = true
    todos.forEach(x => {
      if(!x.completed) {
        ans = false
      }
    })
    return ans
  }

  const addUser = (obj) => {
    obj.address = {street:"",city:"", zipcode:""}
    obj.id= (users.length+1).toString()
    obj.todos = []
    obj.posts = []
    let updated = [...users, obj]
    setUsers(updated)
  }

  const addTodo = (newTodo) => {
    let updated = users
    let userIndex = updated.findIndex(x => x.id == newTodo.userId)
    let user = updated[userIndex]
    user.todos.push(newTodo)
    updated[userIndex] = user
    setUsers(updated)
  }

  const addPost = (newPost) => {
    let updated = users
    let userIndex = updated.findIndex(x => x.id == newPost.userId)
    let user = updated[userIndex]
    user.posts.push(newPost)
    updated[userIndex] = user
    setUsers(updated)
  }

  useEffect(() => {
    setUsers(props.data)
  },[props.data])


  let visbleUsers = []
  searchInput.length == 0 ? visbleUsers=users : 
  visbleUsers = users.filter(x => x.name.includes(searchInput) || x.email.includes(searchInput))



  return (
    <div id="wrapper">
      Search: <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      <input className="btn" type="button" value="Add" 
      onClick={()=>{setShowAddUserWin(true);setSelectedId("")}}/>
      <div className=" usersComp" >
          {
            
              visbleUsers.map(user => {
              return <UserComp key = {user.id} user={user} updateUsersTodo={updateUsersTodo}
              updateUsersPost={updateUsersPost} updateUsersData={updateUsersData} 
              deleteUser={deleteUser} checkisAllDone={checkisAllDone} setSelectedId={setSelectedId}
              isSelected={user.id == selectedId ? true : false}
              setShowAddUserWin={setShowAddUserWin} updateCompleted={updateCompleted} addTodo={addTodo}
              addPost={addPost}
              />
            })
            
          }
      </div>
      {
        showAddUserWin && <div  id="addUser">
          Name: <input type="text" onChange={(e)=>setInputName(e.target.value)}/> <br/>
          Email: <input type="text" onChange={(e)=>setInputEmail(e.target.value)}/> <br/>

          <input type="button" value="cancle" className="btn" onClick={()=>setShowAddUserWin(false)}/>
          <input type="button" value="Add" className="btn" 
          onClick={()=>addUser({name:inputName,email:inputEmail})}/>
        </div>
      }
    </div>
  );
}

export default UsersComp;
