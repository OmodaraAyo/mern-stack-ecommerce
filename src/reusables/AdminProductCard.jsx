import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from "../components/AdminEditProduct";
import displayUSDCurrency from "../helpers/DisplayCurrency";

const AdminProductCard = (props) => {
  const { data, fetchData } = props;
  const [editProduct, setEditProduct] = useState(false);

  useEffect(() => {
    if (editProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editProduct]);

  return (
    <div className="bg-white p-4 rounded-lg w-[12rem] shadow-md flex flex-col items-center gap-2">
      <div className="w-[9.30rem]">
        <div className="w-32 h-32 flex items-center justify-center">
          <img
            src={data?.productImage[0]}
            alt={data.productName}
            width={120}
            height={120}
            className="mx-auto object-fill h-full"
          />
        </div>
        <div className="h-14 mt-3">
          <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
          <p className="font-semibold">
            {displayUSDCurrency(data?.sellingPrice)}
          </p>
        </div>

        <div>
          <div
            className="w-fit ml-auto p-2 hover:bg-green-600 bg-green-100 rounded-full hover:text-white cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEdit />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          data={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
