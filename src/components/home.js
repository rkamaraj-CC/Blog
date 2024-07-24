import {IMAGES} from '../utils/imageurls'
import Image from "next/image";
export default async function Home(){
    return(
        <>
        <div className="md:w-1/2 w-full">
        <Image className="logo flex m-auto" src={IMAGES.home_img} alt="Blog" />
        </div>
        </>
        
    )
}