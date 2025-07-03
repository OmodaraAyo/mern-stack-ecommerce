import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import fetchProductCategories from "../helpers/fetchProductCategories";
import displayUSDCurrency from "../helpers/DisplayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRef } from "react";
import { Link } from "react-router-dom";
import addToCart from "../helpers/AddToCart";
import { useContext } from "react";
import Context from "../context";

const VerticalProductCard = (props) => {
  const { category, heading } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const LoadingList = new Array(13).fill(null);
  const scrollElement = useRef();
  const { fetchNumberOfProductInUserCart } = useContext(Context);
    
      const handleAddToCart = async(e, id) => {
        await addToCart(e, id)
        fetchNumberOfProductInUserCart()
  }

  const fetchData = async () => {
    setLoading(true);
    const product = await fetchProductCategories(category);
    setData(product?.data || []);
    setLoading(false);
  };


  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollRight += 300
  }

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }


  return (
    <section className="container mx-auto p-4 relative">
      <h2 className="text-2xl font-semibold py-2">{heading}</h2>
      <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all" ref={scrollElement}>
        <button onClick={scrollLeft} className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block cursor-pointer"><FaAngleLeft/></button>            
        <button onClick={scrollRight} className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block cursor-pointer"><FaAngleRight/></button>  
        {loading
          ? LoadingList.map((_, index) => (
              <div key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md animate-pulse">
                <div className="bg-slate-200 h-48 min-w-[280px] md:min-w-[145px] p-4 rounded-sm flex justify-center items-center">
                  <div className="bg-gray-300 h-32 w-32 rounded" />
                </div>
                <div className="p-4 grid gap-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="flex gap-3">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link to={"product/"+product?._id} key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md ">
                <div className="bg-slate-200 h-48 min-w-[280px] md:min-w-[145px] p-4 rounded-sm flex justify-center items-center">
                  <img src={product.productImage[0]} alt={product.productName} className="object-scale-down h-full mix-blend-multiply hover:scale-110 transition-all cursor-pointer"/>
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
                  <p className="capitalize">{product?.category}</p>
                  <div className="flex gap-3">
                      <p className="text-red-600 font-medium">{displayUSDCurrency(product?.sellingPrice)}</p>
                      <p className="text-slate-400 line-through">{displayUSDCurrency(product?.price)}</p>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-full cursor-pointer transition-all transform duration-300 ease-in-out" onClick={(e) => handleAddToCart(e, product?._id)}>Add to cart</button>
                </div>
              </Link>
            ))
        }
      </div>
    </section>
  );
};

export default VerticalProductCard;
