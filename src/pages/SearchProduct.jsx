import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SummaryApi from "../service";
import VerticalSearchProductCard from "../reusables/VerticalSearchProductCard";

const SearchProduct = () => {
  const query = useLocation();
  console.log("search query", query.search);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProduct = async () => {
    setIsLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search);
    console.log("response from search", response);
    const responseData = await response.json();
    setIsLoading(false);
    console.log("responseData from search", responseData);
    setData(Array.isArray(responseData.data) ? responseData.data : [])
  };

  useEffect(() => {
    fetchProduct();
  }, [query.search]);
  return (
    <div className="container mx-auto p-4">
      {isLoading && <p className="text-lg text-center">Loading...</p>}

      <p className="text-md font-semibold py-3">Search Result : {Array.isArray(data) ? data.length : 0}</p>
      
      {Array.isArray(data) && data.length === 0 && !isLoading && (
        <p className="bg-white text-lg text-center p-4">No Data found</p>
      )}

      {
        Array.isArray(data) && data.length !== 0 && !isLoading && (
          <VerticalSearchProductCard loading={ isLoading } data={data}/>
        )
      }
    </div>
  );
};

export default SearchProduct;
