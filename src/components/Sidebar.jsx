'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';
import { HiHome, HiDotsHorizontal } from 'react-icons/hi';
import React from 'react';

const Sidebar = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error loading session</div>;
  }

  return (
    <div className='flex flex-col p-3 justify-between h-screen'>
      <div className='flex flex-col gap-4'>
        <Link href='/' passHref>
          <button aria-label='Twitter Home' className='flex justify-center'>
            <FaXTwitter className='w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200' />
          </button>
        </Link>
        <Link href='/' passHref>
          <button
            className='flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-full sm:w-auto'
            aria-label='Home'
          >
            <HiHome className='w-7 h-7' />
            <span className='font-bold hidden xl:inline'>Home</span>
          </button>
        </Link>
        {session ? (
          <button
            className='bg-blue-400 text-white rounded-full hover:brightness-95 transition-all duration-200 w-full sm:w-48 h-9 shadow-md font-semibold'
            onClick={() => signOut()}
            aria-label='Sign Out'
          >
            Sign Out
          </button>
        ) : (
          <button
            className='bg-blue-400 text-white rounded-full hover:brightness-95 transition-all duration-200 w-full sm:w-48 h-9 shadow-md font-semibold'
            onClick={() => signIn()}
            aria-label='Sign In'
          >
            Sign In
          </button>
        )}
      </div>
      {session && (
        <div className='text-gray-700 text-sm flex items-center cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200 mt-4'>
          <img
            src={session.user.image}
            alt='user-img'
            className='h-10 w-10 rounded-full xl:mr-2'
          />
          <div className='hidden xl:inline'>
            <h4 className='font-bold'>{session.user.name}</h4>
            <p className='text-gray-500'>@{session.user.username}</p>
          </div>
          <HiDotsHorizontal className='h-5 xl:ml-8 hidden xl:inline' />
        </div>
      )}
    </div>
  );
}

export default React.memo(Sidebar);
