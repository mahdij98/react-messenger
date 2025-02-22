import React from "react";
export interface ContextMenuItem {
    name: string;
    icon: React.JSX.Element;
    onClick: (id: string) => void;
    onlyCurrentUserMessage?: boolean;
}
interface ContextMenuProps {
    items: ContextMenuItem[];
    isVisible: boolean;
    messageId: string;
    position: {
        x: number;
        y: number;
    };
    isCurrentUserMessage: boolean;
}
declare const ContextMenu: React.FC<ContextMenuProps>;
export default ContextMenu;
