import React from "react";
import { MessageEntity } from "../../../domain/MessageEntity";
declare const LeftSide: ({ message, showUserProfile, handleContextMenu, media, }: {
    media: React.JSX.Element | null;
    message: MessageEntity;
    showUserProfile: boolean;
    handleContextMenu: (event: React.MouseEvent, message: MessageEntity) => void;
}) => import("react/jsx-runtime").JSX.Element;
export default LeftSide;
