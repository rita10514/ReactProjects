import Button from 'react-bootstrap/Button';
import '../style.css'
import {useSelector} from 'react-redux'
import CustomersTableComp from "./CustomersTable";
import {useEffect, useState} from 'react'
function PurchasesComp() {

  const customers = useSelector(state => state.storeData.customers)
  const products = useSelector(state => state.storeData.products)

  const [searchRes,setSearchRes] = useState([])

  useEffect(()=>{
    setSearchRes(customers)
  },[customers])

  const [productInput,setProductInput] = useState("All")
  const [customerInput,setcustomerInput] = useState("All")
  const [inputDate,setInputDate] = useState("")

  const search = () => {
    let res = customers
    let tamp = inputDate.split("-")
    let date = tamp[2] + "/" + tamp[1] + "/" +tamp[0]
    
    if(customerInput != "All"){

      res = customers.filter(x => x.id == customerInput)
      if(productInput != "All"){
        res[0] = {...res[0], products: res[0].products.filter(x => x.id == productInput)} 
      }
      if(inputDate != ""){
        res[0] = {...res[0], products: res[0].products.filter(x => x.date == date)} 
      }
      setSearchRes(res)
    }
    else{
      if(productInput != "All"){
        res = res.map(x=>({...x, products: x.products.filter(x => x.id == productInput)})); 
      }
      if(inputDate != ""){
        res = res.map(x=>({...x, products: x.products.filter(x => x.date == date)}));
      }
      res = res.filter(x => x.products.length > 0)
      setSearchRes(res)
    }
    
  }

  return (
    <div className="frame ">
      <h1>Purchases</h1>

      <select className="rounded lg m-3 py-1 " onChange={(e)=>{setcustomerInput(e.target.value)}} name="customers" id="customer1">
              <option value="All">All</option>
              {customers.map(x=>{
                return <option key={x.id} value={x.id}>{x.fname +" "+ x.lname}</option>
              })}
      </select>

      <select className="rounded lg m-3 py-1 " onChange={(e)=>{setProductInput(e.target.value)}} name="products" id="products1">
              <option value="All">All</option>
              {products.map(x=>{
                return <option key={x.id} disabled={x.inStock > 0 ? false : true} 
                value={x.id}>{x.name}{x.inStock > 0 ? "" : " - Out Of Stock"}</option>
              })}
      </select>

      <input className="rounded lg m-3" id="date" placeholder="dd-mm-yyyy" type="date" onChange={(e) => setInputDate(e.target.value)} />
      <Button className="m-3" size="sm" variant="secondary" onClick={() => search()}>search</Button>        
      <CustomersTableComp customers={searchRes} products={products} showBuy={false}/>

    </div>
  );
}

export default PurchasesComp;
