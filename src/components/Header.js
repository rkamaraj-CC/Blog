"use client"
import Link from "../../node_modules/next/link";
import { IMAGES } from "../utils/imageurls";
import Image from "next/image";
import { userDetails } from "../redux/slice";
import { useSelector, useDispatch } from "react-redux";
import TextHoverAnimation from './appname'

export default  function Header() {
    const user= useSelector((state)=>state.userDetails.data)
    const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userDetails());
  };
    return (
        <header className="bg-white shadow-lg">

            <nav className="bg-white border-b border-gray-200 shadow-md">
                <div className="max-w-full mx-auto px-0 sm:px-0 lg:px-0">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center">
                            <Image src={IMAGES.app_logo} alt="Blog Logo" className="h-16 w-20" />
                            <TextHoverAnimation/>
                        </div>
                        <div className="flex-1 flex justify-end items-center">
                            <div className="flex space-x-4">
                                <Link href="/" className="text-blue-600 hover:text-blue-800">Home
                                </Link>
                                <Link href="/about" className="text-blue-600 hover:text-blue-800">About
                                </Link>
                                <Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact
                                </Link>
                                {user?.email && (
                                <button onClick={handleLogout} className="text-blue-600 hover:text-blue-800">
                                Logout
                                </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

    )
}

