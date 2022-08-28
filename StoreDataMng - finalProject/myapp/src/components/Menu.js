import { useEffect } from 'react'
import {Route,Routes} from 'react-router-dom'

import {init} from '../store/storeDataSlice'

import ProductsComp from './Products'
import ProductComp from './Product'
import EditProductComp from './EditProduct'
import EditCustomerComp from './EditCustomer'
import CustomersComp from './Customers'
import PurchasesComp from './Purchases'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'

import { useDispatch } from 'react-redux'

import utils from '../utils'




function MenuComp(props) {

  const dispatch = useDispatch()

  useEffect(()=>{
   let data = utils.shapeData(props.allCustomers, props.allProducts, props.allPurchases)
   dispatch(init(data))
  },[props.allCustomers,props.allProducts,props.allPurchases])


  return (
    <div className="App">
        <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='m-auto' >
          <LinkContainer to="/"><Nav.Link>Products</Nav.Link></LinkContainer>
          <LinkContainer to="/customers"><Nav.Link>Customers</Nav.Link></LinkContainer>
          <LinkContainer to="/purchases"><Nav.Link>Purchases</Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

        <Routes>
          
          <Route path="/"  element={<ProductsComp/>}/>
          <Route path="/product"  element={<ProductComp/>}/>
          <Route path="/customerEdit/:id"  element={<EditCustomerComp/>}/>
          <Route path="/productEdit/:id"  element={<EditProductComp/>}/>
          <Route path="/customers"  element={<CustomersComp/>}/>
          <Route path="/purchases"  element={<PurchasesComp/>}/>

        </Routes>
    </div>
  );
}

export default MenuComp;
