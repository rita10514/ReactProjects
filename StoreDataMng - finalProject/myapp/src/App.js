import MenuComp from './components/Menu'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore";
import db from "./firebase"
function App() {

  const [allCustomers,setAllCustomers] = useState([])
  const [allProducts,setAllProducts] = useState([])
  const [allPurchases,setAllPurchases] = useState([])

  const initiate = () => {

    const CustomersRef = collection(db,"Customers")
    onSnapshot(CustomersRef,(snapCust)=>{
      setAllCustomers(snapCust.docs.map(doc => ({...doc.data(),id:doc.id})))
      
    })

    const PurchasesRef = collection(db,"Purchases")
    onSnapshot(PurchasesRef,(snapPurch)=>{
      setAllPurchases(snapPurch.docs.map(doc => ({...doc.data(),id:doc.id})))
      
    })
    
    const ProductsRef = collection(db,"Products")
    onSnapshot( ProductsRef,(snapProd)=>{
      setAllProducts(snapProd.docs.map(doc => ({...doc.data(),id:doc.id})))
      
    })
    
    return true
}

useEffect(()=>{
  initiate()
},[])


  return (
    <div className="App">
      <MenuComp allCustomers={allCustomers} allProducts={allProducts} allPurchases={allPurchases} />
    </div>
  );
}

export default App;
