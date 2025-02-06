import { Product } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import ProductCartBar from "./ProductCartBar"
import {LuStar} from "react-icons/lu"
import PriceView from './PriceView';
import AddToCart from './AddToCart';
interface Props{
    product:Product
}

const ProductHard = ({product}:Props) => {
  return (
    <div className='border border-gray-300 rounded-lg overflow-hidden group text-sm'>
     <div className='border-b border-b-gray-300 overflow-hidden relative'>
        {product?.image && (
            <Link href={`https://ecommerce-store-rameez.vercel.app/Product/${product?.slug?.current}`}>
            <Image src={urlFor(product?.image).url()} alt='image' width={500} height={500} loading='lazy' className='w-full max-h-96 object-cover overflow-hidden transition-transform group-hover:scale-105 duration-500'/>
            </Link>
        )}
         {product?.stock === 0 && (
        <div className='absolute top-0 left-0 w-full h-full  bg-black bg-opacity-50 flex items-center justify-center '><p className='text-lg font-bold text-white'>Out of Stock</p></div>
     )}
     {product?.status && (
        <div className='absolute left-1 top-1 z-10 flex flex-col  space-y-1 group-hover:opacity-0 transition-opacity duration-300'>
            {product?.status?.split('').map((char, index)=>(
                <span key={index} className='font-semibold'>{char}</span>
            ))}
        </div>
     )}
     {product?.stock !==0 && (
        <div className='absolute bottom-0  left-0 w-full translate-y-12 group-hover:-translate-y-4 hoverEffect'>
            <ProductCartBar/>
        </div>
     )}
     </div>
    <div className='p-5 flex flex-col gap-2'>

     <div className='flex items-center justify-between'>
        <p className='text-gray-500 font-medium '>Snacks</p>
        <div className='flex items-center text-gray-500 gap-1'>

        {Array.from({length:5}).map((_ , index)=>{
            const isLastStar = index ===4 
            return <LuStar fill={!isLastStar?"#fca99b":"transparent"} key={index} className={`${isLastStar? "text-gray-500":"text-lightOrange"}`}/>
        })}
        </div>
     </div>
        <p className='text-base text-gray-600 tracking-wide font-semibold line-clamp-1 capitalize'>{product?.name}</p>
        <PriceView price={product?.price} discount={product?.discount} label={product?.label}/>
        <AddToCart product={product}/>
    </div>
    </div>
  )
}

export default ProductHard;
