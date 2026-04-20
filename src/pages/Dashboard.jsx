import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import HabitCard from '@/components/sprout/HabitCard';
import CreateHabitModal from '@/components/sprout/CreateHabitModal';
import SuccessOverlay from '@/components/sprout/SuccessOverlay';

export default function Dashboard() {
    const [showCreate, setShowCreate] = useState(false);
    const [successHabit, setSuccessHabit] = useState(null);
    const queryClient = useQueryClient();
    const today = format(new Date(), 'yyyy-MM-dd');

    const { data: habits = [], isLoading } = useQuery({
        queryKey: ['habits'],
        queryFn: () => base44.entities.Habit.list('-created_date'),
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.Habit.create(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habits'] }),
    });

    const completeMutation = useMutation({
        mutationFn: async (habit) => {
            const newStreak = (habit.current_streak || 0) + 1;
            return base44.entities.Habit.update(habit.id, {
                current_streak: newStreak,
                longest_streak: Math.max(newStreak, habit.longest_streak || 0),
                total_completions: (habit.total_completions || 0) + 1,
                last_completed: today,
            });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habits'] }),
    });

    const uncompleteMutation = useMutation({
        mutationFn: async (habit) => {
            return base44.entities.Habit.update(habit.id, {
                current_streak: Math.max((habit.current_streak || 0) - 1, 0),
                total_completions: Math.max((habit.total_completions || 0) - 1, 0),
                last_completed: null,
            });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habits'] }),
    });

    const handleComplete = (habit) => {
        setSuccessHabit(habit);
        completeMutation.mutate(habit);
    };

    const handleUncomplete = (habit) => {
        uncompleteMutation.mutate(habit);
    };

    const completedCount = habits.filter(h => h.last_completed === today).length;
    const totalCount = habits.length;

    return (
        <div className="px-5 pt-14">
            {/* Header */}
            <div className="mb-8">
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-jakarta text-sm font-medium text-muted-foreground mb-1"
                >
                    {format(new Date(), 'EEEE, MMMM d')}
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="font-jakarta font-bold text-3xl text-foreground tracking-tight"
                >
                    Your Garden
                </motion.h1>

                {/* Progress indicator */}
                {totalCount > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="mt-4 flex items-center gap-3"
                    >
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                            />
                        </div>
                        <span className="font-jakarta text-sm font-semibold text-primary">
              {completedCount}/{totalCount}
            </span>
                    </motion.div>
                )}
            </div>

            {/* Habits list */}
            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 rounded-3xl bg-secondary/50 animate-pulse" />
                    ))}
                </div>
            ) : habits.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center pt-20"
                >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-secondary/50 flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 48 48" fill="none" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40">
                            <path d="M24 38v-16" />
                            <path d="M24 28c-4-6-10-5-10-5s1 7 7 9" />
                        </svg>
                    </div>
                    <h3 className="font-jakarta font-semibold text-lg text-foreground mb-2">
                        Start your garden
                    </h3>
                    <p className="font-jakarta text-sm text-muted-foreground max-w-[240px] mx-auto">
                        Plant your first habit seed and watch it grow with consistency.
                    </p>
                </motion.div>
            ) : (
                <div className="space-y-3">
                    <AnimatePresence>
                        {habits.map((habit, i) => (
                            <motion.div
                                key={habit.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                            >
                                <HabitCard
                                    habit={habit}
                                    onComplete={handleComplete}
                                    onUncomplete={handleUncomplete}
                                    isCompletedToday={habit.last_completed === today}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* FAB */}
            <motion.button
                onClick={() => setShowCreate(true)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-[0_6px_24px_rgba(90,130,100,0.35)] flex items-center justify-center z-30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
            >
                <Plus className="w-6 h-6" strokeWidth={2.5} />
            </motion.button>

            {/* Create modal */}
            <CreateHabitModal
                open={showCreate}
                onClose={() => setShowCreate(false)}
                onSave={(data) => createMutation.mutateAsync(data)}
            />

            {/* Success overlay */}
            <SuccessOverlay
                show={!!successHabit}
                habit={successHabit}
                onClose={() => setSuccessHabit(null)}
            />
        </div>
    );
}