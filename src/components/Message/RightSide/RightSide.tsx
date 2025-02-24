import { motion } from "framer-motion";
import React from "react";
import { MessageEntity } from "../../../domain/MessageEntity";
import DoubleCheckIcon from "../../Icons/DoubleCheckIcon";
import SpeechBubbleCornerIcon from "../../Icons/SpeechBubbleCornerIcon";

const RightSide = ({
  handleContextMenu,
  media,
  message,
}: {
  media: JSX.Element | null;
  message: MessageEntity;
  handleContextMenu: (event: React.MouseEvent, message: MessageEntity) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      onContextMenu={(event: any) => handleContextMenu(event, message)}
      className={`relative self-end ${
        media ? "w-3/4" : "max-w-3/4"
      } flex flex-col justify-center md:max-w-[400px]  p-2 rounded-lg bg-blue-200`}
    >
      {media ? media : null}
      <span>{message.text}</span>
      <div className="w-full flex gap-1 items-center justify-end">
        <span className="text-[10px]">
          {new Date(message.createdDate).toLocaleTimeString().split(":")[0] +
            ":" +
            new Date(message.createdDate).toLocaleTimeString().split(":")[1]}
        </span>
        <DoubleCheckIcon />
      </div>

      <SpeechBubbleCornerIcon className="fill-blue-200 rotate-180 absolute -right-2 bottom-0 [&>g>path]:fill-blue-200" />
    </motion.div>
  );
};

export default RightSide;
