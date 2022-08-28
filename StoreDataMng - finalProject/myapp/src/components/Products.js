import ProductComp from "./Product";
import { useSelector} from 'react-redux'
import TotalPurchasesComp from "./TotalPurchases"
function ProductsComp() {

  
  let products = useSelector(state => state.storeData.products)

  let productsNames = products.map(x=>({name: x.name, id: x.id, inStock: x.inStock}))

  return (
    <div>
      <TotalPurchasesComp/>
      
      <div  style={{ width: "750px" }} className="frame scroll" >
      <h1 className="text-center" >Products</h1>
          {
            products.map(doc => {
              return <ProductComp key={doc.id} product = {doc} products={productsNames} />
            })
          }
      </div>
    </div>
  );
}

export default ProductsComp;
