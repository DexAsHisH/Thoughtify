'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

const SidebarButton = () => {
  const { data: session } = useSession();

  return session ? (
    <button
      className='bg-blue-400 text-white rounded-full hover:brightness-95 dark:hover:bg-blue-500 transition-all duration-200 w-auto h-9 shadow-md font-semibold dark:bg-blue-500 dark:text-gray-100'
      onClick={() => signOut()}
      aria-label='Sign Out'
    >
      Sign Out
    </button>
  ) : (
    <button
      className='bg-blue-400 text-white rounded-full hover:brightness-95 dark:hover:bg-blue-500 transition-all duration-200 w-auto h-9 shadow-md font-semibold dark:bg-blue-500 dark:text-gray-100'
      onClick={() => signIn()}
      aria-label='Sign In'
    >
      Sign In
    </button>
  );
}

export default SidebarButton;
