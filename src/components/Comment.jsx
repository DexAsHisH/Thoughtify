'use client';

import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import {
  getFirestore,
  onSnapshot,
  collection,
  setDoc,
  doc,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore';
import { app } from '../firebase';
import { signIn, useSession } from 'next-auth/react';

export default function Comment({ comment, commentId, originalPostId }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const { data: session } = useSession();
  const db = getFirestore(app);

  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(
          doc(
            db,
            'posts',
            originalPostId,
            'comments',
            commentId,
            'likes',
            session?.user.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            'posts',
            originalPostId,
            'comments',
            commentId,
            'likes',
            session.user.uid
          ),
          {
            username: session.user.username,
            timestamp: serverTimestamp(),
          }
        );
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(
      collection(db, 'posts', originalPostId, 'comments', commentId, 'likes'),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
  }, [db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  return (
    <div className='flex p-3 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'>
      <img
        src={comment?.userImg}
        alt='user-img'
        className='h-9 w-9 rounded-full mr-4'
      />
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-sm truncate text-gray-900 dark:text-white'>
              {comment?.name}
            </h4>
            <span className='text-xs truncate text-gray-500 dark:text-gray-400'>
              @{comment?.username}
            </span>
          </div>
          <HiDotsHorizontal className='text-gray-500 dark:text-gray-400' />
        </div>
        <p className='text-gray-800 dark:text-gray-300 text-xs my-3'>
          {comment?.comment}
        </p>
        <div className='flex items-center'>
          {isLiked ? (
            <HiHeart
              onClick={likePost}
              className='h-8 w-8 cursor-pointer rounded-full transition text-red-600 dark:text-red-500 duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-200'
            />
          ) : (
            <HiOutlineHeart
              onClick={likePost}
              className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-200'
            />
          )}
          {likes.length > 0 && (
            <span className={`text-xs ${isLiked && 'text-red-600 dark:text-red-500'}`}>
              {likes.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
