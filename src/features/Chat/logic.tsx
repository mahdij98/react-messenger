import React, { useRef, useState } from "react";
import { Check, Copy, Edit, Trash } from "react-feather";
import { ContextMenuItem } from "../../components/ContextMenu/ContextMenu";
import { MessageEntity } from "../../domain/MessageEntity";
import { AttachmentTypeEnum } from "../../ts/enum";
import { UserInterface } from "../../ts/interfaces";

const Logic = ({
  user,
  messages,
  updateMessages,
  onMessageSent,
  onEditMessage,
  onDeleteMessage,
}: {
  messages: MessageEntity[];
  user: UserInterface;
  updateMessages: (messages: MessageEntity[]) => void;
  onMessageSent: (message: MessageEntity) => void;
  onDeleteMessage: (id: string) => void;
  onEditMessage: (id: string) => void;
}) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    message: MessageEntity | null;
  } | null>(null);

  const moveScrollBarToBottom = () => {
    setTimeout(() => {
      if (chatRef.current)
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, 100);
  };

  const handleContextMenu = (
    event: React.MouseEvent,
    message: MessageEntity
  ) => {
    event.preventDefault();
    if (!chatRef.current) return;

    const rect = chatRef.current.getBoundingClientRect();

    setContextMenu({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      message,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleSendMessage = (text: string) => {
    const newMessage = new MessageEntity({
      id: new Date().toString(),
      text,
      user,
      isRightSided: true,
      createdDate: new Date().toString(),
    });
    updateMessages([...messages, newMessage]);
    onMessageSent(newMessage);
    moveScrollBarToBottom();
  };

  const handleSendVoice = (voiceBlobUrl: string) => {
    const newMessage = new MessageEntity({
      id: new Date().toString(),
      text: "",
      attachment: voiceBlobUrl,
      attachmentType: AttachmentTypeEnum.Voice,
      user,
      isRightSided: true,
      createdDate: new Date().toString(),
    });
    updateMessages([...messages, newMessage]);
    onMessageSent(newMessage);
    moveScrollBarToBottom();
  };

  const handleSendFile = (file: Blob) => {
    const fileUrl = URL.createObjectURL(file);

    const newMessage = new MessageEntity({
      id: new Date().toString(),
      text: "",
      attachment: fileUrl,
      attachmentType: AttachmentTypeEnum.File,
      user,
      isRightSided: true,
      createdDate: new Date().toString(),
    });

    updateMessages([...messages, newMessage]);
    onMessageSent(newMessage);
    moveScrollBarToBottom();
  };

  const contextMenuItems: ContextMenuItem[] = [
    {
      name: "Edit",
      icon: <Edit className="text-gray-600" />,
      onlyCurrentUserMessage: true,
      onClick: (id: string) => {
        console.log("Edit clicked");
        handleCloseContextMenu();
        onEditMessage(id);
      },
    },
    {
      name: "Delete",
      icon: <Trash className="text-red-600" />,
      onlyCurrentUserMessage: true,
      onClick: (id: string) => {
        setMessageToDelete(id);
        setIsModalOpen(true);
        handleCloseContextMenu();
      },
    },
    {
      name: "Select",
      icon: <Check className="text-green-600" />,
      onClick: () => {
        console.log("Select clicked");
        handleCloseContextMenu();
      },
    },
    {
      name: "Copy",
      icon: <Copy className="text-blue-600" />,
      onClick: () => {
        console.log("Copy clicked");
        handleCloseContextMenu();
      },
    },
  ];

  const handleDeleteConfirmation = () => {
    if (messageToDelete) {
      onDeleteMessage(messageToDelete);
      setMessageToDelete(null);
    }
    setIsModalOpen(false);
  };
  return {
    handleDeleteConfirmation,
    handleCloseContextMenu,
    contextMenuItems,
    handleSendFile,
    handleSendVoice,
    handleSendMessage,
    handleContextMenu,
    isModalOpen,
    contextMenu,
    chatRef,
    setIsModalOpen,
  };
};

export default Logic;
