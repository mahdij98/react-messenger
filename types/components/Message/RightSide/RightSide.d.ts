import React from "react";
import { MessageEntity } from "../../../domain/MessageEntity";
declare const RightSide: ({ handleContextMenu, media, message, }: {
    media: React.JSX.Element | null;
    message: MessageEntity;
    handleContextMenu: (event: React.MouseEvent, message: MessageEntity) => void;
}) => import("react/jsx-runtime").JSX.Element;
export default RightSide;
