import React from "react";
export interface UserInterface {
    id: string;
    profileImageUrl?: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
}
export interface SymbolAssignment<T = any> {
    symbol: string;
    component?: ({ onClick, listsProps, }: {
        onClick: (id: string, value: string) => void;
        listsProps: T;
    }) => React.JSX.Element;
    lists?: T[];
    pagNumber: number;
    updatePageNumber: (newPage: number) => void;
}
