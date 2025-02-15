import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ImageURL from '../../assets/Gahinath.jpg';

// Define props type
interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isLoggedIN, setIsLoggedIn] = useState<boolean>(true);

  // Define user object type
  interface User {
    name: string;
    imageUrl: string;
  }

  const user: User = {
    name: 'Gahinath Madake',
    imageUrl: ImageURL,
  };

  return (
    <header className={`sticky top-0 left-0 shadow-sm bg-white ${className}`}>
      <nav className='px-20 py-4 flex justify-between'>
        <div className='flex gap-3 items-center justify-center font-semibold text-xl'>
          <img src='/logo.png' alt='Logo' className='w-[30px]' />
          <p>SharePlate</p>
        </div>
        <div className='flex items-center gap-10'>
          <ul className='flex gap-3'>
            <Link to='/'><li>Home</li></Link>
            <Link to='/why-us'><li>Why Us</li></Link>
            <Link to='/features'><li>Feature</li></Link>
            <Link to='/faq'><li>FAQ</li></Link>
          </ul>

          {!isLoggedIN && (
            <Link to='/user/login'>
              <Button >
                Get Started
              </Button>
            </Link>
          )}

          {isLoggedIN && (
            <Link to='/user/NGO'>
              <div className='flex items-center justify-center gap-1'>
                <img src={user.imageUrl} alt='user' className='w-[35px] h-[35px] rounded-full' />
              </div>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
