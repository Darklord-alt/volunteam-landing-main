'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const LineDrawAnimation = ({ onComplete }: { onComplete?: () => void }) => {
    const [stage, setStage] = useState<'enter' | 'glow' | 'text' | 'exit'>('enter');

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage('glow'), 600),
            setTimeout(() => setStage('text'), 1300),
            setTimeout(() => setStage('exit'), 2500),
            setTimeout(() => onComplete?.(), 2900),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    const visible = stage !== 'exit';
    const glowing = stage === 'glow' || stage === 'text';
    const showText = stage === 'text';

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    style={{ background: '#000' }}
                >
                    <div className="flex flex-col items-center">

                        {/* Soft ambient glow — single, clean, centered */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: glowing ? 0.35 : 0,
                                scale: glowing ? 1 : 0.8,
                            }}
                            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute pointer-events-none"
                            style={{
                                width: 500,
                                height: 500,
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(73,193,199,0.25) 0%, transparent 65%)',
                                filter: 'blur(40px)',
                            }}
                        />

                        {/* The Logo — simple, confident entrance */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                filter: 'blur(0px)',
                            }}
                            transition={{
                                duration: 1.4,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                        >
                            <div
                                className="relative"
                                style={{
                                    width: 'clamp(120px, 25vw, 200px)',
                                    height: 'clamp(120px, 25vw, 200px)',
                                }}
                            >
                                <Image
                                    src="/img-removebg-preview.png"
                                    alt="Volunteam"
                                    fill
                                    className="object-contain"
                                    style={{
                                        filter: glowing
                                            ? 'drop-shadow(0 0 40px rgba(73,193,199,0.3))'
                                            : 'none',
                                        transition: 'filter 1s ease',
                                    }}
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Thin line separator */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{
                                scaleX: showText ? 1 : 0,
                                opacity: showText ? 1 : 0,
                            }}
                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                            className="mt-10"
                            style={{
                                width: 60,
                                height: 1,
                                background: 'rgba(255,255,255,0.2)',
                            }}
                        />

                        {/* Title */}
                        <div className="overflow-hidden mt-6">
                            <motion.h1
                                initial={{ y: '100%' }}
                                animate={{ y: showText ? '0%' : '100%' }}
                                transition={{
                                    duration: 0.7,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                    delay: 0.15,
                                }}
                                className="text-xl md:text-3xl font-light uppercase text-white"
                                style={{ letterSpacing: '0.4em' }}
                            >
                                Volunteam
                            </motion.h1>
                        </div>

                        {/* Tagline */}
                        <div className="overflow-hidden mt-2">
                            <motion.p
                                initial={{ y: '100%' }}
                                animate={{ y: showText ? '0%' : '100%' }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                    delay: 0.35,
                                }}
                                className="text-[10px] md:text-xs uppercase text-white/30 font-light"
                                style={{ letterSpacing: '0.3em' }}
                            >
                                Where Skills Meet Purpose
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LineDrawAnimation;
