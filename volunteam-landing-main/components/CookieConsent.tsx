'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check local storage to see if cookies are already accepted/declined
        const consent = localStorage.getItem('volunteam-cookie-consent');
        if (!consent) {
            // Small delay for better UX before popping up the banner
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('volunteam-cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('volunteam-cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="cookie-banner"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 z-[300] max-w-sm"
                >
                    <div className="bg-[#0B1E2D]/85 backdrop-blur-2xl border border-[#49C1C7]/30 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)] relative overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#49C1C7]/15 blur-[50px] rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-xl">🍪</span>
                                <h3 className="text-[#49C1C7] text-[10px] font-black uppercase tracking-[0.3em]">Telemetry Protocol</h3>
                            </div>

                            <p className="text-gray-300 text-sm font-medium mb-6 leading-relaxed">
                                We use cookies to enhance your terminal experience, analyze network traffic, and optimize performance. Accept to initialize telemetry.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 bg-[#49C1C7] text-[#01121C] py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all hover:shadow-[0_0_20px_rgba(73,193,199,0.3)]"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 bg-[#01121C]/50 border border-white/20 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-white/50 hover:bg-white/10 transition-all"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
