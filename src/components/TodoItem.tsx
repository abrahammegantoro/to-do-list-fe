import React from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { useModal } from '../hooks/useModalStore';

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const { onOpen } = useModal();

    return (
        <div
            className={`flex items-center p-2 border-b border-gray-200 ${todo.completed ? 'opacity-50' : ''}`}
        >
            <input
                type="checkbox"
                checked={todo.completed}
                onClick={() => onOpen("update", {
                    todo: {
                        ...todo,
                        completed: !todo.completed
                    }
                })}
                className="mr-2 accent-purple-500"
            />
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-start justify-start">
                    <p className={`${todo.completed ? 'line-through' : ''}`}>{todo.text}</p>
                    <p className="text-xs text-gray-500">{todo.category} • {todo.date.split("T")[0]}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`px-4 py-1 text-sm font-semibold text-white rounded-xl ${todo.priority_level === "low" ? "bg-green-500" : todo.priority_level === "medium" ? "bg-yellow-500" : "bg-red-500"}`}>{todo.priority_level.toUpperCase()}</div>
                    <button type="submit" onClick={() => onOpen("delete", { todo: todo })}>
                        <FaTrashAlt className="text-lg text-red-500" />
                    </button>
                    <a href={`/edit/${todo.id}`}>
                        <FaRegEdit className="text-lg text-purple-700" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
