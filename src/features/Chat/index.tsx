import { AnimatePresence } from "framer-motion";
import React from "react";
import ConfirmationModal from "../../components/ConformaitionModal/ConformationModal";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import ChatInput from "../../components/Input/Input";
import Media from "../../components/Media/Media";
import LeftSide from "../../components/Message/LeftSide/LeftSide";
import RightSide from "../../components/Message/RightSide/RightSide";
import Spinner from "../../components/Spinner/Spinner";
import { MessageEntity } from "../../domain/MessageEntity";
import "../../index.css";
import { AttachmentTypeEnum, ChatThemEntity } from "../../ts/enum";
import {
  ChatUploadProgresInterface,
  SymbolAssignmentInterface,
  UserInterface,
} from "../../ts/interfaces";
import Logic from "./logic";
export interface ChatPropsInterface {
  messages: MessageEntity[];
  user: UserInterface;
  width?: string;
  height?: string;
  isLoadingChat?: boolean;
  isSendingDefultForNewMessage?: boolean;
  isSendingDefultForEdited?: boolean;
  className?: string;
  backgroundImage?: string;
  style?: React.CSSProperties;
  updateMessages: (messages: MessageEntity[]) => void;
  onMessageSent: (message: MessageEntity) => void;
  dynamicSymbolAssignments?: SymbolAssignmentInterface<{
    name: string;
    id: string;
  }>[];
  onDynamicSymbolListSet?: (value: string, id: string, symbol?: string) => void;
  onDynamicSymbolListDelete?: (id: string, symbol?: string) => void;
  onDeleteMessage: (id: string) => void;
  onEditMessage: (message: MessageEntity) => void;
  them?: ChatThemEntity;
  messageBubbleBiggerSize?: boolean;
  uploadProgress?: ChatUploadProgresInterface[];
  onUploadCancellationToken?: (id: string) => void;
}

const Chat = ({
  width = "400px",
  height = "600px",
  isLoadingChat,
  className,
  style,
  messages,
  user,
  updateMessages,
  onMessageSent,
  onDeleteMessage,
  onEditMessage,
  dynamicSymbolAssignments,
  onDynamicSymbolListSet,
  onDynamicSymbolListDelete,
  isSendingDefultForNewMessage,
  isSendingDefultForEdited,
  backgroundImage,
  messageBubbleBiggerSize,
  uploadProgress,
  onUploadCancellationToken,
  them = ChatThemEntity.Telegram,
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
    messageToEdit,
    setMessageToEdit,
    handleEditMessage,
  } = Logic({
    user,
    messages,
    updateMessages,
    onMessageSent,
    onEditMessage,
    onDeleteMessage,
    isSendingDefultForNewMessage,
    isSendingDefultForEdited,
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
        {isLoadingChat ? (
          <Spinner className="mt-3" size={27} color="text-gray-800" />
        ) : (
          <AnimatePresence>
            {messages.length > 0
              ? messages.map((message, index) => {
                  const media = message?.attachmentUrl ? (
                    <Media
                      key={index}
                      attachmentUrl={message.attachmentUrl}
                      attachmentType={message?.attachmentType}
                      attachmentFormat={message?.attachmentFormat}
                      attachmentName={message?.attachmentName}
                      attachmentSize={message?.attachmentSize}
                      uploadProgres={uploadProgress?.find(
                        (progressEvent) =>
                          progressEvent.messageId === message.id,
                      )}
                      cancellationToken={() =>
                        onUploadCancellationToken
                          ? onUploadCancellationToken(message.id)
                          : null
                      }
                    />
                  ) : null;

                  if (message.isRightSided)
                    return (
                      <RightSide
                        maxWidth={messageBubbleBiggerSize}
                        key={index}
                        media={media}
                        handleContextMenu={handleContextMenu}
                        message={message}
                        them={them}
                        dynamicSymbols={dynamicSymbolAssignments?.map(
                          (item) => item.symbol,
                        )}
                      />
                    );

                  const showUserProfile =
                    messages[index - 1]?.user?.id !== message?.user?.id;

                  return (
                    <LeftSide
                      maxWidth={messageBubbleBiggerSize}
                      showUserProfile={showUserProfile}
                      key={index}
                      media={media}
                      handleContextMenu={handleContextMenu}
                      message={message}
                      them={them}
                      dynamicSymbols={dynamicSymbolAssignments?.map(
                        (item) => item.symbol,
                      )}
                    />
                  );
                })
              : null}
          </AnimatePresence>
        )}
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
        onFileSend={(file) => handleSendFile(file, AttachmentTypeEnum.File)}
        onImageSend={(file) => handleSendFile(file, AttachmentTypeEnum.Image)}
        onVideoSend={(file) => handleSendFile(file, AttachmentTypeEnum.Video)}
        dynamicSymbolAssignments={dynamicSymbolAssignments}
        onDynamicSymbolListSet={onDynamicSymbolListSet}
        onDynamicSymbolListDelete={onDynamicSymbolListDelete}
        messageToEdit={messageToEdit}
        setMessageToEdit={setMessageToEdit}
        onEditMessage={handleEditMessage}
      />
    </div>
  );
};

export default Chat;
