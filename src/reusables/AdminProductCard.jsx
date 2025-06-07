import React from "react";
import { MdModeEdit } from "react-icons/md";

const AdminProductCard = (props) => {
  const { data, key } = props;
  return (
    <div key={key} className="bg-white p-4 rounded">
      <img
        src={data?.productImage[0]}
        alt={data.productName}
        width={120}
        height={120}
        />
        <h1>{data.productName}</h1>

        <div className="w-fit ml-auto p-2 bg-green-600">
          <MdModeEdit/>
        </div>
    </div>
  );
};

export default AdminProductCard;
