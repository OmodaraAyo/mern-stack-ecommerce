import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import productCategory from "../helpers/productCategory";
import VerticalSearchProductCard from "../reusables/VerticalSearchProductCard";
import SummaryApi from "../service";

const ProductCategories = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListInArray = urlSearch.getAll("category")
    const urlCategoryListObject = {}
  urlCategoryListInArray.forEach(el => {
    urlCategoryListObject[el] = true
  })
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [fileteredCategoryList, setFilteredCategoryList] = useState([])

  const fetchData = useCallback(async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers : SummaryApi.filterProduct.headers,
      body : JSON.stringify({
        category : fileteredCategoryList
      })
    });

    const responseData = await response.json();

    setData(responseData?.data || []);
  }, [fileteredCategoryList]);

  const handleSelectedCategories = (e) => {
    const { name, value, checked } = e.target

    setSelectCategory((preve)=>{
      return {
        ...preve,
        [value] : checked
      }
    })
  }

  useEffect(()=>{
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if(selectCategory[categoryKeyName]){
        return categoryKeyName
      }
      return null
    }).filter(el => el)

    setFilteredCategoryList(arrayOfCategory)

    const urlFormat = arrayOfCategory.map(el => `category=${el}`).join('&');
    navigate("/product-category?"+urlFormat)
  }, [selectCategory])
  
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <section className="container mx-auto p-4">
      {/**desktop */}
      <div className="hidden lg:grid grid-cols-[200px_1fr] gap-2">
        {/** left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none">
          {/**sort by */}
          <div className=" ">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1">
              Sort by
            </h3>

            <form className="'text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" id="sort-price" />
                <label htmlFor="sort-price">Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" id="sort-price-h" />
                <label htmlFor="sort-price-h">Price - High to Low</label>
              </div>
            </form>
          </div>

          {/**filter by */}
          <div className=" ">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1">
              Category
            </h3>

            <form className="'text-sm flex flex-col gap-2 py-2">
              {productCategory.map((category, index) => (
                <div className="flex gap-3" key={index}>
                  <input
                    type="checkbox"
                    name={"category"}
                    id={category?.value}
                    value={category?.value}
                    checked={!!selectCategory[category?.value]}
                    onChange={handleSelectedCategories}
                  />
                  <label htmlFor={category?.value}>{category?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/** right side */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-base mb-2">Search Results : {data?.length}</p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none max-h-[calc(100vh-120px)]">
            {
            data?.length !== 0 && !isLoading && (
              <VerticalSearchProductCard data={data} loading={isLoading}/>
            )
          }
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
