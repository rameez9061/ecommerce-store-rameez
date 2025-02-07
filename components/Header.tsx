
import React from 'react'
import logo from '@/images/logo.png'
import Image from 'next/image'
import Container from '@/components/Container'
import Form from 'next/form'
import Link from 'next/link'
import Carticon from './Carticon'
import { ShoppingBasket, User } from 'lucide-react'
import { currentUser } from '@clerk/nextjs/server'
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from '@clerk/nextjs'
import { getMyOrders } from '@/sanity/helpers'



export default async function Header() {
   
    const user = await currentUser()
    console.log(user)
   let orders = null;
    if(user?.id){
       orders = await getMyOrders(user?.id)
    }


  return (
   <header className='w-full bg-white py-4 border-b border-gray-400 sticky top-0 z-50'>
<Container className='flex md:items-center justify-between gap-5 flex-col md:flex-row'>
<Link  href={'/'}>
<Image src={logo} alt="logo" className='w-12' priority/>
</Link>
<Form action="/search"  className='flex-1 '>
    <input type="text" name='query'  placeholder='Search For Products......' className='w-full border-2 border-gray-200 px-4 py-2.5 rounded-md focus-visible:border-darkBlue outline-none' />
</Form>
<div className='flex items-center gap-5'>
    <Carticon/>
  <ClerkLoaded>
  <SignedIn>
  <Link href={"/orders"} className='flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 shadow-md rounded-md hover:shadow-none hoverEffect'>
     <ShoppingBasket className='text-darkBlue w-6 h-6'/>
     <div className='flex flex-col'>
        <p className='text-xs'><span className='font-semibold'>{orders && orders?.length > 0 ? orders?.length : 0}</span> items</p>
        <p className='font-semibold'>Orders</p>
     </div>
    </Link>
  </SignedIn>
    {user ? <div  className='flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 shadow-md rounded-md hover:shadow-none hoverEffect'> <UserButton/>
        <div className='flex flex-col'>
        <p className='text-xs hidden md:inline-block'>Welcome Back !</p>
        <p className='font-semibold hidden md:inline-block'>{user?.fullName}</p>
     </div>
     </div>:<SignInButton mode='modal'>
<div className='flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 shadow-md rounded-md hover:shadow-none hoverEffect'>
    <User className='w-6 h-6 text-darkBlue'/>
    <div className='flex flex-col'>
        <p className='text-xs'>Account</p>
        <p className='font-semibold'>Login</p>
     </div>
</div>
    </SignInButton>
        }
  </ClerkLoaded>

</div>

</Container>


   </header>
  )
}
