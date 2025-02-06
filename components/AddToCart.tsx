'use client'

import { Product } from "@/sanity.types"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"
import QuantityButtons from "./QuantityButtons"
import PriceFormatter from "./PriceFormatter"
import { useEffect, useState } from "react"
import userCartStore from "@/store"

interface Props{
    product:Product,
    className?:string
}

const AddToCart = ({product , className}:Props) => {
  const [isClient, setIsClient] = useState(false);
  const {addItem , getItemCount} = userCartStore();

  useEffect(()=>{
    setIsClient(true)
  },[])
  if(!isClient){
       return null
  }


  const itemsCount = getItemCount(product?._id)
  const isOutOfStock = product?.stock === 0;

    const handleAddtoCart=()=>{

  addItem(product)
  toast.success(`${product?.name?.substring(0,12)}... Added Successfully`)
         
    }

  return (
    <div>

    {itemsCount? (
        <div className="text-sm">
        <div className="flex items-center justify-between ">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButtons product={product}/>
        </div>
        <div className="flex items-center justify-between border-t pt-1">
            <span>SubTotal</span>
            <PriceFormatter amount={product?.price ? product.price * itemsCount : 0}/>
        </div>
        </div>
    ):(
        <Button disabled={isOutOfStock} onClick={handleAddtoCart}  className={cn("bg-darkBlue/15 text-black border border-darkBlue py-2 mt-2 w-full rounded-md font-medium hover:bg-darkBlue hover:text-white hoverEffect  disabled:hover:cursor-not-allowed disabled:bg-darkBlue/10 disabled:text-gray-400  disabled:hover:text-gray-400 disabled:border-darkBlue/10 " , className)}>Add To Cart</Button>
    )}
    </div>
  );
    
}

export default AddToCart
