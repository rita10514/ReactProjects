import {useNavigate, useParams, Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react';
import { setDoc,
doc, deleteDoc } from "firebase/firestore";
import db from "../firebase"

function EditCustomerComp() {

  let navigate = useNavigate();
  const customers = useSelector(state => state.storeData.customers)
  const purchases = useSelector(state => state.storeData.purchases)
  const params = useParams()
  const [custInput, setCustInput] = useState({products:[]})

  useEffect(()=>{
    let cust = customers.find(x => x.id == params.id)
    setCustInput(cust)
  },[customers])

  const save = async () => {
    const docRef = doc(db,"Customers", params.id)
    let payLoad = {fname: custInput.fname,
                  lname: custInput.lname,
                  city: custInput.city}
    await setDoc(docRef,payLoad) 
  }

  const remove = async () => {
    const docRef = doc(db,"Customers", params.id)
    navigate(-1)
    await deleteDoc(docRef)
    purchases.filter(x => x.customerId == params.id).forEach(async y => {
      await deleteDoc(doc(db,"Purchases", y.id))
    })
    
  }

  return (
    <div className="frame mx-auto" style={{ width: "400px" , height: "600px"}}>
     
     First Name: <input className="m-2 rounded" type="text" value={custInput.fname} 
     onChange={e => {setCustInput({...custInput,fname:e.target.value})}}/><br/>
     Last Name: <input className="m-2 rounded" type="text" value={custInput.lname} 
     onChange={e => {setCustInput({...custInput,lname:e.target.value})}}/><br/>
     City: <input className="m-2 rounded" type="text" value={custInput.city} 
     onChange={e => {setCustInput({...custInput,city:e.target.value})}}/><br/>

    <div className="frame">
        <h6>This customrt bought those products:</h6>

        <ul className=" scroll " style={{ width: "300px" , height: "170px"}}>
          {
            custInput.products.map((prod,i) => {
              return <li  className="mx-3" key={i}><Link to={"/productEdit/"+ prod.id}>{prod.name}</Link></li>
            }) 
          }
        </ul>
     </div>

     <div className="mx-auto" style={{ width: "fit-content" , height: "170px"}} >
        <Button className="mx-2 " variant="primary" onClick={()=>navigate(-1)}>Back</Button>
        <Button className="mx-2" variant="primary" onClick={()=>save()}>Save</Button>
        <Button className="mx-2" variant="primary" onClick={()=>remove()}>Delete</Button>
     </div>
    </div>
  );
}

export default EditCustomerComp;
