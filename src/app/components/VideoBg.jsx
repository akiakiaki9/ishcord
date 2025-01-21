'use client'
import Link from 'next/link'
import React from 'react'

export default function VideoBg() {
    return (
        <div className="video-bg">
            <video
                src="/videos/jobvideo.mp4"
                type="video/mp4"
                autoPlay
                muted
                loop
                playsInline>
            </video>
            <div className="effects"></div>
            <div className="video-bg__content">
                <Link href='/'><img src="/images/logo.PNG" alt="IshCord Logo" /></Link>
                <h1 className="video__title">Работа и сотрудники по всему Узбекистану — находите легко, быстро и удобно!</h1>
            </div>
        </div>
    )
};