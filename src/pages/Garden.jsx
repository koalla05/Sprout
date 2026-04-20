import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import GardenPlant from '@/components/sprout/GardenPlant';

export default function Garden() {
    const { data: habits = [], isLoading } = useQuery({
        queryKey: ['habits'],
        queryFn: () => base44.entities.Habit.list('-current_streak'),
    });

    const totalStreak = habits.reduce((sum, h) => sum + (h.current_streak || 0), 0);
    const activePlants = habits.filter(h => (h.current_streak || 0) > 0).length;

    return (
        <div className="px-5 pt-14">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="font-jakarta font-bold text-3xl text-foreground tracking-tight">
                    My Garden
                </h1>
                <p className="font-jakarta text-sm text-muted-foreground mt-1">
                    Your habits, growing beautifully.
                </p>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-3 gap-3 mb-8"
            >
                <div className="bg-card rounded-2xl p-4 shadow-[4px_4px_12px_rgba(0,0,0,0.03),-4px_-4px_12px_rgba(255,255,255,0.7)] text-center">
                    <p className="font-jakarta font-bold text-2xl text-foreground">{habits.length}</p>
                    <p className="font-jakarta text-[11px] text-muted-foreground mt-1">Total</p>
                </div>
                <div className="bg-card rounded-2xl p-4 shadow-[4px_4px_12px_rgba(0,0,0,0.03),-4px_-4px_12px_rgba(255,255,255,0.7)] text-center">
                    <p className="font-jakarta font-bold text-2xl text-primary">{activePlants}</p>
                    <p className="font-jakarta text-[11px] text-muted-foreground mt-1">Active</p>
                </div>
                <div className="bg-card rounded-2xl p-4 shadow-[4px_4px_12px_rgba(0,0,0,0.03),-4px_-4px_12px_rgba(255,255,255,0.7)] text-center">
                    <p className="font-jakarta font-bold text-2xl text-accent">{totalStreak}</p>
                    <p className="font-jakarta text-[11px] text-muted-foreground mt-1">Total Days</p>
                </div>
            </motion.div>

            {/* Garden grid */}
            {isLoading ? (
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-square rounded-3xl bg-secondary/50 animate-pulse" />
                    ))}
                </div>
            ) : habits.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center pt-16"
                >
                    <p className="font-jakarta text-muted-foreground">
                        Your garden is empty. Plant some habits!
                    </p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {habits.map((habit, i) => (
                        <GardenPlant key={habit.id} habit={habit} index={i} />
                    ))}
                </div>
            )}
        </div>
    );
}