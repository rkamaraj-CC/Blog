import { useEffect } from 'react';
import Head from 'next/head';

const TextHoverAnimation = () => {
  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval = null;

    const animateText = (element) => {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        element.innerText = element.dataset.value
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return element.dataset.value[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= element.dataset.value.length) {
          clearInterval(interval);
        }

        iteration += 1 / 5; // Slower transition
      }, 100); // Increase interval duration
    };

    const element = document.querySelector("h1");

    const periodicInterval = setInterval(() => {
      animateText(element);
    }, 30000); // Call every 10 seconds

    // Initial call to animate text
    animateText(element);

    return () => {
      clearInterval(periodicInterval);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
      <div className="grid place-items-center ">
        <h1
          className="font-mono text-white text-2xl md:text-5xl p-0 md:p-0 rounded-md transition-colors duration-1000 ease-in-out hover:bg-lime-300 hover:text-black hover:shadow-lime-300"
          data-value="MyLife MyBlog"
        >
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </h1>
      </div>
    </>
  );
};

export default TextHoverAnimation;
