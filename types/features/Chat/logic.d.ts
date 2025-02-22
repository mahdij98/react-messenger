import React from "react";
import { ContextMenuItem } from "../../components/ContextMenu/ContextMenu";
import { MessageEntity } from "../../domain/MessageEntity";
import { UserInterface } from "../../ts/interfaces";
declare const Logic: ({ user, messages, updateMessages, onMessageSent, onEditMessage, onDeleteMessage, }: {
    messages: MessageEntity[];
    user: UserInterface;
    updateMessages: (messages: MessageEntity[]) => void;
    onMessageSent: (message: MessageEntity) => void;
    onDeleteMessage: (id: string) => void;
    onEditMessage: (id: string) => void;
}) => {
    handleDeleteConfirmation: () => void;
    handleCloseContextMenu: () => void;
    contextMenuItems: ContextMenuItem[];
    handleSendFile: (file: Blob) => void;
    handleSendVoice: (voiceBlobUrl: string) => void;
    handleSendMessage: (text: string) => void;
    handleContextMenu: (event: React.MouseEvent, message: MessageEntity) => void;
    isModalOpen: boolean;
    contextMenu: {
        x: number;
        y: number;
        message: MessageEntity | null;
    } | null;
    chatRef: React.RefObject<HTMLDivElement | null>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default Logic;
