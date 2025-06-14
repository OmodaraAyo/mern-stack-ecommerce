import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import SummaryApi from "../service";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import displayUSDCurrency from "../helpers/DisplayCurrency";

const Productdetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState(null);
  const [zoom, setZoom] = useState({ active: false, x: 0, y: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      const response = await fetch(SummaryApi.getProductDetails.url, {
        method: SummaryApi.getProductDetails.method,
        headers: SummaryApi.getProductDetails.headers,
        body: JSON.stringify({
          productId: params?.id,
        }),
      });

      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data?.productImage[0]);
      setIsLoading(false);
    };
    fetchProductDetails();
  }, [params?.id]);

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleZoomImage = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setZoom({ active: true, x, y });
  };

  const handleZoomOutImage = () => setZoom((z) => ({ ...z, active: false }));

  return (
    <section className="container mx-auto p-4 ">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* product image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 rounded relative">
            <img
              ref={imageRef}
              src={activeImage}
              alt={"image" + activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleZoomOutImage}
            />

            {/* product zoom */}
            {zoom.active && (
              <div className="hidden lg:block absolute overflow-hidden min-w-[500px] min-h-[500px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full mix-blend-multiply min-h-[500px] min-w-[500px] scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoom.x * 100}% ${zoom.y * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {isLoading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full animate-pulse">
                {productImageListLoading?.map((_, index) => (
                  <div key={index} className="h-20 w-20 bg-slate-200 rounded"></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data.productImage?.map((imageUrl, index) => (
                  <div key={index} className="h-20 w-20 bg-slate-200 rounded p-1">
                    <img
                      src={imageUrl}
                      alt={imageUrl}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imageUrl)}
                      onClick={() => handleMouseEnterProduct(imageUrl)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* product details */}
        {isLoading ? (
          <div className="flex flex-col gap-1 animate-pulse">
            <div className="h-6 w-32 bg-slate-200 rounded mb-2"></div>
            <div className="h-8 w-48 bg-slate-200 rounded mb-2"></div>
            <div className="h-4 w-24 bg-slate-300 rounded mb-2"></div>
            <div className="h-6 w-40 bg-slate-200 rounded mb-2"></div>
            <div className="h-10 w-60 bg-slate-300 rounded mb-2"></div>
            <div className="h-20 w-full bg-slate-200 rounded mb-2"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-3xl font-medium">{data?.productName}</h2>
            <p className="capitalize text-slate-400">{data?.category}</p>

            <div className="text-yellow-300 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>

            <div className="flex items-center gap-2 text-xl lg:text-2xl font-medium py-1">
              <p className="text-red-600">{displayUSDCurrency(data?.sellingPrice)}</p>
              <p className="text-slate-400 line-through">{displayUSDCurrency(data?.price)}</p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] cursor-pointer text-red-600 font-medium hover:bg-red-600 hover:text-white transition-all ease-in-out">
                Buy
              </button>
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] cursor-pointer font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white transition-all ease-in-out">
                Add To Cart
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description : </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Productdetails;