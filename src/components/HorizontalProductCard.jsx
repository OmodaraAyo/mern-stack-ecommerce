import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import fetchProductCategories from "../helpers/fetchProductCategories";

const HorizontalProductCard = (props) => {
  const { category, heading } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const LoadingList = new Array(13).fill(null);

  const fetchData = async () => {
    setLoading(true);
    console.log("category from horizontal: ", category)
    const product = await fetchProductCategories(category);
    console.log(product);
    setData(product?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold py-2">{heading}</h2>
      {data.map((product, index) => (
        <div key={index} className="w-full min-w-[280px] md:min-w-[320px] h-36 max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md flex">
          <div className="bg-slate-200 h-full min-w-[120px] md:min-w-[145px]">
            <img src={product.productImage[0]} alt="" />
          </div>
          <div></div>
        </div>
      ))}
    </section>
  );
};

export default HorizontalProductCard;
