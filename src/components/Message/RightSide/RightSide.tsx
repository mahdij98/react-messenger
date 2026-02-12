import { motion } from "framer-motion";
import React from "react";
import { MessageEntity } from "../../../domain/MessageEntity";
import { ChatThemEntity } from "../../../ts/enum";
import DoubleCheckIcon from "../../Icons/DoubleCheckIcon";
import SpeechBubbleCornerIcon from "../../Icons/SpeechBubbleCornerIcon";
import Spinner from "../../Spinner/Spinner";

const RightSide = ({
  handleContextMenu,
  media,
  message,
  them,
  maxWidth,
}: {
  media: JSX.Element | null;
  message: MessageEntity;
  them?: ChatThemEntity;
  maxWidth?: boolean;
  handleContextMenu: (event: React.MouseEvent, message: MessageEntity) => void;
}) => {
  return (
    <motion.div
      style={{ background: "red !important" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      onContextMenu={(event: any) => handleContextMenu(event, message)}
      className={`relative self-end ${
        media ? "w-3/4" : maxWidth ? ` max-w-[400px]` : "max-w-[75%]"
      } flex flex-col justify-center break-words p-2 rounded-lg ${
        them === ChatThemEntity.Telegram
          ? " bg-green-200"
          : ChatThemEntity.Simple
            ? " bg-[#4F46E5] text-white"
            : ""
      }`}
    >
      {media ? media : null}
      <span className="">{message.text}</span>
      <div className="w-full flex gap-1 items-center justify-end">
        <span className="text-[10px]">
          {new Date(message.createdDate).toLocaleTimeString().split(":")[0] +
            ":" +
            new Date(message.createdDate).toLocaleTimeString().split(":")[1]}
        </span>
        {message.isSending ? (
          <Spinner size={13} color="text-black" />
        ) : (
          <DoubleCheckIcon
            className={
              them === ChatThemEntity.Telegram
                ? " "
                : ChatThemEntity.Simple
                  ? " [&>path]:fill-white"
                  : ""
            }
          />
        )}
        {message.isEdited ? (
          <span
            className={`text-xs italic ${
              them === ChatThemEntity.Simple
                ? "text-gray-200"
                : them === ChatThemEntity.Telegram
                  ? "text-gray-600 "
                  : ""
            }`}
          >
            edited
          </span>
        ) : (
          ""
        )}
      </div>
      <SpeechBubbleCornerIcon
        className={`fill-blue-200 rotate-180 absolute -right-2 bottom-0  ${
          them === ChatThemEntity.Telegram
            ? "[&>g>path]:fill-green-200"
            : ChatThemEntity.Simple
              ? "[&>g>path]:fill-[#4F46E5]"
              : ""
        } `}
      />
    </motion.div>
  );
};

export default RightSide;
