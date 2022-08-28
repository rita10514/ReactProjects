import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import '../style.css'
import BuyAddProductComp from './BuyAddProduct'


function ProductComp(props) {

  const [customers,setCustomer] = useState([])

  useEffect(() => {
    setCustomer(props.product.customers)
  },[props.product.customers])

  
  return (
    <div style={{ width: "650px", margin: "0 auto" }}>
     
     <Card border="primary" className='mt-5' style={{ width: "650px" }}>
      <Card.Body>
        <Card.Title><Link to={"/productEdit/" + props.product.id}>{props.product.name}</Link><br/></Card.Title>
        <Card.Text>
          Price: {props.product.price}<br/>
          Purchased: {props.product.initQuantity - props.product.inStock}<br/>
          In Stock: {props.product.inStock}<br/>
        </Card.Text>
          {customers.length >0 && <h6>Customers that purchased this product:</h6>}
          {customers.length >0 && <div className="frame scroll" >
                {customers.map((customer,i) =>{
                  return <div className="frame" key={i}>
                  <Link to={"/customerEdit/" + customer.id}>{customer.fname + " " + customer.lname}</Link><br/>
                  Purchased Date: {customer.date}<br/><br/>
                  <BuyAddProductComp btnName="Add" customerId={customer.id} products={props.products}  />
                </div>
              })}
          </div>
            
          }
      </Card.Body>
    </Card>
    
    </div>
  );
}

export default ProductComp;
