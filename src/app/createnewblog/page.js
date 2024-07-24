"use client"
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import Pica from 'pica';
import AnimatedBoxes from "../../components/menu"

export default function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState(null);
    const router = useRouter();
    const user = useSelector((state) => state.userDetails.data)
    const pica = Pica();
    console.log(user)
    if (!user) {
        router.push('/')
    }
   const resizeAndConvertToBase64 = async (file, maxWidth, maxHeight) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const reader = new FileReader();
      
          reader.onload = (e) => {
            img.src = e.target.result;
      
            img.onload = async () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
      
              const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
              canvas.width = img.width * ratio;
              canvas.height = img.height * ratio;
      
              try {
                const result = await pica.resize(img, canvas);
                canvas.toBlob((blob) => {
                  const reader = new FileReader();
                  reader.onerror = reject;
                  reader.readAsDataURL(blob);
                  reader.onload = () => {
                    console.log(reader.result)
                    setPhoto(reader.result);
                  };
                }, 'image/jpeg');
              } catch (error) {
                reject(error);
              }
            };
      
            img.onerror = reject;
          };
      
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };
    const convertBase64 = (e) => {
        const file = e.target.files[0];
        //const resizedBase64Photo =  resizeAndConvertToBase64(file, 500, 500);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result)
            setPhoto(reader.result);
        };
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, including uploading the photo
       
        console.log(user._id, "usersssssssssss")
        if (!user) {
            router.push('/')
        }
        // Example API call, replace with your actual API endpoint
        fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/create-blog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                content,
                category,
                photo,
                created_by: user._id
            })
        })
            .then((res) => res.json())
            .then((res) => {
                console.log('Blog created:', res);
                // Reset form fields
                router.push('/dashbord')
                setTitle('');
                setContent('');
                setCategory('');
                setPhoto(null);
            })
            .catch((error) => {
                console.error('Error creating blog:', error);
                alert('An error occurred');
            });
    };

    return (
        <>
        <div style={{ backgroundImage: `url(/images/bg.png)` }}>
        <AnimatedBoxes/>
        <div className="flex items-center py-8 justify-center min-h-screen">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Create New Blog</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="category"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="technology">Technology</option>
                            <option value="health">Health</option>
                            <option value="lifestyle">Lifestyle</option>
                            <option value="education">Education</option>
                            <option value="business">Business</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            id="content"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            rows={10}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
                        <input
                            type="file"
                            id="photo"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={convertBase64}
                            required
                        />
                        {photo == "" || photo == null ? "" : <img width={100} height={100} src={photo}></img>}

                    </div>
                    <div className="mb-4 flex justify-center item-center">
                    <button  type="submit" className="relative inline-block px-6 py-4 text-lime-500 uppercase text-lg font-bold overflow-hidden transition-all duration-500 hover:bg-lime-500 hover:text-black hover:shadow-neon rounded-lg ">
                    <span className="absolute inset-0 border-t-2 border-lime-500 animate-neon-1"></span>
                    <span className="absolute inset-0 border-r-2 border-lime-500 animate-neon-2"></span>
                    <span className="absolute inset-0 border-b-2 border-lime-500 animate-neon-3"></span>
                    <span className="absolute inset-0 border-l-2 border-lime-500 animate-neon-4"></span>
                    Create Blog
                  </button>
                  </div>
                </form>
            </div>
        </div>
        </div>
        </>
    );
};

