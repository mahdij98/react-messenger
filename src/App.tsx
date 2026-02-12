import { useEffect, useState } from "react";
import ProfileIcon3 from "./assets/10.png";
import ProfileIcon4 from "./assets/11.png";
import ProfileIcon1 from "./assets/12.png";
import ProfileIcon6 from "./assets/2.png";
import ProfileIcon5 from "./assets/3.png";
import ProfileIcon2 from "./assets/4.png";
import ProfileIcon12 from "./assets/chat-bg-1.jpg";
import SymbolsListComponent, {
  SymbolItemInterface,
} from "./components/Symbols/SymbolsListComponent";
import { MessageEntity } from "./domain/MessageEntity";
import Chat from "./features/Chat";
import { AttachmentTypeEnum } from "./ts/enum";
import { UserInterface } from "./ts/interfaces";

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
      isSending: true,
    }),
    new MessageEntity({
      id: "22",
      text: "what? 🤔",
      user: { id: "5", profileImageUrl: ProfileIcon4, fullName: "Mike" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
      isSending: true,
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
      attachmentUrl: "//samplelib.com/lib/preview/mp3/sample-9s.mp3",
      attachmentType: AttachmentTypeEnum.Voice,
      attachmentName: "voice-message",
    }),
    new MessageEntity({
      id: "66",
      text: "This is for you",
      isRightSided: true,
      user: { id: "2", profileImageUrl: ProfileIcon6, fullName: "Janson" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
      attachmentUrl: "//samplelib.com/lib/preview/mp3/sample-15s.mp3",
      attachmentType: AttachmentTypeEnum.Voice,
    }),
    new MessageEntity({
      id: "772",
      text: "and this is your response",
      user: { id: "7", profileImageUrl: ProfileIcon6, fullName: "Janson" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
      attachmentUrl: "//samplelib.com/lib/preview/mp3/sample-12s.mp3",
      attachmentType: AttachmentTypeEnum.Voice,
      attachmentName: "voice-message2",
    }),
    new MessageEntity({
      id: "82228",
      text: "this is cool",
      user: { id: "7", profileImageUrl: ProfileIcon6, fullName: "Janson" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
      attachmentUrl: ProfileIcon6,
      attachmentType: AttachmentTypeEnum.Image,
    }),
    new MessageEntity({
      id: "9929",
      text: "",
      isRightSided: true,
      attachmentUrl: ProfileIcon1,
      attachmentType: AttachmentTypeEnum.File,
      attachmentFormat: "jpeg",
      user: { id: "2", fullName: "Marya" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "00",
      text: "😳",
      attachmentUrl: ProfileIcon1,
      attachmentType: AttachmentTypeEnum.File,
      attachmentFormat: "jpg",
      attachmentName: "Dcmi06000 - sw2",
      attachmentSize: 3243243002,
      user: { id: "4", profileImageUrl: ProfileIcon3, fullName: "Lily" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "12344",
      text: "😳",
      attachmentUrl: ProfileIcon1,
      attachmentType: AttachmentTypeEnum.File,
      attachmentFormat: "png",
      attachmentName: "last year 2020",
      attachmentSize: 40000,
      user: { id: "4", profileImageUrl: ProfileIcon3, fullName: "Lily" },
      createdDate: "2025-02-14T08:09:22.311+00:00",
    }),
    new MessageEntity({
      id: "178",
      text: "and",
      user: {
        id: "1",
        profileImageUrl: ProfileIcon6,
        fullName: "Janson and jonse very happy",
        firstName: "Janson and jonse very happy",
      },
      createdDate: "2025-02-14T08:09:22.311+00:00",
      isEdited: true,
    }),
  ];

  const currentUser: UserInterface = {
    id: "2",
    fullName: "Marya",
  };

  const taskLists: SymbolItemInterface[] = [
    { name: "Complete project report", id: "111" },
    {
      name: "Prepare presentation slides Attend team meeting Attend team meeting",
      id: "222",
    },
    { name: "Attend team meeting", id: "333" },
    { name: "Review pull requests", id: "444" },
    { name: "Update documentation", id: "555" },
    { name: "Fix bugs in the application", id: "666" },
    { name: "Conduct user testing", id: "777" },
    { name: "Plan next sprint", id: "888" },
    { name: "Refactor codebase", id: "999" },
    { name: "Deploy to production", id: "1010" },
  ];
  const userLists: SymbolItemInterface[] = [
    { name: "mahdi", id: "1" },
    { name: "zare", id: "2" },
    { name: "sara", id: "3" },
    { name: "lily", id: "4" },
    { name: "mike", id: "5" },
    { name: "amelia", id: "6" },
    { name: "janson", id: "7" },
    { name: "john", id: "8" },
    { name: "alice", id: "9" },
    { name: "bob", id: "10" },
    { name: "emma", id: "11" },
    { name: "charlie", id: "12" },
    { name: "diana", id: "13" },
    { name: "edward", id: "14" },
    { name: "fiona", id: "15" },
    { name: "george", id: "16" },
    { name: "hannah", id: "17" },
    { name: "isaac", id: "18" },
    { name: "julia", id: "19" },
    { name: "kevin", id: "20" },
  ];

  const [messages, setMessages] = useState(oldMessages);
  const [pagNumber, setPageNumber] = useState(1);
  const [dSymbolList, setDSymbolList] = useState<
    { value: string; id: string; symbol?: string }[]
  >([]);
  const [UploadProgresList] = useState([
    {
      messageId: "12344",
      progres: 60,
      progresEnd: 100,
    },
    {
      messageId: "9929",
      progres: 20,
      progresEnd: 100,
    },
    {
      messageId: "82228",
      progres: 87,
      progresEnd: 100,
    },
    {
      messageId: "772",
      progres: 23,
      progresEnd: 100,
    },
  ]);

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== messageId),
    );
  };

  useEffect(() => {
    console.log("dsymbolList", dSymbolList);
  }, [dSymbolList]);

  return (
    <Chat
      messages={messages}
      backgroundImage={ProfileIcon12}
      isSendingDefultForNewMessage
      isSendingDefultForEdited
      dynamicSymbolAssignments={[
        {
          symbol: "#",
          component({ onClick, listsProps }) {
            return <SymbolsListComponent item={listsProps} onClick={onClick} />;
          },
          lists: taskLists,
          pagNumber: pagNumber,
          updatePageNumber: (newPage: number) => setPageNumber(newPage),
        },
        {
          symbol: "@",
          component({ onClick, listsProps }) {
            return <SymbolsListComponent item={listsProps} onClick={onClick} />;
          },
          lists: userLists,
          pagNumber: pagNumber,
          updatePageNumber: (newPage: number) => {
            console.log("new page", newPage);
            setPageNumber(newPage);
          },
        },
      ]}
      onDynamicSymbolListSet={(value, id, symbol) => {
        setDSymbolList((pre) => [
          ...pre,
          { value: value, id: id, symbol: symbol },
        ]);
        console.log("add", id, symbol);
      }}
      onDynamicSymbolListDelete={(id, symbol) => {
        console.log("delete", id, symbol);
        setDSymbolList((prev) => {
          return prev.filter(
            (item) => !(item.id == id && item.symbol == symbol),
          );
        });
      }}
      user={currentUser}
      updateMessages={(msg) => {
        setMessages(msg);
      }}
      onDeleteMessage={handleDeleteMessage}
      onEditMessage={(editedMessage) => {}}
      onMessageSent={(newMessage) => {
        console.log("new message", newMessage);
      }}
      uploadProgress={UploadProgresList}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-100 border "
    />
  );
}

export default App;
