import Link from 'next/link';
import {neonButton} from './NeonButton.module.css';

export default function NeonButtons() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Link href="https://techzonelab.com" className={`${neonButton} ${styles.like}`}>
          <span></span><span></span>
          <span></span><span></span>
          LIKE
    
      </Link>
      <Link href="https://techzonelab.com" className={`${st.neonButton} ${styles.comment}`}>
          <span></span><span></span>
          <span></span><span></span>
          Comment
        
      </Link>
      <Link href="https://techzonelab.com"className={`${st.neonButton} ${styles.follow}`}>
          <span></span><span></span>
          <span></span><span></span>
          Follow
      </Link>
    </div>
  );
}
