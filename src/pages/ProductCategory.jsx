import React from 'react'
import { useParams } from 'react-router'

const ProductCategory = () => {
    const params = useParams()
  return (
    <div>
      Product Category Page: {params.categoryName}
    </div>
  )
}

export default ProductCategory
