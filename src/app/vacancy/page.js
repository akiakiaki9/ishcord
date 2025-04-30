"use client"
import React, { useState, useEffect } from 'react';
import LayOutComp from './layout/LayOutComp';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ScrollTop from '../components/ScrollToTop';
import Shapka from '../components/Shapka';

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Navbar />
      {!isMobile && <Shapka />}
      <ScrollTop />
      <LayOutComp />
      <Footer />
    </div>
  );
};