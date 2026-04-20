import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlantIcon from './PlantIcon';

export default function SuccessOverlay({ show, habit, onClose }) {
    return (
        <AnimatePresence>
            {show && habit && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/10 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 10 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-card rounded-[2rem] p-8 mx-6 max-w-sm w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative overflow-hidden"
                    >
                        {/* Radial glow */}
                        <div className="absolute inset-0 bg-gradient-radial from-primary/8 via-transparent to-transparent" />

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Plant animation */}
                            <motion.div
                                className="mx-auto mb-6 w-24 h-24 rounded-3xl bg-secondary/50 flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
                            >
                                <PlantIcon streak={(habit.current_streak || 0) + 1} size={64} animate />
                            </motion.div>

                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="font-jakarta font-bold text-2xl text-foreground mb-2"
                            >
                                Beautiful!
                            </motion.h2>

                            {/* Habit name */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="font-jakarta text-muted-foreground mb-4"
                            >
                                {habit.name}
                            </motion.p>

                            {/* Streak badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, type: 'spring' }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary font-jakarta font-semibold text-sm"
                            >
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                {(habit.current_streak || 0) + 1}-Day Streak
                            </motion.div>

                            {/* Dismiss */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9 }}
                                onClick={onClose}
                                className="mt-8 font-jakarta text-sm text-muted-foreground hover:text-foreground transition-colors block mx-auto"
                            >
                                Tap to continue
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}