import React from 'react';
import { IoClose } from 'react-icons/io5';
import Button from './Button';

interface ModalProps {
  name: string;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal = ({ name, onClose, onConfirm }: ModalProps) => {
  return (
    <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6 text-center">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
        aria-label="Close modal"
      >
        <IoClose size={24} />
      </button>

      <h1 className="text-2xl font-semibold text-gray-800">Do you want to time in?</h1>

      <div className="text-blue-600 text-2xl font-bold">{name}</div>

      <div className="flex justify-end gap-3 mt-4">
        <Button text="TIME-IN" className="bg-black-pearl-600" onClick={onConfirm} />
      </div>
    </div>
  );
};

export default Modal;
