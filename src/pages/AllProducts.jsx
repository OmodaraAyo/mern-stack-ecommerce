import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../service";
import AdminProductCard from "../reusables/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  console.log("All products", allProducts);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await fetch(SummaryApi.getAllProduct.url, {
        method: SummaryApi.getAllProduct.method,
        headers: SummaryApi.getAllProduct.headers,
      });
      const dataResponse = await response.json();
      setAllProducts(dataResponse?.data || []);
      if (dataResponse.error) {
        console.error("Error fetching products: ", dataResponse.message);
      }
    };
    // Fetch all products when the component mounts

    fetchAllProducts();
  }, []);

  // Effect to handle body overflow when upload product modal is open
  useEffect(() => {
    if (openUploadProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openUploadProduct]);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All product</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer py-1 px-3 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/** Product list will be displayed here */}
      <div className="flex items-center gap-5 py-4">
        {allProducts.map((product, index) => (
          <AdminProductCard data={product} key={index} />
        ))}
      </div>

      {/**Upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} />
      )}
    </div>
  );
};

export default AllProducts;
