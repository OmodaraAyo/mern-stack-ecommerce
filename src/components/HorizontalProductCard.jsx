import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import fetchProductCategories from "../helpers/fetchProductCategories";
import displayUSDCurrency from "../helpers/DisplayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRef } from "react";
import { Link } from "react-router-dom";
import addToCart from "../helpers/AddToCart";

const HorizontalProductCard = (props) => {
  const { category, heading } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const LoadingList = new Array(13).fill(null);
  const [scroll, setIsScroll] = useState(0);
  const scrollElement = useRef();

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
    scrollElement.current.scrollLeft += 300
  }

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }


  return (
    <section className="container mx-auto p-4 relative">
      <h2 className="text-2xl font-semibold py-2">{heading}</h2>
      <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all" ref={scrollElement}>
        <button onClick={scrollLeft} className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block cursor-pointer"><FaAngleLeft/></button>            
        <button onClick={scrollRight} className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block cursor-pointer"><FaAngleRight/></button>  
        { loading ? ( 
        LoadingList.map((_, index) => (
        <div key={index} className="w-full min-w-[280px] md:min-w-[320px] h-36 max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md flex animate-pulse">
          <div className="bg-slate-200 h-full min-w-[120px] md:min-w-[145px] p-4 rounded">
          </div>
          <div className="p-4 grid gap-2 w-full">
            <h2 className="font-medium text-base text-ellipsis line-clamp-1 text-black bg-slate-200 rounded"></h2>
            <p className="capitalize p-1 bg-slate-300 rounded"></p>
            <div className="flex gap-3 w-full">
                <p className="font-medium p-1 bg-slate-200 w-full rounded"></p>
                <p className="text-slate-400 line-through p-1 bg-slate-200 w-full rounded"></p>
            </div>
            <button className="text-white text-sm px-3 py-1 rounded-full cursor-pointer transition-all transform duration-300 ease-in-out w-full bg-slate-200 "></button>
          </div>
        </div>
      ))
        ) : (
          data.map((product, index) => (
        <Link to={"product/"+product?._id} key={index} className="w-full min-w-[280px] md:min-w-[320px] h-36 max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md flex">
          <div className="bg-slate-200 h-full min-w-[120px] md:min-w-[145px] p-4 rounded-sm">
            <img src={product.productImage[0]} alt={product.productName} className="object-scale-down h-full mix-blend-multiply hover:scale-110 transition-all cursor-pointer"/>
          </div>
          <div className="p-4 grid gap-1">
            <h2 className="font-medium text-base text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
            <p className="capitalize">{product?.category}</p>
            <div className="flex gap-3">
                <p className="text-red-600 font-medium">{displayUSDCurrency(product?.sellingPrice)}</p>
                <p className="text-slate-400 line-through">{displayUSDCurrency(product?.price)}</p>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-full cursor-pointer transition-all transform duration-300 ease-in-out" onClick={(e) => addToCart(e, product?._id)}>Add to cart</button>
          </div>
        </Link>
      ))
        )}
      </div>
    </section>
  );
};

export default HorizontalProductCard;
