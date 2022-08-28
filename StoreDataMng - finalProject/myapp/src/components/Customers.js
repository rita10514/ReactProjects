import {useSelector} from 'react-redux'
import {useEffect} from 'react'
import CustomersTableComp from "./CustomersTable";

function CustomersComp() {

  const customers = useSelector(state => state.storeData.customers)
  const products = useSelector(state => state.storeData.products)
  useEffect(()=>{
    
  },[])

  return (
    <div className="frame">
      <h1>Customers</h1>
      <CustomersTableComp customers={customers} products={products} showBuy={true} />
    </div>
  );
}

export default CustomersComp;
