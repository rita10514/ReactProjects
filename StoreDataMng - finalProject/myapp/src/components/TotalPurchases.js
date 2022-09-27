import {useSelector} from 'react-redux'
import Card from 'react-bootstrap/Card';


function TotalPurchasesComp() {

  const total = useSelector(state=>state.storeData.purchases.length)


  return (
    <div className="App">
           <Card border="primary" className='mx-auto  mt-4 text-center' style={{ width: "300px" }}>
              <Card.Body className="py-1">
                <Card.Title className="mb-0" >Total Purchases: {total} </Card.Title>
              </Card.Body>
           </Card>
    </div>
  );
}

export default TotalPurchasesComp;
