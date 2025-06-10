import React from 'react'
import ProductCategoryList from '../components/ProductCategoryList'
import HeroProduct from '../components/HeroProduct'
import HorizontalProductCard from '../components/HorizontalProductCard'

const Home = () => {
  return (
    <div>
      <ProductCategoryList />
      <HeroProduct/>
      <HorizontalProductCard category={"airpodes"} heading={"Top's Airpods"}/>
      <HorizontalProductCard category={"watches"} heading={"Popular's Watches"}/>
    </div>
  )
}

export default Home
