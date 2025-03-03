export interface UserInterface {
  id: string;
  profileImageUrl?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
}

export interface SymbolAssignmentInterface<T = any> {
  symbol: string;
  component?: ({
    onClick,
    listsProps,
  }: {
    onClick: (id: string, value: string) => void;
    listsProps: T;
  }) => JSX.Element;
  lists?: T[];
  pagNumber: number;
  updatePageNumber: (newPage: number) => void;
}

export interface ChatUploadProgresInterface {
  messageId: string;
  /**
   * progress shold be number between 0 and progresEnd
   */
  progres: number;
  progresEnd: number;
}
