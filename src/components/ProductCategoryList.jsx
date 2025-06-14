import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import SummaryApi from "../service";
import { Link } from "react-router-dom";

const ProductCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const categoryLoading = new Array(13).fill(null);

  const fetchProductCategories = async () => {
    const response = await fetch(SummaryApi.getProductCategories.url);
    const data = await response.json();
    setLoading(false);
    if (data.success) {
      setCategories(data.data);
    } else {
      console.error("Failed to fetch product categories: ", data.message);
    }
  };

  useEffect(() => {
    fetchProductCategories();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-between gap-2 overflow-scroll scrollbar-none p-2">
        {loading ? (
          <>
          {
            categoryLoading.map((_, index) => (
                <div key={index} className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center shadow-md animate-pulse hover:cursor-progress"></div>
            ))
          }
          </>
        ) : (
          categories.map((product, index) => (
            <Link to={"/product-category/" + product?.category} key={index} className="cursor-pointer ">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center shadow-md">
                <img
                  src={product?.productImage[0]}
                  alt={product.name || ""}
                  className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all duration-300 ease-in-out"
                />
              </div>
              <p className="text-center text-sm md:text-base capitalize">
                {product?.category}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCategoryList;
