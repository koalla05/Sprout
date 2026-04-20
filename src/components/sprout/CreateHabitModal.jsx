import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CreateHabitModal({ open, onClose, onSave }) {
    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState('daily');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!name.trim()) return;
        setSaving(true);
        await onSave({ name: name.trim(), frequency });
        setName('');
        setFrequency('daily');
        setSaving(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-[2rem] p-6 pb-10 shadow-[0_-8px_40px_rgba(0,0,0,0.08)] max-w-lg mx-auto"
                    >
                        {/* Handle */}
                        <div className="w-10 h-1 rounded-full bg-border mx-auto mb-6" />

                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-jakarta font-semibold text-xl text-foreground">New Habit</h2>
                            <button
                                onClick={onClose}
                                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Habit name */}
                        <div className="mb-6">
                            <label className="font-jakarta text-sm font-medium text-muted-foreground mb-2 block">
                                What is your new habit?
                            </label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Morning meditation"
                                className="h-14 rounded-2xl bg-secondary/50 border-0 font-jakarta text-base px-5 focus-visible:ring-primary/30 placeholder:text-muted-foreground/50"
                                autoFocus
                                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                            />
                        </div>

                        {/* Frequency */}
                        <div className="mb-8">
                            <label className="font-jakarta text-sm font-medium text-muted-foreground mb-3 block">
                                Frequency
                            </label>
                            <div className="flex gap-3">
                                {['daily', 'weekly'].map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFrequency(f)}
                                        className={`
                      flex-1 h-12 rounded-2xl font-jakarta font-medium text-sm capitalize transition-all duration-300
                      ${frequency === f
                                            ? 'bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(90,130,100,0.25)]'
                                            : 'bg-secondary text-muted-foreground hover:text-foreground'
                                        }
                    `}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Save button */}
                        <Button
                            onClick={handleSave}
                            disabled={!name.trim() || saving}
                            className="w-full h-14 rounded-2xl font-jakarta font-semibold text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_4px_16px_rgba(90,130,100,0.3)] transition-all duration-300 disabled:opacity-40"
                        >
                            {saving ? 'Planting...' : 'Plant this habit'}
                        </Button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}