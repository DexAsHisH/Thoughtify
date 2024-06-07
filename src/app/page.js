import DarkModeToggle from '@/components/DarkModeToggle';
import Feed from '@/components/Feed';
import Input from '@/components/Input';
import SidebarButton from '@/components/SidebarButton';

export default function Page() {
  return (
    <div className='max-w-xl mx-auto border-r border-l min-h-screen '>
      <div className='py-2 px-3 sticky top-0 z-50 bg-white border-b dark:bg-gray-800 border-gray-200 flex justify-between items-center'>
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
        <div className='block sm:hidden'>
        <SidebarButton />
        </div>
        <DarkModeToggle />
        
        
      </div>
      <Input />
      <Feed />
    </div>
  );
}
