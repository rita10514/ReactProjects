import {useNavigate, useParams, Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react';
import { setDoc,
doc, deleteDoc } from "firebase/firestore";
import db from "../firebase"

function EditProductComp() {

  let navigate = useNavigate();
  const products = useSelector(state => state.storeData.products)
  const purchases = useSelector(state => state.storeData.purchases)
  const params = useParams()
  const [prodInput, setProdInput] = useState({customers: []})

  useEffect(()=>{
    let prod = products.find(x => x.id == params.id)
    setProdInput(prod)
  },[products,params])

  const save = async () => {
    const docRef = doc(db,"Products", params.id)
    let payLoad = {name: prodInput.name,
                  price: prodInput.price,
                  initQuantity: prodInput.initQuantity,
                  inStock : prodInput.inStock}
    await setDoc(docRef,payLoad) 
  }

  const remove = async () => {
    const docRef = doc(db,"Products", params.id)
    navigate(-1)
    await deleteDoc(docRef)
    purchases.filter(x => x.productId == params.id).forEach(async y => {
      await deleteDoc(doc(db,"Purchases", y.id))
    })
  }

  return (
    <div className="frame mx-auto" style={{ width: "400px" , height: "600px"}}>
     
     Name: <input className="m-2 rounded" type="text" value={prodInput.name} 
     onChange={e => {setProdInput({...prodInput, name: e.target.value})}}/><br/>

     Price: <input className="m-2 rounded" type="number" value={prodInput.price} 
     onChange={e => {setProdInput({...prodInput, price: e.target.value})}}/><br/>

     Initial Quantity: <input className="m-2 rounded" type="number" value={prodInput.initQuantity} 
     onChange={e => {setProdInput({...prodInput, initQuantity: e.target.value})}}/><br/>

     In Stock: <input className="m-2 rounded" type="number" value={prodInput.inStock} 
     onChange={e => {setProdInput({...prodInput, inStock: e.target.value})}}/><br/><br/>

     <div className="frame">
        <h6>Customers that purchased this product:</h6>
        {/* {
          prodInput.customers[0].lname
        } */}

        <ul className=" scroll " style={{ width: "300px" , height: "170px"}}>
          {
            prodInput.customers.map((cust,i) => {
              return <li  className="mx-3" key={i}><Link to={"/customerEdit/"+ cust.id}>{cust.fname + " " + cust.lname}</Link></li>
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

export default EditProductComp;
