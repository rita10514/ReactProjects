import {  useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { collection, updateDoc, doc, addDoc, increment } from "firebase/firestore";
import db from "../firebase"


function BuyAddProductComp(props) {


  const [addBtn,setAddBtn] = useState(false)
  const [productInput,setProductInput] = useState("")

  useEffect(()=>{
    setProductInput(props.products[0].id)
  },[])

  const save = async (prodId,customId) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;


    const collectionRef = collection(db,"Purchases");
    const payloud = {
                      customerId: customId,
                      productId: prodId,
                      date:today
                    }
    await addDoc(collectionRef,payloud)                
    const docRef = doc(db,"Products" , prodId )
    await updateDoc(docRef, {inStock: increment(-1)} )
    
  }

  return (
    <div >
      <Button  variant="primary" onClick={(e)=>{setAddBtn(!addBtn)}}>{props.btnName}</Button>
      {
        addBtn && <div className="frame popUp ">
          <div >
            <select className="rounded" onChange={(e)=>{setProductInput(e.target.value)}} name="products" id="products2">
              {props.products.map(x=>{
                return <option key={x.id} disabled={x.inStock > 0 ? false : true} 
                value={x.id}>{x.name}{x.inStock > 0 ? "" : " - Out Of Stock"}</option>
              })}
            </select><br/><br/>
          </div>
          
          <Button  variant="primary" onClick={()=>{save(productInput,props.customerId)}}>Save</Button>
        </div> 
      }
    </div>
  );
}

export default BuyAddProductComp;
