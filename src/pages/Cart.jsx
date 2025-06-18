import React from "react";
import { useState } from "react";
import SummaryApi from "../service";
import { useEffect } from "react";
import { useContext } from "react";
import Context from "../context";
import displayUSDCurrency from "../helpers/DisplayCurrency"
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.countCartItems).fill(null);

  const fetchCartData = async () => {
    setIsLoading(true);
    const response = await fetch(SummaryApi.viewCartProduct.url, {
      method: SummaryApi.viewCartProduct.method,
      credentials: "include",
      headers: SummaryApi.viewCartProduct.headers,
    });

    const responseData = await response.json();
    setIsLoading(false)

    if (responseData.success) {
      setData(responseData?.data);
    }
  };

  const inCreaseQty = async(id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url,{
      method : SummaryApi.updateCartProduct.method,
      credentials : "include",
      headers : SummaryApi.updateCartProduct.headers,
      body : JSON.stringify({
        _id : id,
        quantity : qty + 1     
      })
    })

    const responseData = await response.json()
    
    if(responseData.success){
      fetchCartData()
    }
  }

  const decreaseQty = async(id, qty) => {
    if(qty >= 2){
      const response = await fetch(SummaryApi.updateCartProduct.url,{
      method : SummaryApi.updateCartProduct.method,
      credentials : "include",
      headers : SummaryApi.updateCartProduct.headers,
      body : JSON.stringify({
        _id : id,
        quantity : qty - 1     
      })
    })

    const responseData = await response.json()
    
    if(responseData.success){
      fetchCartData()   
     }
    }
  }

  const removeFromCart = async(id) => {
      const response = await fetch(SummaryApi.deleteCartProduct.url,{
      method : SummaryApi.deleteCartProduct.method,
      credentials : "include",
      headers : SummaryApi.deleteCartProduct.headers,
      body : JSON.stringify({
        _id : id,   
      })
    })

    const responseData = await response.json()
    
    if(responseData.success){
      fetchCartData()   
      context.fetchNumberOfProductInUserCart()
    }
}

const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue?.quantity,0)
const totalPrice = data.reduce((preve, currentValue)=> preve + (currentValue?.quantity * currentValue?.productId.sellingPrice),0)
  console.log("from cart", data);

  useEffect(() => {
    fetchCartData();
  }, []);
  return (
    <div className="lg:px-16">
      <div className="text-center text-lg py-3">
        {data.length === 0 && !isLoading && (
          <p className="bg-white py-5">Cart Is Empty</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/**view cart items */}
        <div className="w-full max-w-3xl">
          {isLoading ? (
            loadingCart.map((_, index) => (
              <div key={index} className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"></div>
            ))
          ) : (
              data?.map((product, index) => (
              <div key={index} className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px_1fr]">
                <div className="w-32 h-32 py-3 bg-slate-200">
                  <img src={product?.productId?.productImage[0]}  className="w-full h-full object-scale-down mix-blend-multiply"/>
                </div>

                <div className="px-4 p-2 relative">
                  {/** delete product */}
                  <div onClick={()=>removeFromCart(product?._id)} className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer">
                    <MdDelete />
                  </div>
                  <h2 className="text-md lg:text-lg text-ellipsis line-clamp-1">{product?.productId?.productName}</h2>
                  <p className="capitalize">{product?.productId?.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-red-600 font-medium text-md">{displayUSDCurrency(product?.productId?.sellingPrice)}</p>
                    <p className="text-slate-600 font-semibold text-md">{displayUSDCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                  </div>

                  <div className="flex items-center gap-3 mt-1">
                    <button onClick={()=>decreaseQty(product?._id, product?.quantity)} className="border border-red-600 text-red-600 hover:bg-red-600 cursor-pointer hover:text-white w-6 h-6 flex justify-center items-center">-</button>
                    <span>{product?.quantity}</span>
                    <button onClick={()=>inCreaseQty(product?._id, product?.quantity)} className="border border-red-600 text-red-600 hover:bg-red-600 cursor-pointer hover:text-white w-6 h-6 flex justify-center items-center">+</button>
                  </div>
                </div>
              </div>
            )))}
        </div>

        {/**cart summary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
              {
            isLoading ? (
                <div>
                    <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
                </div>
            ) : (
                <div className="h-36 bg-white">
                  <h2 className="text-white bg-black/85 px-4 py-1">Summary</h2>
                  <div className="flex items-center justify-between px-4 gap-2 font-medium text-medium text-slate-600">
                    <p>Quantity</p>
                    <p>{totalQty}</p>
                  </div>

                  <div className="flex items-center justify-between px-4 gap-2 font-medium text-medium text-slate-600">
                    <p>Total Price</p>
                    <p>{displayUSDCurrency(totalPrice)}</p>
                  </div>

                  <button className="bg-blue-600 p-2 text-white w-full">Payment</button>
                </div>
            )
        }
        </div>

      </div>
    </div>
  );
};

export default Cart;
