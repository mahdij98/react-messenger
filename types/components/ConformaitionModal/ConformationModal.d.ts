import React from "react";
interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    header: string;
    question: string;
}
declare const ConfirmationModal: React.FC<ConfirmationModalProps>;
export default ConfirmationModal;
