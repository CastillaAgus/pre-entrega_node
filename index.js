console.log(process.argv);

const args = process.argv.slice(2);

async function getProduct (url) {
    try {
        const response = await fetch(`https://fakestoreapi.com/${url}`) 
        const data = await response.json()
        return data
    
    }
    catch(error){
        console.log(error);
    }
}

 async function createProduct(product){
    try{
        const response = await fetch ("https://fakestoreapi.com/products", {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                   "Content-Type": "application/json"
            }
        });
              
        if (response.ok){
            const data = await response.json();
            console.log(data);
            console.log("ID del producto creado: ",data.id);
            return true;     
        } else {
             console.log("Error HTTP:", response.status);
             return false;
        }
    }
     catch(error){
        console.log(error);
    }
}

async function deleteProduct(product){
        try {
        const response = await fetch(`https://fakestoreapi.com/${product}`,{
            method: "DELETE"}
        ) 
    if (response.ok){
            return true;     
        } else {
             console.log("Error HTTP:", response.status);
             return false;
        }
    }
    catch(error){
        console.log(error);
    }
}

switch (args[0]){
    case "GET":
        console.log(args[0]);
        if (args[1] && args[1].startsWith("products")) {
            const products = await getProduct(args[1]); 
            console.log(products);
        }else{
            console.log("input incorrecto");
        }
        break;
    case "POST":
         console.log(args[0]);
        if (args[1] &&  args[2] &&  args[3] &&  args[4] && args[1].startsWith("products") ){
            const created = await createProduct ({title: args[2], price: Number(args[3]), category: args[4],})
           if (created){console.log("Producto creado! ")};
        }
            else{
                console.log("input incompleto");
            }
             break;
    case "DELETE":
        console.log(args[0]);
        if (args[1] && args[1].startsWith("products")  && args[1].length > 9) {
            const removed = await deleteProduct (args[1]); 
            if(removed){console.log("Producto Eliminado : ", removed)};
        }else{
            console.log("input incorrecto");
        }
        break;    
    default : 
        console.log("input incorrecto");     
} 
