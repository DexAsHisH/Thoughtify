'use client';

import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';
import { HiHome, HiDotsHorizontal } from 'react-icons/hi';
import React from 'react';
import SidebarButton from '@/components/SidebarButton';

const Sidebar = () => {
  return (
    <div className='flex flex-col p-3 justify-between h-screen'>
      <div className='flex flex-col gap-4'>
        <Link href='/' passHref>
          <button aria-label='Twitter Home' className='flex justify-center'>
            <FaXTwitter className='w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200' />
          </button>
        </Link>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <Link href='/' passHref>
            <button
              className='flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'
              aria-label='Home'
            >
              <HiHome className='w-7 h-7' />
              <span className='font-bold hidden xl:inline'>Home</span>
            </button>
          </Link>
        </div>
        <SidebarButton />
      </div>
    </div>
  );
}

export default React.memo(Sidebar);
