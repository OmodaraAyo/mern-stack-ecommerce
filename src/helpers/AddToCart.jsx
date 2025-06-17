import { toast } from "react-toastify";
import SummaryApi from "../service";

const addToCart = async(e, id) => {
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(SummaryApi.addProductToCart.url, {
        method : SummaryApi.addProductToCart.method,
        credentials : "include",
        headers : SummaryApi.addProductToCart.headers,
        body : JSON.stringify({
            productId : id
        })
    })

    const responseData = await response.json();

    if(responseData.success){
        toast.success(responseData.message)
    }
    if(responseData.error){
        toast.error(responseData.message)
    }

    return responseData;
}

export default addToCart;