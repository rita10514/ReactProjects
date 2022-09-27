
import { useSelector, useDispatch } from 'react-redux'


const shapeData = (allCustomers,allProducts,allPurchases) => {
        
  // C - custom
  
      let customersC = allCustomers.map(x => ({...x, products:[]}))
      let productsC = allProducts.map(x => ({...x, customers:[]}))
      
      allPurchases.forEach((pu,i) => {
      
      let prodIndex = allProducts.findIndex(x => x.id == pu.productId)
      let custIndex = allCustomers.findIndex(x => x.id == pu.customerId)
      
      if(prodIndex > -1 && custIndex > -1){
        
        let prod = {...allProducts[prodIndex],date : pu.date}
        customersC[custIndex].products.push(prod)
      
        let cust = {...allCustomers[custIndex],date : pu.date}
        productsC[prodIndex].customers.push(cust)
      }
    
      });
      let data = {customers: customersC, products: productsC, purchases: allPurchases}
      
      
      return data
    
  
}

export default {shapeData}