
import './App.css';
import {useEffect,useState} from 'react'
import axios from 'axios'
import UsersComp from './components/Users'

function App() {

  const [data,setData] = useState([])

  useEffect( () =>{
    const getData = async () => {
      let usersRes = await axios.get("https://jsonplaceholder.typicode.com/users")
      let users = usersRes.data
      let todosRes = await axios.get("https://jsonplaceholder.typicode.com/todos")
      let todos = todosRes.data
      let postsRes = await axios.get("https://jsonplaceholder.typicode.com/posts")
      let posts = postsRes.data

      users.forEach(user => {
        user["todos"] = todos.filter(todo => todo.userId == user.id)
        user["posts"] = posts.filter(post => post.userId == user.id)
      },[])
      setData(users)

    }
    getData()
  },[])


  return (
    <div  className="App">
      <UsersComp data={data} />
    </div>
  );
}

export default App;
