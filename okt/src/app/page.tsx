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
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <motion.p
        className="text-white text-4xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {words[index]}
      </motion.p>
    </div>
  );
};

interface CustomAlertProps {
  onClose: () => void;
}

const CustomAlert = ({  }) => (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-md">
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg">
      <div className="flex items-center gap-2">
        <ArrowDown className="h-4 w-4 text-blue-500" />
        <div className="font-semibold text-blue-900">Scroll Down</div>
      </div>
      <div className="mt-1 text-sm text-blue-700">
        Continue scrolling to find the Images Drive Link below
      </div>
    </div>
  </div>
);


interface IframeContainerProps {
  src: string;
}

const IframeContainer = ({ src }: IframeContainerProps) => {
  const [iframeHeight, setIframeHeight] = useState('100vh');

  useEffect(() => {
    const updateIframeHeight = () => {
      const iframe = document.querySelector('iframe');
      if (iframe) {
        const iframeContent = iframe.contentWindow?.document.body;
        if (iframeContent) {
          setIframeHeight(`${iframeContent.scrollHeight}px`);
        }
      }
    };

    window.addEventListener('resize', updateIframeHeight);
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
    <div className="w-full h-full">
      <iframe
        src={src}
        style={{ height: iframeHeight }}
        className="w-full border-none"
      />
    </div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      document.body.style.cursor = 'default';
    }, 2000);

    // Add CSS to remove scrollbars and ensure proper height
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className=" overflow-hidden">
      <AnimatePresence mode="wait">
        {loading && <Preloader />}
      </AnimatePresence>

      <AnimatePresence>
        {showAlert && <CustomAlert />}
      </AnimatePresence>

      <main className="w-full ">
        <IframeContainer src="https://octoreachdigital.com/services" />
      </main>
    </div>
  );
}