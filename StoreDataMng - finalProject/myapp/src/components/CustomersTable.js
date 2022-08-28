import '../style.css'
import {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom'
import BuyAddProductComp from './BuyAddProduct';

function CustomersTableComp(props) {

  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() =>{
    setCustomers(props.customers)
    setProducts(props.products)
  })

  let productsNames = products.map(x=>({name: x.name, id: x.id, inStock: x.inStock}))

  return (
      <div className="scroll mx-75 ">
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Purchased Products</th> 
            </tr>
          </thead>
          <tbody>
            {customers.map((cust,i) =>{
              return <tr key={i}>
                  <td>{i}</td>
                  <td>{cust.lname +" " + cust.fname}</td>
                  <td><ul>{
                    cust.products.map((prod,i) => {
                      return <li key={i}>{<Link to={"/productEdit/" + prod.id}>{prod.name}</Link>}  {" " + prod.date} </li>
                    })
                    }</ul></td>
                    {props.showBuy && <td><BuyAddProductComp btnName="buy" customerId={cust.id} 
                    products={productsNames} /></td> }
                </tr>
              })
            }
          </tbody>
        </Table>
      </div>
  );
}

export default CustomersTableComp;
