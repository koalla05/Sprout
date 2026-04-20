import React from 'react';
import { motion } from 'framer-motion';
import PlantIcon, { getStage } from './PlantIcon';

const stageLabels = {
    seed: 'Seed',
    seedling: 'Seedling',
    sprout: 'Sprout',
    plant: 'Plant',
    bush: 'Bush',
    tree: 'Tree',
};

export default function GardenPlant({ habit, index }) {
    const stage = getStage(habit.current_streak || 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="flex flex-col items-center"
        >
            {/* Pot / ground area */}
            <div className="w-full aspect-square rounded-3xl bg-card shadow-[4px_4px_12px_rgba(0,0,0,0.04),-4px_-4px_12px_rgba(255,255,255,0.7)] flex items-center justify-center relative overflow-hidden">
                {/* Ground line */}
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-secondary/40 rounded-b-3xl" />
                <div className="relative z-10 -mt-2">
                    <PlantIcon streak={habit.current_streak || 0} size={56} />
                </div>
            </div>

            {/* Label */}
            <p className="mt-3 font-jakarta font-medium text-xs text-foreground text-center truncate w-full px-1">
                {habit.name}
            </p>
            <p className="font-jakarta text-[10px] text-muted-foreground mt-0.5 capitalize">
                {stageLabels[stage]}
            </p>
            {(habit.current_streak || 0) > 0 && (
                <p className="font-jakarta text-[10px] text-accent font-medium">
                    {habit.current_streak}d
                </p>
            )}
        </motion.div>
    );
}