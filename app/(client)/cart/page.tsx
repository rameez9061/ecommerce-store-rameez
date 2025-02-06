"use client";

import { createCheckoutSession, MetaData } from "@/actions/createCheckoutSession";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import Loader from "@/components/Loader";
import NoAccessToCart from "@/components/NoAccessToCart";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/sanity/lib/image";
import userCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = userCartStore();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const groupedItems = userCartStore((state) => state.getGroupedItems());
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loader />;
  }

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product Deleted Successfully");
  };

  const handleResetCart = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    if (confirmed) {
      resetCart();
      toast.success("Your cart has been reset Successfully!");
    }
  };

  const handleCheckOut = async() => {
   setLoading(true)
   try {
    const metadata:MetaData={
      orderNumber:crypto.randomUUID(),
      customerName:user?.fullName ?? "Unknown",
      customerEmail:user?.emailAddresses[0]?.emailAddress ?? "Unknown",
      clerkUserId:user?.id ?? "Unknown",

    }

    const checkoutUrl = await createCheckoutSession(groupedItems , metadata)
    if(checkoutUrl){
      window.location.href = checkoutUrl;
    }
   } catch (error) {
    console.log("Error creating checkout session",error)
   }finally{
    setLoading(false)
   }
  };
  return (
    <div className="bg-gray-50 pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5 ">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <p className="text-2xl font-semibold">Shopping Cart</p>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8 pb-40">
                <div className="lg:col-span-1">
                  <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                    <h2 className="text-2xl font-semibold mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>SubTotal Value</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Discount Price</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span>Total</span>
                        <PriceFormatter amount={getTotalPrice()} />
                      </div>
                      <div className="flex flex-col">
                        <Button onClick={handleCheckOut} disabled={loading}>
                          {loading ? "Processing":"Procceed to Checkout"}
                        </Button>
                        <Link
                          href={"/"}
                          className="text-center text-sm  text-primary hover:underline hover:text-darkBlue hoverEffect"
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-5 md:grid-cols-6 border rounded-tr-lg rounded-tl-lg bg-white p-2.5 text-base font-semibold ">
                    <h2 className="col-span-2 md:col-span-3">Product</h2>
                    <h2 className="text-center">Price</h2>
                    <h2 className="text-center ">Quantity</h2>
                    <h2 className="text-center ">Total</h2>
                  </div>
                  <div className="bg-white border-t-0 rounded-br-lg rounded-bl-lg">
                    {groupedItems?.map(({ product }) => {
                      const itemsCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="grid grid-cols-5 md:grid-cols-6 border-b p-2.5 last:border-b-0"
                        >
                          {/* Product Image and Name Section */}
                          <div className="col-span-2 md:col-span-3 flex items-center">
                            <Trash2
                              onClick={() => {
                                handleDeleteProduct(product?._id);
                              }}
                              className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                            />
                            {product?.image && (
                              <Link
                                href={`Product/${product?.slug?.current}`}
                                className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                              >
                                <Image
                                  src={urlFor(product?.image).url()}
                                  alt="productImage"
                                  width={300}
                                  height={300}
                                  className="w-10 h-10 md:h-14 md:w-full object-cover group-hover:scale-105 overflow-hidden hoverEffect"
                                />
                              </Link>
                            )}

                            <h2 className="text-sm">{product?.name}</h2>
                          </div>

                          {/* Price Section */}
                          <div className="flex items-center justify-center">
                            <PriceFormatter amount={product?.price} />
                          </div>

                          {/* Quantity Buttons Section */}
                          <div className="flex items-center justify-center">
                            <QuantityButtons
                              product={product}
                              className="text-sm gap-0 md:gap-1 text-darkBlue"
                            />
                          </div>

                          {/* Total Price Section */}
                          <div className="flex items-center justify-center">
                            <PriceFormatter
                              amount={
                                product?.price ? product?.price * itemsCount : 0
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      onClick={handleResetCart}
                      variant="destructive"
                      className="m-5 font-semibold w-[100px] sm:w-auto"
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white p-6 rounded-lg border">
                  <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>SubTotal Value</span>
                      <PriceFormatter amount={getSubTotalPrice()} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Discount Price</span>
                      <PriceFormatter
                        amount={getSubTotalPrice() - getTotalPrice()}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span>Total</span>
                      <PriceFormatter amount={getTotalPrice()} />
                    </div>
                    <div className="flex flex-col">
                      <Button onClick={handleCheckOut}>
                        Proceed to Checkout
                      </Button>
                      <Link
                        href={"/"}
                        className="text-center text-sm  text-primary hover:underline hover:text-darkBlue hoverEffect"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;
