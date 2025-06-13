import React from 'react'
import ProductCategoryList from '../components/ProductCategoryList'
import HeroProduct from '../components/HeroProduct'
import HorizontalProductCard from '../components/HorizontalProductCard'
import VerticalProductCard from '../components/VerticalProductCard'

const Home = () => {
  return (
    <div>
      <ProductCategoryList />
      <HeroProduct/>
      <HorizontalProductCard category={"airpodes"} heading={"Top's Airpods"}/>
      <HorizontalProductCard category={"watches"} heading={"Popular's Watches"}/>
      <VerticalProductCard category={"mobiles"} heading={"Mobiles"}/>
      <VerticalProductCard category={"mouse"} heading={"Mouse"}/>
      <VerticalProductCard category={"televisions"} heading={"Televisions"}/>
      <VerticalProductCard category={"camera"} heading={"Camera & Photography"}/>
      <VerticalProductCard category={"earphones"} heading={"Earphones"}/>
      <VerticalProductCard category={"speakers"} heading={"Speakers"}/>
      <VerticalProductCard category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalProductCard category={"trimmers"} heading={"Trimmers"}/>
      
    </div>
  )
}

export default Home
