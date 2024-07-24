import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import TextHoverAnimation from './appnameani';
import { IMAGES } from "../utils/imageurls";
import { userDetails } from "../redux/slice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';

const AnimatedBoxes = () => {
  const user= useSelector((state)=>state.userDetails.data)
    const dispatch = useDispatch();
    const router = useRouter();
  const handleLogout = () => {
    dispatch(userDetails());
    router.push('/signin');
  };
  useEffect(() => {
    
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu-placeholder");
    if (hamburger && mobileMenu) {
      hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
  }, []);

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap" rel="stylesheet" />
      </Head>
      <header className="fixed top-0 left-0 w-full z-50 bg-opacity-10 backdrop-filter backdrop-blur-lg">
        <div className="container flex justify-between items-center px-4 py-2">
          <div className="flex items-center">
          <Image src={IMAGES.app_logo} alt="Blog Logo" className="items-center h-16 w-20" />
          </div>
           <div className="flex items-center">
           <TextHoverAnimation/>
            </div>
          <div className="flex md:hidden">
            <button id="hamburger" className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>

          <nav className="hidden md:flex md:flex-grow justify-center">
            <ul className="flex justify-center space-x-4 text-white">
              <li><a href="/dashbord" className="hover:text-secondary font-bold">Home</a></li>
              <li><a href="/about" className="hover:text-secondary font-bold">About us</a></li>
              <li><a href="/contact" className="hover:text-secondary font-bold">Contact</a></li>
            </ul>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
          {user?.email && ( <button onClick={handleLogout} className="bg-blue-500 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded inline-block">Logout</button>
          )}
          </div>
        </div>
      </header>

      <nav id="mobile-menu-placeholder" className="mobile-menu hidden flex-col items-center space-y-8 md:hidden px-8">
        <ul className="w-full text-center">
          <li className="border-b border-gray-300 pb-4 pt-4"><a href="/dashbord" className="hover:text-secondary font-bold">Home</a></li>
          <li className="border-b border-gray-300 pb-4 pt-4"><a href="/about" className="hover:text-secondary font-bold">About us</a></li>
          <li className="pb-4 pt-4"><a href="/contact" className="hover:text-secondary font-bold">Contact</a></li>
        </ul>
        <div className="flex flex-col mt-6 space-y-2 items-center">
        {user?.email && ( <button onClick={handleLogout} className="bg-blue-500 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded inline-block flex items-center justify-center min-w-[110px]">Logout</button>
          )}
        </div>
      </nav>
      <main className="container px-4 py-8">
        

        
    </main>
      
    </>
  );
};

export default AnimatedBoxes;
