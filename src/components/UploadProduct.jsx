import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../service";
import { toast } from "react-toastify";

const UploadProduct = ({
    onClose,
    fetchData
}) => {
    const [data, setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage :  [],
        description : "",
        price : "",
        sellingPrice : ""
    })

    const [openFullScreen, setOpenFullScreen] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState(null);


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const handleUploadProductImage = async (e) => {
        const files = Array.from(e.target.files);
        const uploadedImages = await Promise.all(files.map(file => uploadImage(file)));

        setData((prev)=> {
            return {
                ...prev,
                productImage: [...prev.productImage, ...uploadedImages.map(res => res.url)]
            }
        })

    }

    const handleDeleteProductImage = async (index)=>  {
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)
        setData((prev)=> {
            return {
                ...prev,
                productImage: [...newProductImage]
            }
        })
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(SummaryApi.uploadProduct.url, {
            method: SummaryApi.uploadProduct.method,
            credentials: "include",
            headers: SummaryApi.uploadProduct.headers,
            body: JSON.stringify(data)
        })
        const responseData = await response.json();
    
        if(responseData.success) {
            toast.success(responseData?.message || "Product uploaded successfully");
            onClose();
            fetchData(); // Fetch updated product list after upload
        }
        else {
            alert(responseData?.message || "Something went wrong");
        }

    }
  return (
    <div className="fixed bg-black/40 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white px-4 pt-4 pb-10 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        
            <div className="flex justify-between items-center pb-3">
                <h2 className="font-bold text-lg">Upload Product</h2>
                <div className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer" onClick={onClose}>
                    <IoMdClose />
                </div>
            </div>

            <form className="grid px-4 py-10 gap-3 overflow-y-scroll h-full" onSubmit={handleSubmit}>
                <label htmlFor="productName">Product Name :</label>
                <input type="text" id='productName' placeholder="enter product name" name="productName" value={data.productName} onChange={handleOnChange} className="p-2 bg-slate-100 border rounded" required/>

                <label htmlFor="brandName">Brand Name :</label>
                <input type="text" id='brandName' placeholder="enter brand name" name="brandName" value={data.brandName} onChange={handleOnChange} className="p-2 bg-slate-100 border rounded" required/>

                <label htmlFor="category">Category :</label>
                <select required value={data.category} name="category" id="category" onChange={handleOnChange} className="p-2 bg-slate-100 border rounded">
                    <option value={""} disabled>Select Category</option>
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
                            <input type="file" name="productImage" id="uploadImageInput" className="hidden" onChange={handleUploadProductImage} multiple/>
                        </div>
                    </div>
                </label>
                <div>
                    {
                        data?.productImage[0] ? (
                        <div className="flex items-center gap-2 flex-wrap">{
                                data.productImage.map((image, index)=> (
                           <div className="relative group" key={index}>
                             <img 
                                src={image} width={80} height={80} 
                                className="bg-slate-100 border cursor-pointer" 
                                alt="image" 
                                onClick={() => {
                                    setOpenFullScreen(true);
                                    setFullScreenImage(image);
                                }}/> 
                                
                                <div className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full cursor-pointer hidden group-hover:block" onClick={()=> handleDeleteProductImage(index)}>
                                    <MdDelete/>
                                </div>
                           </div>
                        ))}
                        </div>
                    ):(
                            <p className="text-red-600 text-xs">*Please upload Product Image</p>
                        )
                    }
                </div>
                <label htmlFor="price">Price :</label>
                <input type="number" id='price' placeholder="enter price" name="price" value={data.price} onChange={handleOnChange} className="p-2 bg-slate-100 border rounded" onWheel={(e) => e.target.blur()} required/>

                <label htmlFor="sellingPrice">Selling Price :</label>
                <input type="number" id='sellingPrice' placeholder="enter selling price" name="sellingPrice" value={data.sellingPrice} onChange={handleOnChange} className="p-2 bg-slate-100 border rounded" onWheel={(e) => e.target.blur()} required/>

                <label htmlFor="description">Description :</label>
                <textarea id="description" className="h-28 bg-slate-100 border resize-none p-1" rows={3} placeholder="enter product description" onChange={handleOnChange} value={data.description} name="description" autoComplete="on" required></textarea>

                <button type="submit" className="px-3 py-2 bg-red-600 text-white hover:bg-red-700 cursor-pointer">Upload Product</button>
            </form>
        </div>

        {/** Display uploaded images on full screen */}
        {openFullScreen && (
            <DisplayImage
                imageUrl={fullScreenImage}
                onClose={() => setOpenFullScreen(false)}
            />
        )}
    </div>
  );
};

export default UploadProduct;

