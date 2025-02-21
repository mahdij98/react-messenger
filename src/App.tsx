import { useState } from "react";
import ProfileIcon3 from "./assets/10.png";
import ProfileIcon4 from "./assets/11.png";
import ProfileIcon1 from "./assets/12.png";
import ProfileIcon6 from "./assets/2.png";
import ProfileIcon5 from "./assets/3.png";
import ProfileIcon2 from "./assets/4.png";
import { MessageEntity } from "./domain/MessageEntity";
import Chat from "./features/Chat";
import { AttachmentTypeEnum } from "./ts/enum";
import { UserInterface } from "./ts/interfaces";

export interface TaskInterface {
  id: string;
  name: string;
}

export interface TasksProps {
  symbol?: string;
  task: TaskInterface;
  onClick: (id: string, text: string) => void;
}
const Tasks = ({ symbol, onClick, task }: TasksProps) => {
  return (
    <div
      onClick={() => {
        onClick(task.id, task.name);
      }}
      className="flex gap-2 justify-between, items-center"
    >
      <div>{symbol}</div>
      <div>{task.name}</div>
    </div>
  );
};

export interface UserPropsInterface {
  id: string;
  name: string;
}

export interface UserProps {
  symbol?: string;
  user: UserPropsInterface;
  onClick: (id: string, value: string) => void;
}
const User = ({ symbol, onClick, user }: UserProps) => {
  return (
    <div
      onClick={() => {
        onClick(user.id, user.name);
      }}
      className="flex gap-2 justify-between, items-center"
    >
      <div>{symbol}</div>
      <div>{user.name}</div>
    </div>
  );
};

function App() {
  const oldMessages = [
    new MessageEntity({
      id: "132",
      text: "hello",
      user: { id: "1", profileImageUrl: ProfileIcon1, fullName: "Mahdi" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "1324",
      text: "How are You",
      user: { id: "1", profileImageUrl: ProfileIcon1, fullName: "Mahdi" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "1325",
      text: "Thanks iam ok",
      isRightSided: true,
      user: { id: "2", fullName: "Marya" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "6",
      text: "Every thing allright????????",
      user: { id: "1", profileImageUrl: ProfileIcon1, fullName: "Mahdi" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "57",
      text: "Did you guys do your tasks?",
      user: { id: "3", profileImageUrl: ProfileIcon2, fullName: "Sarah" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "54",
      text: "I did mine :)",
      user: { id: "4", profileImageUrl: ProfileIcon3, fullName: "Lily" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "34",
      text: "Lovly Lily :))",
      user: { id: "5", profileImageUrl: ProfileIcon4, fullName: "Mike" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "23",
      text: "Plese Don't CHIT CHAT here 😐",
      user: { id: "6", profileImageUrl: ProfileIcon5, fullName: "Amelia" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "12",
      text: "Hey Chill guys!",
      isRightSided: true,
      user: { id: "2", profileImageUrl: ProfileIcon1, fullName: "Marya" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "11",
      text: "Don't eat ech other 😂",
      isRightSided: true,
      user: { id: "2", profileImageUrl: ProfileIcon1, fullName: "Marya" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "22",
      text: "what? 🤔",
      user: { id: "5", profileImageUrl: ProfileIcon4, fullName: "Mike" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "33",
      text: "😳",
      user: { id: "4", profileImageUrl: ProfileIcon3, fullName: "Lily" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "44",
      text: "I need Api for list of customer is it ready?",
      user: { id: "7", profileImageUrl: ProfileIcon6, fullName: "Janson" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "55",
      text: "",
      user: { id: "7", profileImageUrl: ProfileIcon6, fullName: "Janson" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
      attachment: "//samplelib.com/lib/preview/mp3/sample-9s.mp3",
      attachmentType: AttachmentTypeEnum.Voice,
    }),
    new MessageEntity({
      id: "66",
      text: "This is for you",
      isRightSided: true,
      user: { id: "2", profileImageUrl: ProfileIcon6, fullName: "Janson" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
      attachment: "//samplelib.com/lib/preview/mp3/sample-15s.mp3",
      attachmentType: AttachmentTypeEnum.Voice,
    }),
    new MessageEntity({
      id: "77",
      text: "and this is your response",
      user: { id: "7", profileImageUrl: ProfileIcon6, fullName: "Janson" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
      attachment: "//samplelib.com/lib/preview/mp3/sample-12s.mp3",
      attachmentType: AttachmentTypeEnum.Voice,
    }),
    new MessageEntity({
      id: "88",
      text: "this is cool",
      user: { id: "7", profileImageUrl: ProfileIcon6, fullName: "Janson" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
      attachment: ProfileIcon6,
      attachmentType: AttachmentTypeEnum.Image,
    }),
    new MessageEntity({
      id: "99",
      text: "",
      isRightSided: true,
      attachment: ProfileIcon1,
      attachmentType: AttachmentTypeEnum.File,
      user: { id: "2", fullName: "Marya" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "00",
      text: "😳",
      attachment: ProfileIcon1,
      attachmentType: AttachmentTypeEnum.File,
      user: { id: "4", profileImageUrl: ProfileIcon3, fullName: "Lily" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "00",
      text: "😳",
      attachment: ProfileIcon1,
      attachmentType: AttachmentTypeEnum.File,
      user: { id: "4", profileImageUrl: ProfileIcon3, fullName: "Lily" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
  ];

  const currentUser: UserInterface = {
    id: "2",
    fullName: "Marya",
  };

  const taskLists: TaskInterface[] = [
    { name: "task1", id: "111" },
    { name: "task1", id: "111" },
    { name: "task2", id: "2222" },
    { name: "task2", id: "2222" },
    { name: "task2", id: "2222" },
    { name: "task2", id: "2222" },
    { name: "task2", id: "2222" },
    { name: "task2", id: "2222" },
    { name: "task2", id: "2222" },
    { name: "task2", id: "2222" },
  ];
  const userLists: UserPropsInterface[] = [
    { name: "mahdi", id: "111" },
    { name: "zare", id: "2222" },
    { name: "zare", id: "2222" },
    { name: "zare", id: "2222" },
    { name: "zare", id: "2222" },
    { name: "mahdi", id: "111" },
    { name: "zare", id: "2222" },
    { name: "zare", id: "2222" },
    { name: "zare", id: "2222" },
    { name: "zare", id: "2222" },
    { name: "mahdi", id: "111" },
    { name: "zare", id: "2222" },
    { name: "zare", id: "2222" },
    { name: "zare", id: "2222" },
    { name: "zare", id: "2222" },
    { name: "mahdi", id: "111" },
    { name: "zare", id: "2222" },
    { name: "zare", id: "2222" },
    { name: "zare", id: "2222" },
    { name: "zare", id: "2222" },
  ];

  const [messages, setMessages] = useState(oldMessages);
  const [pagNumber, setPageNumber] = useState(1);

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== messageId)
    );
  };

  return (
    <Chat
      messages={messages}
      dynamicSymbolAssignments={[
        {
          symbol: "#",
          component({ onClick, listsProps }) {
            return <Tasks task={listsProps} onClick={onClick} />;
          },
          lists: taskLists,
          pagNumber: pagNumber,
          updatePageNumber: (newPage: number) => setPageNumber(newPage),
        },
        {
          symbol: "@",
          component({ onClick, listsProps }) {
            return <User user={listsProps} onClick={onClick} />;
          },
          lists: userLists,
          pagNumber: pagNumber,
          updatePageNumber: (newPage: number) => {
            console.log("new page", newPage);
            setPageNumber(newPage);
          },
        },
      ]}
      user={currentUser}
      updateMessages={setMessages}
      onDeleteMessage={handleDeleteMessage}
      onEditMessage={(id) => {}}
      onMessageSent={(newMessage) => {}}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-100 border "
    />
  );
}

export default App;
