import { Link, useLocation } from 'react-router-dom';
import { PiListStarFill } from 'react-icons/pi';

import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) =>
    `${
      location.pathname === path
        ? `border-b-[2px] border-accent-light hover:border-accent-dark
      dark:border-accent-dark dark:hover:border-accent-light`
        : ''
    }`;

  return (
    <nav
      className={`
    flex justify-between p-[16px] gap-[16px]
    bg-background-light dark:bg-background-dark
    border-b-[1px] border-b-neutral-300 dark:border-b-neutral-500`}
    >
      <Link to='/'>
        <PiListStarFill className='w-[24px] h-[24px]' />
      </Link>
      <ul className='flex space-x-4 '>
        <li>
          <Link to='/' className={`${isActive('/')}`}>
            Home
          </Link>
        </li>
        <div className='border-l-[1px] border-l-neutral-300 dark:border-l-neutral-500 h-full' />
        <li>
          <Link to='/products' className={`${isActive('/products')}`}>
            Products
          </Link>
        </li>
        <div className='border-l-[1px] border-l-neutral-300 dark:border-l-neutral-500 h-full' />
        <li>
          <Link to='/about' className={`${isActive('/about')}`}>
            About
          </Link>
        </li>
      </ul>
      <ThemeToggle />
    </nav>
  );
}
