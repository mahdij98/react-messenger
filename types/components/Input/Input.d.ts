import { SymbolAssignment } from "../../ts/interfaces";
declare const ChatInput: ({ onSendMessage, onSendVoice, onFileSend, dynamicSymbolAssignments, }: {
    onSendMessage: (newMessage: string) => void;
    onSendVoice: (voiceBlobUrl: string) => void;
    onFileSend: (blob: Blob) => void;
    dynamicSymbolAssignments?: SymbolAssignment<any>[];
}) => import("react/jsx-runtime").JSX.Element;
export default ChatInput;
