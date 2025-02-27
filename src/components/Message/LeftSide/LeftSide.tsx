import { motion } from "framer-motion";
import React from "react";
import { MessageEntity } from "../../../domain/MessageEntity";
import SpeechBubbleCornerIcon from "../../Icons/SpeechBubbleCornerIcon";

const LeftSide = ({
  message,
  showUserProfile,
  handleContextMenu,
  media,
}: {
  media: JSX.Element | null;
  message: MessageEntity;
  showUserProfile: boolean;
  handleContextMenu: (event: React.MouseEvent, message: MessageEntity) => void;
}) => {
  return (
    <>
      {showUserProfile ? (
        <img
          src={message.user.profileImageUrl}
          className="w-12 h-12 bg-gray-300 rounded-full"
        />
      ) : null}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        onContextMenu={(event: any) => handleContextMenu(event, message)}
        className={`relative ${
          media ? "w-3/4" : "w-fit max-w-3/4"
        } flex flex-col gap-1 md:max-w-[400px]  p-2 pt-5 rounded-lg bg-green-200`}
      >
        <span
          title={
            message.user?.fullName && message.user?.fullName?.length > 16
              ? message.user?.firstName
              : message.user?.fullName
          }
          className="relative -top-3 h-4 -mb-3 overflow-y-visible text-xs text-orange-700 whitespace-nowrap truncate max-w-[100px] overflow-visible"
        >
          {message.user?.fullName && message.user?.fullName?.length > 16
            ? message.user?.firstName
            : message.user?.fullName}
        </span>
        {media ? media : null}
        <span>{message.text}</span>
        <div className="w-full flex gap-1 items-center justify-end">
          <span className="text-[10px]">
            {new Date(message.createdDate).toLocaleTimeString().split(":")[0] +
              ":" +
              new Date(message.createdDate).toLocaleTimeString().split(":")[1]}
          </span>
          {message.isEdited ? (
            <span className="text-xs text-gray-600 italic">edited</span>
          ) : (
            ""
          )}
        </div>
        <SpeechBubbleCornerIcon className="fill-blue-200 -rotate-180 scale-x-[-1] transition-discrete absolute -left-2 bottom-0 [&>g>path]:fill-green-200" />
      </motion.div>
    </>
  );
};

export default LeftSide;
