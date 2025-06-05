import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";

const UploadProduct = ({
    onClose
}) => {
    const [data, setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage :  [],
        description : "",
        price : "",
        selling : ""
    })

    const [uploadProductImageInput, setUploadProductImageInput] = useState()

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const handleUploadProductImage = async (e) => {
        const file = e.target.files[0]
        setUploadProductImageInput(file.name)
        const response = await uploadImage(file)
        console.log('file', file)

        setData((preve)=> {
            return {
                ...preve,
                productImage: [...preve.productImage, response.url]
            }
        })

        console.log('upload Image', response.url)
    }

  return (
    <div className="fixed bg-black/40 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        
            <div className="flex justify-between items-center pb-3">
                <h2 className="font-bold text-lg">Upload Product</h2>
                <div className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer" onClick={onClose}>
                    <IoMdClose />
                </div>
            </div>

            <form className="grid px-4 py-10 gap-3 overflow-y-scroll h-full">
                <label htmlFor="productName">Product Name :</label>
                <input type="text" id='productName' placeholder="enter product name" name="productName" value={data.productName} onChange={handleOnChange} className="p-2 bg-slate-100 border rounded"/>

                <label htmlFor="brandName">Brand Name :</label>
                <input type="text" id='brandName' placeholder="enter brand name" name="brandName" value={data.brandName} onChange={handleOnChange} className="p-2 bg-slate-100 border rounded"/>

                <label htmlFor="category">Category :</label>
                <select value={data.category} id="category" onChange={handleOnChange} className="p-2 bg-slate-100 border rounded">
                    {
                        productCategory.map((data, index)=>(
                            <option key={index} value={data.value}>{data.label}</option>
                        ))
                    }
                </select>

                <label htmlFor="uploadImageInput">
                    <span>Product Image :</span>
                    <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center flex-col gap-2 cursor-pointer">
                        <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                            <span className="text-3xl"><FaCloudUploadAlt /></span>
                            <p className="text-sm">Upload Product Image</p>
                            <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProductImage}/>
                        </div>
                    </div>
                </label>
                <div>
                    {
                        data?.productImage[0] ? (
                        <div className="flex items-center gap-2 flex-wrap">{
                                data.productImage.map((image, index)=> (
                            <img key={`product-image-${index}`} src={image} width={80} height={80} className="bg-slate-100 border" alt="image"/> 
                        ))}
                        </div>
                    ):(
                            <p className="text-red-600 text-xs">*Please upload Product Image</p>
                        )
                    }
                </div>

                <button className="px-3 py-2 bg-red-600 text-white hover:bg-red-700">Upload Product</button>
            </form>

        </div>
    </div>
  );
};

export default UploadProduct;
