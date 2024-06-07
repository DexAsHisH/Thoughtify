import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import Icons from './Icons';

export default function Post({ post, id }) {
  return (
    <div className='flex p-3 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'>
      <img
        src={post?.profileImg}
        alt='user-img'
        className='h-11 w-11 rounded-full mr-4'
      />
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-sm truncate dark:text-gray-300'>{post?.name}</h4>
            <span className='text-xs truncate dark:text-gray-400'>@{post?.username}</span>
          </div>
          <HiDotsHorizontal className='text-sm dark:text-gray-400' />
        </div>

        <Link href={`/posts/${id}`}>
          <p className='text-gray-800 dark:text-gray-300 text-sm my-3'>{post?.text}</p>
        </Link>
        {post?.image && (
          <Link href={`/posts/${id}`}>
            <img src={post.image} className='rounded-2xl mr-2' />
          </Link>
        )}
        <Icons id={id} uid={post.uid} />
      </div>
    </div>
  );
}
