import React from 'react'
import Container from './Container'
import Image from 'next/image'
import payment from '@/images/payment.png'
export default function Footer() {
  return (
    <footer className='bg-lightBg text-sm'>
      <Container className='py-5 flex justify-between items-center '>
        <p className='text-gray-500'>Copyright @ 2024 all rights reserved</p>
        <Image src={payment} alt='payment' className='w-64 object-cover'/>
      </Container>
    </footer>
  )
}
