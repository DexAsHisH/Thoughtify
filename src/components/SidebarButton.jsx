'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

const SidebarButton = () => {
  const { data: session } = useSession();

  return session ? (
    <button
      className='bg-blue-400 text-white rounded-full hover:brightness-95 transition-all duration-200 w-auto h-9 shadow-md font-semibold'
      onClick={() => signOut()}
      aria-label='Sign Out'
    >
      Sign Out
    </button>
  ) : (
    <button
      className='bg-blue-400 text-white rounded-full hover:brightness-95 transition-all duration-200 w-auto h-9 shadow-md font-semibold'
      onClick={() => signIn()}
      aria-label='Sign In'
    >
      Sign In
    </button>
  );
}

export default SidebarButton;
