'use client'
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const slideUp = {
  initial: { y: 0 },
  exit: {
    y: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  }
};

const opacity = {
  initial: { opacity: 0 },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 }
  }
};

const Preloader = () => {
  const [index, setIndex] = useState(0);
  const words = [
    "Jay Jinendra",
    "नमस्ते",
    "प्रणाम",
    "सुप्रभात",
    "राम राम",
    "खम्मा घणी",
    "जय श्री कृष्ण",
    "आदाब",
    "सत श्री अकाल",
    "Jay Jinendra",
  ];

  useEffect(() => {
    if (index === words.length - 1) return;
    setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150);
  }, [index]);

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="h-screen w-full flex items-center justify-center fixed bg-black z-50"
    >
      <p className="text-white text-4xl font-medium">{words[index]}</p>
    </motion.div>
  );
};

const CustomAlert = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    variants={opacity}
    initial="initial"
    animate="enter"
  >
    {/* <ArrowDown className="animate-bounce" />
    <p className="text-sm font-medium">Scroll Down</p>
    <p className="text-xs opacity-75">Continue scrolling to find the Images Drive Link below</p>
 */}



    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-md">
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg">
      <div className="flex items-center gap-2">
        <ArrowDown className="h-4 animate-bounce w-4 text-blue-500" />
        <div className="font-semibold text-blue-900">Scroll Down</div>
      </div>
      <div className="mt-1 text-sm text-black">
        Continue scrolling to find the Images Drive Link below
      </div>
    </div>
  </div>
  </motion.div>
);

const IframeContainer = ({ src }: { src: string }) => {
  const [iframeHeight, setIframeHeight] = useState('100vh');

  useEffect(() => {
    const updateIframeHeight = () => {
      // Get viewport height
      const viewportHeight = window.innerHeight;
      // Account for browser chrome/UI by using a slightly larger value
      const safeHeight = viewportHeight + 100; // Add extra pixels for browser UI
      setIframeHeight(`${safeHeight}px`);

      // Try to get actual content height from iframe
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        try {
          const iframeContent = iframe.contentWindow.document.body;
          if (iframeContent) {
            const contentHeight = Math.max(
              iframeContent.scrollHeight,
              safeHeight
            );
            setIframeHeight(`${contentHeight}px`);
          }
        } catch (e) {
          // Handle cross-origin restrictions gracefully
          console.log('Using fallback height due to cross-origin restrictions');
        }
      }
    };

    // Initial height update
    updateIframeHeight();

    // Update height on resize
    window.addEventListener('resize', updateIframeHeight);
    
    // Update height when iframe loads
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.addEventListener('load', updateIframeHeight);
    }

    return () => {
      window.removeEventListener('resize', updateIframeHeight);
      if (iframe) {
        iframe.removeEventListener('load', updateIframeHeight);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <iframe
        src={src}
        className="w-full border-none"
        style={{ height: iframeHeight }}
        allowFullScreen
      />
    </div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    // Handle preloader
    const loadingTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.cursor = 'default';
    }, 2000);

    // Handle alert
    const alertTimer = setTimeout(() => {
      setShowAlert(false);
    }, 10000);

    // Reset overflow on component unmount
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(alertTimer);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {loading && <Preloader />}
      </AnimatePresence>

      <AnimatePresence>
        {showAlert && <CustomAlert onClose={() => setShowAlert(false)} />}
      </AnimatePresence>

      <main className="w-full min-h-screen">
        <IframeContainer src="https://octoreachdigital.com/services" />
      </main>
    </div>
  );
}