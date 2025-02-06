import { Product } from "@/sanity.types"
import { Button } from "./ui/button"
import {HiMinus , HiPlus} from "react-icons/hi2"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import userCartStore from "@/store"

interface Props{
    product:Product,
    className?:string,
}

const QuantityButtons = ({product , className}:Props) => {
  const {addItem , removeItem , getItemCount} = userCartStore();
  const handleAddProduct=()=>{
    addItem(product)
  toast.success("Quantity Increased Successfully")
  }
    const handleRemoveProduct =()=>{
      removeItem(product?._id)
       if(itemsCount > 1){
        toast.success("Quantity decreased Successfully")
       }else{
        toast.success(`${product?.name?.substring(0,12)}... Removed Successfully`)
       }
    }
    const itemsCount = getItemCount(product?._id)
  // const isOutOfStock = product?.stock === 0;
  return (
    <div className={cn('flex items-center pb-1 gap-1 text-balance ', className)}>
      <Button variant={'outline'} size={'icon'} className="w-6 h-6" onClick={handleRemoveProduct}>
        <HiMinus/>
      </Button>
      <p>{itemsCount}</p>
      <Button variant={'outline'} size={'icon'} className="w-6 h-6" onClick={handleAddProduct}>
        <HiPlus/>
      </Button>
    </div>
  )
}

export default QuantityButtons
