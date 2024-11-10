import { useModal } from '../hooks/useModalStore';
import { useCallback, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';
import api from '../api/axios';

export const Modal = () => {
    const { type, data, isOpen, onClose } = useModal();

    const confirmText = type === 'delete'
        ? "Are you sure you want to delete this item?"
        : type === 'update'
            ? "Are you sure you want to update this item?"
            : "Are you sure you want to cancel your changes?";

    const isModalOpen = isOpen;

    const [, setShowModal] = useState(isOpen);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        setShowModal(isModalOpen);
    }, [isModalOpen]);

    useEffect(() => {
        if (isSubmit) {
            toast.loading("Loading...");
        } else {
            toast.dismiss();
        }
    }, [isSubmit]);

    const handleClose = useCallback(() => {
        if (isSubmit) return;
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [isSubmit, onClose]);

    const handleSubmit = async () => {
        setIsSubmit(true);
        try {
            if (type === "delete") {
                await api.delete(`/todos/${data.todo?.id}`)
            }  else if (type === "update") {
                const inputDate = new Date(data.todo?.date ?? "")
                
                await api.put(`/todos/${data.todo?.id}`, {
                    text: data.todo?.text,
                    category: data.todo?.category,
                    date: inputDate,
                    priority_level: data.todo?.priority_level,
                    completed: data.todo?.completed
                })
            } else {
                window.location.href = "/";
            }

            onClose()
            setTimeout(() => {
                toast.success("Success!");
            }, 1000);
            if (type === "delete") {
                window.location.reload();
            } else {
                window.location.href = "/";
            }
        } catch (error) {
            setTimeout(() => {
                toast.error("Failed to submit");
            }, 500);
            console.error(error)
        } finally {
            setIsSubmit(false);
        }
    }

    if (!isModalOpen) {
        return null;
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative flex flex-col items-center justify-center bg-white p-7 rounded-xl">
                    <button
                        onClick={handleClose}
                        className="absolute p-1 rounded-full right-4 top-3 focus:outline-none hover:bg-gray-100"
                    >
                        <IoMdClose size={30} />
                    </button>
                    {type !== "cancel" && (
                        <div className="px-10 py-1 text-white bg-pink-500 rounded-2xl">{data.todo?.id} - {data.todo?.text}</div>
                    )}
                    <div className="mt-4 text-2xl font-semibold text-black font-poppins">{confirmText}</div>
                    <div className="flex mt-4 gap-7">
                        <button
                            className={`px-10 py-1 text-base border rounded-lg ${type === 'update'
                                ? 'text-white bg-purple-600 border-purple-600 hover:bg-purple-500'
                                : 'text-red-500 border-red-500 hover:bg-red-600 hover:text-white'
                                }`}
                            onClick={handleClose}
                        >
                            No
                        </button>
                        <button
                            className={`px-10 py-1 text-base border rounded-lg ${type === 'update'
                                ? 'text-white bg-purple-500 border-purple-500 hover:bg-purple-500'
                                : 'text-white bg-red-500 border-red-500 hover:bg-red-600'
                                }`}
                            onClick={handleSubmit}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}