
import {useEffect,useState} from 'react'
import '../style.css'
import OtherOptionsComp from './OtherOptions'

function Users(props) {

  const [showOtherData,setShowOtherData] = useState(false)
  const [inputName,setInputName] = useState(props.user.name)
  const [inputEmail,setInputEmail] = useState(props.user.email)
  const [inputAddress,setInputAddress] = useState({street: props.user.address.street,
    city: props.user.address.city, zipcode: props.user.address.zipcode})
  const [isAllDone,setIsAllDone] = useState(false)
  const [markedFlag,setMarkedFlag] = useState(false)
 
 

  useEffect(()=>{
    setIsAllDone(props.checkisAllDone(props.user.todos))
  },[isAllDone,markedFlag])

  return (
    <div className="userComp" style ={{borderColor: isAllDone ? 'green' : 'red',
    backgroundColor: props.isSelected? '#f7d4a8' : 'white' }} >
     <div className="divLikeButton" 
     onClick={() => {props.setSelectedId(props.user.id);props.setShowAddUserWin(false)}}>
      ID: {props.user.id}</div><br/><br/> 

     Name: <input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)}/> <br/>
     Email: <input type="text" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} /><br/><br/>

     <div className="divLikeButton" onMouseOver=
     {() => setShowOtherData(true)} onClick ={()=> setShowOtherData(false)}>Other Data</div><br/> 
      {
        showOtherData &&  <div  >
        <br/>
        Street: <input type="text" value={inputAddress.street} onChange = 
        {((e)=> setInputAddress({...inputAddress,street: e.target.value}))}/> <br/>
  
        City: <input type="text" value={inputAddress.city} onChange = 
        {((e)=> setInputAddress({...inputAddress,city: e.target.value}))}/> <br/>
  
        Zip Code: <input type="text" value={inputAddress.zipcode} onChange = 
        {((e)=> setInputAddress({...inputAddress,zipcode: e.target.value}))}/> <br/> <br/>
  
      </div>
      }

      <input className="btn" type="button" value="update" onClick={() =>
       props.updateUsersData(props.user.id,{name:inputName,email:inputEmail,address:inputAddress})} />

      <input className="btn" type="button" value="delete" onClick={() => props.deleteUser(props.user.id)}/> 
      <br/><br/>

      {
       props.isSelected && <OtherOptionsComp user={props.user} updateUsersPost={props.updateUsersData} 
        updateUsersTodo= {props.updateUsersTodo} updateCompleted={props.updateCompleted} 
        markedFlag={markedFlag} setMarkedFlag={setMarkedFlag} addTodo={props.addTodo} addPost={props.addPost}
        setIsAllDone={setIsAllDone}
         />
      } 

    </div>
  );
}

export default Users;
