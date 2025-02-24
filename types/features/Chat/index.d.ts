import React from "react";
import { MessageEntity } from "../../domain/MessageEntity";
import "../../index.css";
import { SymbolAssignment, UserInterface } from "../../ts/interfaces";
export interface ChatPropsInterface {
    messages: MessageEntity[];
    user: UserInterface;
    width?: string;
    height?: string;
    className?: string;
    style?: React.CSSProperties;
    updateMessages: (messages: MessageEntity[]) => void;
    onMessageSent: (message: MessageEntity) => void;
    dynamicSymbolAssignments?: SymbolAssignment<any>[];
    onDeleteMessage: (id: string) => void;
    onEditMessage: (id: string) => void;
}
declare const Chat: ({ width, height, className, style, messages, user, updateMessages, onMessageSent, onDeleteMessage, onEditMessage, dynamicSymbolAssignments, }: ChatPropsInterface) => import("react/jsx-runtime").JSX.Element;
export default Chat;
