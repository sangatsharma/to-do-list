import React, { ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const CustomModal: React.FunctionComponent<IModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 p-2 z-50 transition-all duration-1000 flex items-center justify-center bg-black/85">
      <div
        ref={modalRef}
        className="relative bg-white w-full max-w-lg rounded-lg shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        {/* Content */}
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default CustomModal;
