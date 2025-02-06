import { Category, Product } from '@/sanity.types';
import React from 'react'
import Categories from './Categories';
import ProductGrid from './ProductGrid';


interface Props{
    products: Product[];
    title:boolean,
    categories:Category[],
}


const ProductList = ({products , title , categories}:Props) => {
  return (
    <div>
      <Categories categories={categories}/>
     {title && (
       <div className='pb-5'>

       <h2 className='text-2xl font-semibold text-gray-600'>
         Day of the <span className='text-lightBlue'>Deal</span>
         <p className='text-sm font-thin text-gray-500'>Don&apos;t Wait . Time will never be right</p>
       </h2>
       </div>
     )}
      <ProductGrid products={products}/>
    </div>
  )
}

export default ProductList
