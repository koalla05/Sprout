import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlantIcon, { getStage } from './PlantIcon';
import { Check } from 'lucide-react';

const stageLabels = {
    seed: 'Seed',
    seedling: 'Seedling',
    sprout: 'Sprout',
    plant: 'Plant',
    bush: 'Bush',
    tree: 'Tree',
};

export default function HabitCard({ habit, onComplete, onUncomplete, isCompletedToday }) {
    const [justCompleted, setJustCompleted] = useState(false);
    const stage = getStage(habit.current_streak || 0);

    const handleTap = () => {
        if (isCompletedToday) {
            onUncomplete(habit);
            return;
        }
        if (justCompleted) return;
        setJustCompleted(true);
        onComplete(habit);
        setTimeout(() => setJustCompleted(false), 2000);
    };

    const done = isCompletedToday || justCompleted;

    return (
        <motion.button
            onClick={handleTap}
            whileTap={!done ? { scale: 0.97 } : {}}
            className={`
        w-full text-left rounded-3xl p-5 transition-all duration-500 relative overflow-hidden
        ${done
                ? 'bg-primary/10 shadow-[0_4px_20px_rgba(90,130,100,0.18)]'
                : 'bg-card shadow-[6px_6px_20px_rgba(0,0,0,0.09),-6px_-6px_16px_rgba(255,255,255,0.9)] border border-border/60'
            }
      `}
        >
            {/* Soft glow when completed */}
            <AnimatePresence>
                {justCompleted && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 bg-primary/5 rounded-3xl"
                    />
                )}
            </AnimatePresence>

            <div className="flex items-center gap-4 relative z-10">
                {/* Plant icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center border border-border/50">
                    <PlantIcon streak={habit.current_streak || 0} size={40} animate={justCompleted} />
                </div>

                {/* Habit info */}
                <div className="flex-1 min-w-0">
                    <h3 className={`font-jakarta font-semibold text-base tracking-tight ${done ? 'text-primary' : 'text-foreground'}`}>
                        {habit.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-jakarta font-medium text-muted-foreground capitalize">
              {stageLabels[stage]}
            </span>
                        {(habit.current_streak || 0) > 0 && (
                            <>
                                <span className="text-muted-foreground/40">·</span>
                                <span className="text-xs font-jakarta font-medium text-accent">
                  {habit.current_streak} day{habit.current_streak !== 1 ? 's' : ''}
                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Check circle */}
                <motion.div
                    className={`
            flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300
            ${done
                        ? 'bg-primary text-primary-foreground'
                        : 'border-2 border-border'
                    }
          `}
                    animate={justCompleted ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.4 }}
                >
                    <AnimatePresence>
                        {done && (
                            <motion.div
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            >
                                <Check className="w-5 h-5" strokeWidth={2.5} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Streak progress bar */}
            {(habit.current_streak || 0) > 0 && (
                <div className="mt-4 relative z-10">
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary/40 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(((habit.current_streak || 0) / 30) * 100, 100)}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                    </div>
                </div>
            )}
        </motion.button>
    );
}