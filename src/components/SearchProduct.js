import React , { useState} from 'react'
import ProductService from "../services/product.service";
import EventBus from "../common/EventBus";
import Card from "./Card";

function SearchProduct() {

    const [key, setKey] = useState("");
    const [products, setProducts] = useState("");

    // var arr =0;

    const search = () =>{
        console.log("Search Button working ",key);
        ProductService.getProductByName(key)
        .then((response) =>{
            setProducts(response.data);
            console.log("products = " ,response.data);
            // arr = response.data.length
            console.log("Product length = ",products.length+ " "+response.data.length);
            // setKey("");
        },(error) => {
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
    
              setProducts(_content);
              console.log(products.length);
              console.log("Something happened");
            if (error.response && error.response.status === 401) {
              EventBus.dispatch("logout");
            }
          }

        )
    }

  return (
    <div>
        <div class="input-group">
        <div class="form-outline"> 
            <input type="search" id="form1" class="form-control" placeholder='Search' style={{width:"1000px"}} onChange={(e) =>{setKey(e.target.value)}}  />
        </div>
        { key &&
        <button type="button" class="btn btn-primary" onClick = {search} >
        {/* <i class="fa-regular fa-magnifying-glass" ></i> */}search
        </button>

}
    </div>
   
    
     {products && products.length > 0 && 
      products.map((product) =>{
       return  <Card 
              id={product._id}
              image={product.imgUrl}
              price={product.price}
              rating={product.rating}
              title={product.productName}
              description={product.productDescription}
              status={product.productStatus}
            />
      
      })} 

     {products.statusCode === 404 && <h1>No Product found</h1>}

    </div>
  )
}

export default SearchProduct
