import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Flower2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { path: '/', icon: Home, label: 'Today' },
    { path: '/garden', icon: Flower2, label: 'Garden' },
    { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function BottomNav() {
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-xl border-t border-border/50 pb-safe">
            <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-4">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="flex flex-col items-center gap-0.5 py-2 px-6 relative"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute -top-0.5 w-8 h-1 rounded-full bg-primary"
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                />
                            )}
                            <Icon
                                className={`w-5 h-5 transition-colors duration-200 ${
                                    isActive ? 'text-primary' : 'text-muted-foreground'
                                }`}
                                strokeWidth={isActive ? 2.2 : 1.6}
                            />
                            <span
                                className={`font-jakarta text-[11px] font-medium transition-colors duration-200 ${
                                    isActive ? 'text-primary' : 'text-muted-foreground'
                                }`}
                            >
                {item.label}
              </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}