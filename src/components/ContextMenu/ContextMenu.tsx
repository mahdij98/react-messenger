import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export interface ContextMenuItem {
  name: string;
  icon: JSX.Element;
  onClick: (id: string) => void;
  onlyCurrentUserMessage?: boolean;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  isVisible: boolean;
  messageId: string;
  position: { x: number; y: number };
  isCurrentUserMessage: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  isVisible,
  position,
  messageId,
  isCurrentUserMessage,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute z-20 bg-white shadow-lg rounded-md p-2 px-1 w-42"
          style={{ top: position.y, left: position.x }}
        >
          {items.map((item, index) => {
            if (item?.onlyCurrentUserMessage && !isCurrentUserMessage)
              return null;
            return (
              <button
                key={index}
                className="cursor-pointer flex items-center gap-2  w-full rounded-md text-left px-2  py-1 hover:bg-gray-200"
                onClick={() => item.onClick(messageId)}
              >
                {React.cloneElement(item.icon, {
                  className: "text-black",
                  size: 18,
                })}{" "}
                <span className="ml-2 text-black">{item.name}</span>
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;
