import React, { useState } from "react";
import { useParams } from "react-router";
import productCategory from "../helpers/productCategory";
import ProductByCategory from "../components/ProductByCategory";

const ProductCategories = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetctData = async () => {
    const response = await fetch();

    const responseData = await response.json();

    setData(responseData?.data || []);
  };
  //  Product Category Page: {params.categoryName}
  return (
    <section className="container mx-auto p-4">
      {/**desktop */}
      <div className="hidden lg:grid grid-cols-[200px_1fr]">
        {/** left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none">
          {/**sort by */}
          <div className=" ">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1">
              Sort by
            </h3>

            <form className="'text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" id="sort-price" />
                <label htmlFor="sort-price">Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" id="sort-price-h" />
                <label htmlFor="sort-price-h">Price - High to Low</label>
              </div>
            </form>
          </div>

          {/**filter by */}
          <div className=" ">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1">
              Category
            </h3>

            <form className="'text-sm flex flex-col gap-2 py-2">
              {productCategory.map((category, index) => (
                <div className="flex gap-3" key={index}>
                  <input
                    type="checkbox"
                    name={"category"}
                    id={category?.value}
                  />
                  <label htmlFor={category?.value}>{category?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/** right side */}
        <div>
          {
            params?.categoryName && (

              <ProductByCategory
                category={params?.categoryName}
                heading={"Recommended Product"}
              />
            )
          }
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
