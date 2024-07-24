"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AnimatedBoxes from "../../components/menu"

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};
export default  function Home() {
const router = useRouter();
const user= useSelector((state)=>state.userDetails.data) 
const [searchQuery, setSearchQuery] = useState('');
//const userData = useSelector((state: RootState) => selectUserData(state));
const [posts,setPosts] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);
if (!user) {
    router.push('/signin')
}
const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value);
    const searchdata=e.target.value;
    
    if(searchdata.length>0)
    {
    }else{
        setPosts([])
        fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/posts`)
        .then((res)=>res.json()).
        then((res)=>setPosts(res))
    }
  };
const handleClick=async()=>{
    console.log(searchQuery,"onhandle")
    
    
    if(searchQuery.length>0)
    { 
          setPosts([])
          await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/posts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                searchQuery
            })
          })
            .then((res) => res.json())
            .then(async (res) => {
                
              if (res.code===0) {
                
                //toast.success('User created successfully');
                 setPosts(res.data);
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
        
    }
}
const handleEdit=async(id)=>{
  router.push(`/editblogs/${id}`)
}
const handleDelete=async(postId,index)=>{
  try {  
    console.log(postId,index,"deleteeeeeee")
  if(postId)
  { 
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/posts?${postId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log(result,result.code,"resultttttt")
      if (result.code === 0) {
        setPosts(posts.filter(post => post._id !== postId));
      } else {
        alert(result.message);
      }
   } 
  }
  catch (error) {
    console.error('Error:', error);
    alert('An error occurred');
  }  
}
useEffect(()=>{
  console.log(process.env.NEXT_PUBLIC_BASEURL)
 fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/posts`)
 .then((res)=>res.json()).
 then((res)=>setPosts(res))
 
},[]);
  return (
    <>
    <div style={{ backgroundImage: `url(/images/bg.png)` }}>
    <AnimatedBoxes/>
    <main className="container px-4 py-6">
        
        <h5>{user?.email}</h5>
        
    </main>
      
    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200" >
      <div className="flex-1">
      <Link href="/createnewblog" className="relative inline-block px-0 py-2 text-lime-500 uppercase text-lg font-bold overflow-hidden transition-all duration-500 hover:bg-lime-500 hover:text-white hover:shadow-neon rounded-lg">
      <span class="absolute inset-0 border-t-2 border-lime-500 animate-neon-1"></span>
        <span class="absolute inset-0 border-r-2 border-lime-500 animate-neon-2"></span>
        <span class="absolute inset-0 border-b-2 border-lime-500 animate-neon-3"></span>
        <span class="absolute inset-0 border-l-2 border-lime-500 animate-neon-4"></span>
        Create Your Blog
      </Link>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="px-0 py-2 border border-gray-300 rounded-md"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button className="px-0 py-0 bg-blue-500 text-white rounded-md h-14 bg-gradient-to-r from-lime-500 to-lime-500 overflow-hidden transition-all duration-500 hover:bg-lime-500 hover:text-black hover:shadow-neon rounded-lg " onClick={handleClick}>
      
          Search
        </button>
      </div>
    </div>
 <div className="h-full flex w-full justify-center items-center dark:bg-lime-500 p-2">
     <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5">
        {posts.map((post,index) => (
          <div key={post._id} className="border border-lime-200 p-4 rounded-lg rounded-2xl bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg transition-transform transform hover:scale-105">
            {post.image && (
              <img className="w-full h-48 object-cover mb-4 rounded-md" loading="lazy" src={post.image} alt="Post Image" />
            )}
            <h2 className="text-white flex justify-center font-semibold mb-2">{post.title}</h2>
            <p className="flex justify-center text-white">{truncateText(post.description,20)}</p>
            <Link href={`/blogs/${post._id}`} className="relative flex justify-center inline-block px-0 py-0 text-lime-500 overflow-hidden transition-all duration-500 hover:bg-lime-500 hover:text-white hover:shadow-neon rounded-lg">
           
              Read More
            </Link>
            <div className="flex justify-center space-x-4 space-x-2">
          {user?._id===post.created_by && (<button onClick={() => handleEdit(post._id)} className="text-blue-500 flex justify-center hover:text-blue-800">
            <FontAwesomeIcon icon={faEdit} />
          </button>)}
          {user?._id===post.created_by && (<button onClick={() => handleDelete(post._id,index)} className="text-red-500 flex justify-center hover:text-red-800">
            <FontAwesomeIcon icon={faTrash} />
          </button>)}
        </div>
          </div>
          

        ))}
      </div> 
      </div>
    </div>
    </>
  );
}
