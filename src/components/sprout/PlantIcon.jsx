import React from 'react';
import { motion } from 'framer-motion';

// Growth stages based on streak count
function getStage(streak) {
    if (streak >= 30) return 'tree';
    if (streak >= 14) return 'bush';
    if (streak >= 7) return 'plant';
    if (streak >= 3) return 'sprout';
    if (streak >= 1) return 'seedling';
    return 'seed';
}

function SeedIcon({ size }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="24" cy="30" rx="8" ry="10" className="text-accent" fill="currentColor" opacity="0.2" stroke="currentColor" />
            <path d="M24 20v-4" className="text-primary" stroke="currentColor" opacity="0.3" />
        </svg>
    );
}

function SeedlingIcon({ size }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M24 38v-16" className="text-primary" stroke="currentColor" />
            <path d="M24 28c-4-6-10-5-10-5s1 7 7 9" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.35" />
        </svg>
    );
}

function SproutIcon({ size }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M24 40v-20" className="text-primary" stroke="currentColor" />
            <path d="M24 28c-5-7-12-6-12-6s1 8 8 10" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.35" />
            <path d="M24 22c5-6 11-5 11-5s-1 7-7 9" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.35" />
        </svg>
    );
}

function PlantIconSvg({ size }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M24 42v-26" className="text-primary" stroke="currentColor" />
            <path d="M24 30c-6-8-14-7-14-7s2 9 10 11" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.4" />
            <path d="M24 22c6-7 13-6 13-6s-2 8-9 10" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.4" />
            <path d="M24 16c-4-5-9-4-9-4s1 6 6 7" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.3" />
            <circle cx="24" cy="11" r="2" className="text-accent" fill="currentColor" opacity="0.4" />
        </svg>
    );
}

function BushIcon({ size }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M24 44v-28" className="text-primary" stroke="currentColor" />
            <path d="M24 34c-7-8-16-7-16-7s2 10 12 11" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.4" />
            <path d="M24 26c7-8 15-7 15-7s-2 10-11 11" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.4" />
            <path d="M24 20c-5-6-11-5-11-5s1 7 8 8" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.35" />
            <path d="M24 14c4-5 9-4 9-4s-1 6-6 7" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.3" />
            <circle cx="20" cy="12" r="1.5" className="text-accent" fill="currentColor" opacity="0.5" />
            <circle cx="30" cy="18" r="1.5" className="text-accent" fill="currentColor" opacity="0.5" />
        </svg>
    );
}

function TreeIcon({ size }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M24 46v-32" className="text-primary" stroke="currentColor" strokeWidth="2.2" />
            <path d="M24 36c-8-8-18-7-18-7s3 10 14 11" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.45" />
            <path d="M24 36c8-8 17-7 17-7s-3 10-13 11" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.45" />
            <path d="M24 26c-7-7-14-6-14-6s2 9 10 10" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.38" />
            <path d="M24 26c7-7 13-6 13-6s-2 9-9 10" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.38" />
            <path d="M24 18c-5-6-10-5-10-5s1 7 7 8" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.32" />
            <path d="M24 18c5-6 10-5 10-5s-1 7-7 8" className="text-primary" stroke="currentColor" fill="currentColor" opacity="0.3" />
            <circle cx="18" cy="14" r="2" className="text-accent" fill="currentColor" opacity="0.6" />
            <circle cx="30" cy="20" r="1.8" className="text-accent" fill="currentColor" opacity="0.5" />
            <circle cx="22" cy="10" r="1.5" className="text-accent" fill="currentColor" opacity="0.4" />
        </svg>
    );
}

const iconMap = {
    seed: SeedIcon,
    seedling: SeedlingIcon,
    sprout: SproutIcon,
    plant: PlantIconSvg,
    bush: BushIcon,
    tree: TreeIcon,
};

export default function PlantIcon({ streak = 0, size = 48, animate = false }) {
    const stage = getStage(streak);
    const Icon = iconMap[stage];

    if (animate) {
        return (
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
                <Icon size={size} />
            </motion.div>
        );
    }

    return <Icon size={size} />;
}

export { getStage };