function handleFormSubmit(event)
{
    event.preventDefault();
    let productData={
        price:event.target.price.value,
        pname:event.target.pname.value,
    
    }
    axios.post('https://crudcrud.com/api/0d7e460112574539858584a586659404/product/', productData)
    .then((result) => {displayUserOnScreen(result.data) 
        total();
     }).catch((err) => {
      console.log(err)
    });
  
   
  
    document.getElementById("price").value="";
    document.getElementById("pname").value="";

}

function displayUserOnScreen(productData)
{
    const ulist=document.querySelector("ul");
    const productItem=document.createElement("li");
    const child=`${productData.price}-${productData.pname} <button id="del">Delete Product</button>`;
    productItem.innerHTML=child;
    ulist.appendChild(productItem);

    // console.log(productData);

    // const totalPriceOfProduct = 0;
    // productData.forEach((item,i)=>{
    //     totalPriceOfProduct+=item.price;
    // })
    
    // const count = document.getElementById("count");
    // count.appendChild(totalPriceOfProduct);




    const dbtn=productItem.querySelector("#del")
    dbtn.addEventListener("click",function(){
    // debugger
    axios.delete(`https://crudcrud.com/api/0d7e460112574539858584a586659404/product/${productData._id}`)
    .then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
    dbtn.parentElement.remove();
    
    
})
}

function total(totalPriceOfProduct){

    //console.log(totalPriceOfProduct)
    
         const count = document.getElementById("count");
    
      count.innerText = totalPriceOfProduct;
    
    }


    window.addEventListener("DOMContentLoaded",function(){
        var reqURL=`https://crudcrud.com/api/0d7e460112574539858584a586659404/product`
        axios.get(`${reqURL}`)
        .then((result) => {
            let totalPrice =0;
            for(let i=0;i<result.data.length;i++){
                // console.log(result.data[i])
    
                displayUserOnScreen(result.data[i])
                totalPrice+=Number(result.data[i].price);
                total(totalPrice)
    
               
            }
        }).catch((err) => {
        console.log(err)
      });
    })

