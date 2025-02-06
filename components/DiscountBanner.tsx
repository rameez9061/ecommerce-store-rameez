import { SALE_QUERYResult } from "@/sanity.types"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { Button } from "./ui/button"


const DiscountBanner = ({sales}:{sales:SALE_QUERYResult}) => {
  return (
    <Carousel className="w-full max-w-screen-xl mx-auto my-10">
        <CarouselContent>
{sales?.map((sale)=>(
    <CarouselItem key={sale?._id}>
        <Card>
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1 p-6 md:px-12">
                        <Badge variant='secondary' className="mb-2 md:mb-4 text-darkBlue capitalize">
                            {sale?.badge} {sale?.discountAmount}% off
                        </Badge>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2 md:mb-4">{sale?.title}</h2>
                        <p className="text-muted-foreground mb-2 md:mb-4">{sale?.Description}</p>
                        <p className="mb-2">Use Code : <span className="font-semibold text-primary uppercase">{sale?.couponCode}</span> for{" "} <span className="font-semibold"> {sale?.discountAmount}</span>% OFF</p>
                        <Button>
                            Shop Now
                        </Button>
                    </div>
                    {sale?.image && <div className="w-full md:w-1/2 h-auto flex items-center justify-center py-2">
                        <Image src={urlFor(sale?.image).url()} alt="Banner Image" width={500} height={500} objectFit="cover" className="h-full transition-transform hover:scale-105 duration-500 ease-in-out"/>
                        </div>}
                </div>
            </CardContent>
        </Card>
    </CarouselItem>
))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-1"/>
        <CarouselNext className="absolute right-1"/>
    </Carousel>
  )
}

export default DiscountBanner
