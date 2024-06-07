'use client';

import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../atom/modalAtom';
import Modal from 'react-modal';
import { HiX } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { app } from '../firebase';
import { useRouter } from 'next/navigation';

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [input, setInput] = useState('');
  const [post, setPost] = useState({});
  const { data: session } = useSession();
  const db = getFirestore(app);
  const router = useRouter();

  useEffect(() => {
    if (postId !== '') {
      const postRef = doc(db, 'posts', postId);
      const unsubscribe = onSnapshot(postRef, (snapshot) => {
        if (snapshot.exists()) {
          setPost(snapshot.data());
        } else {
          console.log('No such document!');
        }
      });
      return () => unsubscribe();
    }
  }, [postId]);

  const sendComment = async () => {
    if (!session) return signIn();

    try {
      await addDoc(collection(db, 'posts', postId, 'comments'), {
        name: session.user.name,
        username: session.user.username,
        userImg: session.user.image,
        comment: input,
        timestamp: serverTimestamp(),
      });
      setInput('');
      setOpen(false);
      router.push(`/posts/${postId}`);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className='max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white dark:bg-gray-800 border-2 dark:border-gray-700 border-gray-200 rounded-xl shadow-md'
          overlayClassName='fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-80' // Updated to support dark mode
        >
          <div className='p-4 dark:text-gray-100'>
            <div className='border-b border-gray-200 dark:border-gray-700 py-2 px-1.5 flex justify-between items-center'>
              <HiX
                className='text-2xl text-gray-700 dark:text-gray-400 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full cursor-pointer'
                onClick={() => setOpen(false)}
              />
            </div>
            <div className='p-2 flex items-center space-x-1 relative'>
              <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300 dark:bg-gray-700' />
              <img
                src={post?.profileImg}
                alt='user-img'
                className='h-11 w-11 rounded-full mr-4'
              />
              <div className='flex-1'>
                <h4 className='font-bold sm:text-[16px] text-[15px] hover:underline truncate text-gray-900 dark:text-white'>
                  {post?.name}
                </h4>
                <span className='text-sm sm:text-[15px] truncate text-gray-500 dark:text-gray-400'>
                  @{post?.username}
                </span>
              </div>
            </div>
            <p className='text-gray-500 dark:text-gray-400 text-[15px] sm:text-[16px] ml-16 mb-2'>
              {post?.text}
            </p>
            <div className='flex p-3 space-x-3'>
              <img
                src={session.user.image}
                alt='user-img'
                className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95'
              />
              <div className='w-full divide-y divide-gray-200 dark:divide-gray-700'>
                <div>
                  <textarea
                    className='w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700 dark:text-gray-200 dark:bg-gray-800 placeholder:text-gray-500 dark:placeholder:text-gray-400'
                    placeholder='Whats happening'
                    rows='2'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>
                <div className='flex items-center justify-end pt-2.5'>
                  <button
                    className='bg-blue-400 text-white dark:bg-blue-500 px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
                    disabled={input.trim() === ''}
                    onClick={sendComment}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
