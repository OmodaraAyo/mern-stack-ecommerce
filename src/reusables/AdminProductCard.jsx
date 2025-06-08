import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from "../components/AdminEditProduct";

const AdminProductCard = (props) => {
  const { data, key } = props;
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div key={key} className="bg-white p-4 rounded">
      <img
        src={data?.productImage[0]}
        alt={data.productName}
        width={120}
        height={120}
        />
        <h1>{data.productName}</h1>

        <div className="w-fit ml-auto p-2 hover:bg-green-600 bg-green-100 rounded-full hover:text-white cursor-pointer" onClick={() => setEditProduct(true)}>
          <MdModeEdit/>
        </div>

        {
          editProduct && (
            <AdminEditProduct
              data={data}
              onClose={() => setEditProduct(false)}
            />
          )
        }
    </div>
  );
};

export default AdminProductCard;
