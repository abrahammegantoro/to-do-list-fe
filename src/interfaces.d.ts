type Todo = {
    id: number;
    text: string;
    category: string;
    date: string;
    priority_level: 'low' | 'medium' | 'high';
    completed: boolean;
};