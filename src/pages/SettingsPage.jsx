import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, Trash2, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
    const queryClient = useQueryClient();
    const [editingId, setEditingId] = useState(null);

    const { data: habits = [], isLoading } = useQuery({
        queryKey: ['habits'],
        queryFn: () => base44.entities.Habit.list('-created_date'),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.Habit.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habits'] }),
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.Habit.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habits'] }),
    });

    return (
        <div className="px-5 pt-14">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="font-jakarta font-bold text-3xl text-foreground tracking-tight">
                    Settings
                </h1>
                <p className="font-jakarta text-sm text-muted-foreground mt-1">
                    Manage your habits & reminders.
                </p>
            </motion.div>

            {/* Reminders section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="flex items-center gap-2 mb-4">
                    <Bell className="w-4 h-4 text-primary" />
                    <h2 className="font-jakarta font-semibold text-base text-foreground">Reminders</h2>
                </div>

                {isLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 rounded-2xl bg-secondary/50 animate-pulse" />
                        ))}
                    </div>
                ) : habits.length === 0 ? (
                    <p className="font-jakarta text-sm text-muted-foreground py-8 text-center">
                        No habits yet. Create some on the Dashboard.
                    </p>
                ) : (
                    <div className="space-y-3">
                        <AnimatePresence>
                            {habits.map((habit, i) => (
                                <motion.div
                                    key={habit.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-card rounded-2xl p-4 shadow-[4px_4px_12px_rgba(0,0,0,0.03),-4px_-4px_12px_rgba(255,255,255,0.7)]"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-jakarta font-medium text-sm text-foreground truncate">
                                                {habit.name}
                                            </h3>
                                            <p className="font-jakarta text-xs text-muted-foreground capitalize mt-0.5">
                                                {habit.frequency}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {/* Time picker toggle */}
                                            <button
                                                onClick={() => setEditingId(editingId === habit.id ? null : habit.id)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                <Clock className="w-3.5 h-3.5" />
                                                <span className="font-jakarta text-xs font-medium">
                          {habit.reminder_time || 'Set time'}
                        </span>
                                                <ChevronRight className={`w-3 h-3 transition-transform ${editingId === habit.id ? 'rotate-90' : ''}`} />
                                            </button>

                                            {/* Delete */}
                                            <button
                                                onClick={() => deleteMutation.mutate(habit.id)}
                                                className="p-2 rounded-xl text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded time picker */}
                                    <AnimatePresence>
                                        {editingId === habit.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-3 mt-3 border-t border-border/50">
                                                    <label className="font-jakarta text-xs text-muted-foreground mb-2 block">
                                                        Reminder time
                                                    </label>
                                                    <Input
                                                        type="time"
                                                        value={habit.reminder_time || ''}
                                                        onChange={(e) => {
                                                            updateMutation.mutate({
                                                                id: habit.id,
                                                                data: { reminder_time: e.target.value },
                                                            });
                                                        }}
                                                        className="h-11 rounded-xl bg-secondary/50 border-0 font-jakarta text-sm"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>

            {/* App info */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-12 text-center"
            >
                <p className="font-jakarta text-xs text-muted-foreground/50">
                    Sprout · Grow with intention
                </p>
            </motion.div>
        </div>
    );
}