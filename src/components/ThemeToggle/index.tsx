import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className='flex items-center'>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`
          relative inline-flex items-center justify-center w-12 h-6 rounded-full
          bg-gray-200 dark:bg-gray-700 transition-colors duration-200
          `}
      >
        <div
          className={`absolute left-1 transform transition-transform duration-200 ${
            theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
          }`}
        >
          {theme === 'dark' ? (
            <FiMoon className='text-yellow-400 w-4 h-4' />
          ) : (
            <FiSun className='text-yellow-500 w-4 h-4' />
          )}
        </div>
      </button>
    </div>
  );
}
