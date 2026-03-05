'use client';

import React, { useState, useRef } from 'react';
import './Gallery.css'; // Add CSS locally to components if needed, or globals.css

const Gallery = () => {
    const [isPaused, setIsPaused] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    // Gallery data - placeholder images using Unsplash
    const galleryItems = [
        {
            id: 1,
            title: 'Hero Section',
            description: 'Beautiful landing page with clear value proposition',
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 2,
            title: 'Active Projects',
            description: 'Browse opportunities by engagement type',
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 3,
            title: 'How It Works',
            description: 'Simple 3-step process to get started',
            image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 4,
            title: 'Success Stories',
            description: 'Testimonials from nonprofits and volunteers',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 5,
            title: 'Pricing Plans',
            description: 'Flexible subscription tiers for nonprofits',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        }
    ];

    // Duplicate items for seamless infinite scroll
    const duplicatedItems = [...galleryItems, ...galleryItems];

    return (
        <section className="gallery-section" id="gallery">
            <div className="gallery-title">
                <h2>Platform <span className="highlight">Showcase</span></h2>
                <p>Explore the features that make Volunteam the perfect platform</p>
            </div>

            <div
                className="gallery-container"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    ref={trackRef}
                    className={`gallery-track ${isPaused ? 'paused' : ''}`}
                >
                    {duplicatedItems.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="gallery-item"
                        >
                            <img src={item.image} alt={item.title} />
                            <div className="gallery-item-overlay">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
