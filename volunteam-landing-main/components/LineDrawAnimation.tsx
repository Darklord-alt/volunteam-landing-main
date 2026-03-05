'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';


const LineDrawAnimation = ({ onComplete }: { onComplete?: () => void }) => {
    const [stage, setStage] = useState('draw');

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage('reveal'), 1500),
            setTimeout(() => setStage('glow'), 2500),
            setTimeout(() => setStage('fade'), 3500),
            setTimeout(() => onComplete?.(), 4000)
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <AnimatePresence>
            {stage !== 'fade' && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 w-screen h-screen bg-[#01121C] flex flex-col justify-center items-center z-[9999]"
                >
                    <div className="relative flex flex-col items-center">
                        {/* Glowing backdrop circle */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: stage === 'glow' ? 2 : 1.5,
                                opacity: stage === 'glow' ? 0.3 : 0.1
                            }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#49C1C7] blur-[40px] pointer-events-none"
                        />

                        {/* Logo Image */}
                        <motion.div
                            initial={{ y: 20, opacity: 0, scale: 0.8 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                            className="relative z-10 p-6 md:p-8 rounded-full bg-[#01121C]/50 backdrop-blur-md border border-white/10 shadow-2xl"
                        >
                            <div className="relative w-24 h-24 md:w-32 md:h-32">
                                <Image
                                    src="/logo.png"
                                    alt="Volunteam"
                                    fill
                                    className="object-contain drop-shadow-[0_0_15px_rgba(73,193,199,0.5)]"
                                />
                            </div>
                        </motion.div>

                        {/* Title Text */}
                        <motion.h1
                            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                            animate={{
                                opacity: stage === 'glow' ? 1 : (stage === 'reveal' ? 0.8 : 0),
                                y: 0,
                                filter: 'blur(0px)'
                            }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mt-8 text-3xl md:text-5xl font-black text-white tracking-[0.2em] uppercase relative z-10"
                        >
                            VOLUNTEAM
                        </motion.h1>

                        {/* Subheading */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: stage === 'glow' ? 1 : 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="mt-4 text-[#EEAB40] text-xs font-black tracking-widest uppercase relative z-10"
                        >
                            <span className="inline-block border-t border-b border-[#EEAB40]/30 py-1 px-4">Initializing Systems</span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LineDrawAnimation;
