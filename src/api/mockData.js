// Mock data for local development
let mockHabits = [
    {
        id: '1',
        name: 'Morning Exercise',
        frequency: 'daily',
        created_date: new Date('2024-01-15'),
        current_streak: 5,
        longest_streak: 12,
        total_completions: 28,
        last_completed: new Date().toISOString().split('T')[0],
        reminder_time: '07:00',
        plant_type: 'sunflower'
    },
    {
        id: '2',
        name: 'Read a Book',
        frequency: 'daily',
        created_date: new Date('2024-02-01'),
        current_streak: 3,
        longest_streak: 8,
        total_completions: 15,
        last_completed: null,
        reminder_time: '20:00',
        plant_type: 'rose'
    },
    {
        id: '3',
        name: 'Meditate',
        frequency: 'daily',
        created_date: new Date('2024-01-20'),
        current_streak: 0,
        longest_streak: 10,
        total_completions: 22,
        last_completed: null,
        reminder_time: '18:00',
        plant_type: 'tulip'
    }
];

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    entities: {
        Habit: {
            // List habits with optional sorting
            list: async (sortBy = '-created_date') => {
                await delay();
                let result = [...mockHabits];
                
                // Simple sorting logic
                if (sortBy === '-created_date') {
                    result.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
                } else if (sortBy === 'created_date') {
                    result.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
                } else if (sortBy === '-current_streak') {
                    result.sort((a, b) => (b.current_streak || 0) - (a.current_streak || 0));
                } else if (sortBy === 'current_streak') {
                    result.sort((a, b) => (a.current_streak || 0) - (b.current_streak || 0));
                }
                
                return result;
            },
            
            // Get a single habit
            get: async (id) => {
                await delay();
                const habit = mockHabits.find(h => h.id === id);
                if (!habit) {
                    throw new Error(`Habit with id ${id} not found`);
                }
                return habit;
            },
            
            // Create a new habit
            create: async (data) => {
                await delay();
                const newHabit = {
                    id: String(Date.now()),
                    ...data,
                    created_date: new Date(),
                    current_streak: 0,
                    longest_streak: 0,
                    total_completions: 0,
                    last_completed: null,
                };
                mockHabits.push(newHabit);
                return newHabit;
            },
            
            // Update an existing habit
            update: async (id, data) => {
                await delay();
                const index = mockHabits.findIndex(h => h.id === id);
                if (index === -1) {
                    throw new Error(`Habit with id ${id} not found`);
                }
                
                mockHabits[index] = {
                    ...mockHabits[index],
                    ...data,
                    id, // preserve the id
                    created_date: mockHabits[index].created_date, // preserve creation date
                };
                
                return mockHabits[index];
            },
            
            // Delete a habit
            delete: async (id) => {
                await delay();
                const index = mockHabits.findIndex(h => h.id === id);
                if (index === -1) {
                    throw new Error(`Habit with id ${id} not found`);
                }
                
                const deletedHabit = mockHabits[index];
                mockHabits.splice(index, 1);
                return deletedHabit;
            }
        }
    },
    
    // Mock authentication
    auth: {
        me: async () => {
            await delay();
            return {
                id: 'user-1',
                name: 'Local User',
                email: 'user@local.dev'
            };
        }
    }
};

export default mockApi;
