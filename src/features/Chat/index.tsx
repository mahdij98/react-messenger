import { AnimatePresence } from "framer-motion";
import React from "react";
import ConfirmationModal from "../../components/ConformaitionModal/ConformationModal";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import ChatInput from "../../components/Input/Input";
import Media from "../../components/Media/Media";
import LeftSide from "../../components/Message/LeftSide/LeftSide";
import RightSide from "../../components/Message/RightSide/RightSide";
import { MessageEntity } from "../../domain/MessageEntity";
import "../../index.css";
import { SymbolAssignment, UserInterface } from "../../ts/interfaces";
import Logic from "./logic";
export interface ChatPropsInterface {
  messages: MessageEntity[];
  user: UserInterface;
  width?: string;
  height?: string;
  className?: string;
  backgroundImage?: string;
  style?: React.CSSProperties;
  updateMessages: (messages: MessageEntity[]) => void;
  onMessageSent: (message: MessageEntity) => void;
  dynamicSymbolAssignments?: SymbolAssignment<any>[];
  onDeleteMessage: (id: string) => void;
  onEditMessage: (id: string) => void;
}

const Chat = ({
  width = "400px",
  height = "600px",
  className,
  style,
  messages,
  user,
  updateMessages,
  onMessageSent,
  onDeleteMessage,
  onEditMessage,
  dynamicSymbolAssignments,
  backgroundImage,
}: ChatPropsInterface) => {
  const {
    handleDeleteConfirmation,
    handleCloseContextMenu,
    handleSendFile,
    handleSendVoice,
    handleSendMessage,
    handleContextMenu,
    contextMenuItems,
    isModalOpen,
    contextMenu,
    chatRef,
    setIsModalOpen,
  } = Logic({
    user,
    messages,
    updateMessages,
    onMessageSent,
    onEditMessage,
    onDeleteMessage,
  });

  return (
    <div
      className={`flex flex-col !bg-cover ${className}`}
      style={{
        width,
        height,
        background: "url(" + backgroundImage + ")",
        ...style,
      }}
      onClick={handleCloseContextMenu}
    >
      <div
        ref={chatRef}
        className={`flex flex-col gap-2 flex-1 p-3 pb-16  ${
          contextMenu ? "overflow-hidden pr-[22px]" : "overflow-y-scroll"
        }`}
      >
        <AnimatePresence>
          {messages.map((message, index) => {
            const media = message?.attachment ? (
              <Media
                key={index}
                attachment={message.attachment}
                attachmentType={message?.attachmentType}
              />
            ) : null;

            if (message.isRightSided)
              return (
                <RightSide
                  key={index}
                  media={media}
                  handleContextMenu={handleContextMenu}
                  message={message}
                />
              );

            const showUserProfile =
              messages[index - 1]?.user?.id !== message?.user?.id;

            return (
              <LeftSide
                showUserProfile={showUserProfile}
                key={index}
                media={media}
                handleContextMenu={handleContextMenu}
                message={message}
              />
            );
          })}
        </AnimatePresence>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirmation}
        header="Confirm Delete"
        question="Are you sure you want to delete this message?"
      />
      {contextMenu && contextMenu?.message?.id ? (
        <ContextMenu
          items={contextMenuItems}
          isVisible={Boolean(contextMenu)}
          messageId={String(contextMenu?.message.id)}
          isCurrentUserMessage={contextMenu?.message?.user.id === user.id}
          position={{
            x: contextMenu?.x,
            y: contextMenu?.y,
          }}
        />
      ) : null}
      <ChatInput
        onSendVoice={handleSendVoice}
        onSendMessage={handleSendMessage}
        onFileSend={handleSendFile}
        dynamicSymbolAssignments={dynamicSymbolAssignments}
      />
    </div>
  );
};

export default Chat;
