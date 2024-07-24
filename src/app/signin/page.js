"use client"
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { userDetails } from '../../redux/slice';
import { IMAGES } from "../../utils/imageurls";
import Image from "next/image";
import Link from 'next/link';
import Head from 'next/head';
import TextHoverAnimation from '../../components/appnameani';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignIn = (e) => {
    e.preventDefault();
    if (password.length > 0 && email.length > 0) {
      fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/userlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })
        .then((res) => res.json())
        .then((res) => {

          if (res.code === 0) {

            //toast.success('User created successfully');
            router.push('/dashbord')
            setEmail("");
            setPassword("");
            dispatch(userDetails(res.data))
            //Utility.toastMessage("User created successfully")
            //dispatch(userDetails(data?.data));
          } else {
            alert(res.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred');
        });

    } else {
      alert("Please enter password and email password");
      return;
    }
    // Handle sign-in logic here
  };
  
  return (
    <>
     <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
     
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          
          <div className="flex-1 bg-green-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/images/blogwebsit.png)` }}>
            </div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 items-center">
            <div className="flex items-center justify-center">
              <Image src={IMAGES.app_logo} alt="Blog Logo" className="items-center h-16 w-20" />
            </div>
             <div className="flex items-center justify-center h-16 w20">
            <TextHoverAnimation/>
            </div> 
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">


                  <Link href="/signup" className="relative inline-block px-6 py-4 text-lime-500 uppercase text-lg font-bold overflow-hidden transition-all duration-500 hover:bg-lime-500 hover:text-black hover:shadow-neon rounded-lg ">
                    <span className="absolute inset-0 border-t-2 border-lime-500 animate-neon-1"></span>
                    <span className="absolute inset-0 border-r-2 border-lime-500 animate-neon-2"></span>
                    <span className="absolute inset-0 border-b-2 border-lime-500 animate-neon-3"></span>
                    <span className="absolute inset-0 border-l-2 border-lime-500 animate-neon-4"></span>
                    Sign Up
                  </Link></div>
                <div className="my-12 border-b text-center">
                  <div
                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign In with E-mail
                  </div>
                </div>
                <form onSubmit={handleSignIn}>
                  <div className="mx-auto max-w-xs">

                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      placeholder="Email"
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required />
                    <button type="submit"
                      className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">

                      Sign In

                    </button>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      I agree to abide by Cartesian Kinetics
                      <a href="#" className="border-b border-gray-500 border-dotted">
                        Terms of Service
                      </a>
                      and its
                      <a href="#" className="border-b border-gray-500 border-dotted">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
