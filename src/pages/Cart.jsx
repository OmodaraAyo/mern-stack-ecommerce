import React from "react";
import { useState } from "react";
import SummaryApi from "../service";
import { useEffect } from "react";
import { useContext } from "react";
import Context from "../context";

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
    // setIsLoading(false)

    if (responseData.success) {
      setData(responseData?.data);
    }
  };

  console.log("from cart", data);

  useEffect(() => {
    fetchCartData();
  }, []);
  return (
    <div>
      <div className="text-center text-lg py-3">
        {data.length === 0 && !isLoading && (
          <p className="bg-white py-5">Cart Is Empty</p>
        )}
      </div>

      <div>
        {/**view cart items */}
        <div className="w-full max-w-3xl">
          {isLoading ? (
            loadingCart.map((_, index) => (
              <div key={index} className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"></div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      {/**cart summary */}
        <div className="mt-5 lg:mt-0">
              {
            isLoading ? (
                <div>
                    <div className="h-36 bg-slate-300">Total</div>
                </div>
            ) : (
                <><div className="h-36 bg-slate-300">Total</div></>
            )
        }
        </div>
    </div>
  );
};

export default Cart;
