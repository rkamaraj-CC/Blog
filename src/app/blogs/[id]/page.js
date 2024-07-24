// src/app/blogs/[id]/page.js
"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AnimatedBoxes from "../../../components/menu";
import Link from "next/link";
import Image from "next/image";
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength);
};
const truncateTextAfter = (text, maxLength) => {
  if (text.length <= maxLength) {
    return "                                                               ";
  }
  return text.slice(maxLength,text.length);
};
export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (id) {
        console.log(id,"iddddddd")
      fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/posts?${id}`)
        .then((res) => res.json())
        .then((res) => setBlog(res));
    }
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <> 
    
    <div style={{ backgroundImage: `url(/images/bg.png)` }}>
    <AnimatedBoxes/>
      <div id="about" class="relative overflow-hidden mt-16">
    <div class="max-w-7xl mx-auto">
        <div class="relative z-10 lg:max-w-2xl bg-white lg:w-full">
            <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                
            </svg>

            <div class="pt-1"></div>

            <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 bg-white sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div class="sm:text-center lg:text-left">
                    <h2 class="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                    Title:{blog.title}
                    </h2>
                    <h4 class="my-6 text-2xl tracking-tight text-gray-900 sm:text-3xl md:text-2xl">
                    Category:{blog.category}
                    </h4>
                    <p>
                    {truncateText(blog.description,556)}
                   
                    </p>
                </div>
            </main>
        </div>
    </div>
    <div class="flex justify-center item-center lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <div className="md:w-1/2 flex justify-center">
          
          <div className="relative w-72 h-72">
            <Image
              src={blog.image} // Make sure to put your image in the public/images folder
              alt="Virat Kohli"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
       
    </div>
    <div class=" max-w-7xl bg-white mx-auto px-8">
      <p>
      {truncateTextAfter(blog.description,556)}
      </p>
    </div>
</div>
</div>
</>

  );
}
