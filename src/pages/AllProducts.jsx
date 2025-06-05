import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  useEffect(() => {
    if(openUploadProduct){
      document.body.style.overflow = "hidden";
    } else{
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
        <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer py-1 px-3 rounded-full" onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/**Upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)}/>
      )}
    </div>
  );
};

export default AllProducts;
