import { useRef, useState } from "react";
import { SymbolAssignment } from "../../ts/interfaces";
import FileIcon from "../Icons/FileIcon";
import MicIcon from "../Icons/MicIcon";
import SendIcon from "../Icons/SendIcon";
import SpeechBubbleCornerIcon from "../Icons/SpeechBubbleCornerIcon";

const ChatInput = ({
  onSendMessage,
  onSendVoice,
  onFileSend,
  dynamicSymbolAssignments,
}: {
  onSendMessage: (newMessage: string) => void;
  onSendVoice: (voiceBlobUrl: string) => void;
  onFileSend: (blob: Blob) => void;
  dynamicSymbolAssignments?: SymbolAssignment<any>[];
}) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [filterSymbol, setFilterSymbol] = useState<string | null>(null);
  const [previousScrollTopForSymbol, setPreviousScrollTopForSymbol] =
    useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any | null>(null);
  const inputRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);

    const match = newMessage.match(/(\S+)$/);

    if (match) {
      const symbol = match[0];
      if (selectedSymbol) {
        const symbolValue = match[0].split(selectedSymbol)[1];
        setFilterSymbol(symbolValue);
      }
      if (
        dynamicSymbolAssignments?.some((config) => config.symbol === symbol)
      ) {
        setSelectedSymbol(symbol);
      }
    } else {
      setSelectedSymbol(null);
    }
  };

  const handleItemClick = (id: string, value: string) => {
    setMessage((prev) => {
      return prev + value + " ";
    });
    setSelectedSymbol(null);
    inputRef.current.focus();
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    onSendMessage(message);
    setMessage("");
    setSelectedSymbol(null);
  };

  const handleStartRecording = async () => {
    setIsRecording(true);
    setRecordTime(0);
    audioChunksRef.current = [];

    timerRef.current = setInterval(() => {
      setRecordTime((prev) => prev + 1);
    }, 1000);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      clearInterval(timerRef.current!);
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(audioBlob);
      onSendVoice(audioUrl);
      setIsRecording(false);
    };

    mediaRecorder.start();
  };

  const handleSendVoice = () => {
    mediaRecorderRef.current?.stop();
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSend(file);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    // Check if the user is scrolling down
    if (scrollTop > previousScrollTopForSymbol) {
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1; // 5px threshold

      // If we are at the bottom of the scrollable area, load the next page
      if (isAtBottom) {
        const config = dynamicSymbolAssignments?.find(
          (assignment) => assignment.symbol === selectedSymbol
        );

        if (config && config?.updatePageNumber) {
          setLoading(true);
          config?.updatePageNumber(config.pagNumber + 1);
          setPreviousScrollTopForSymbol(scrollTop); // Update the previous scroll position

          // Optionally, set loading to false after a delay
          setTimeout(() => {
            setLoading(false);
          }, 500); // Adjust the delay as needed
        }
      }
    } else {
      // If scrolling up, simply update the previous scroll position
      setPreviousScrollTopForSymbol(scrollTop);
    }
  };

  return (
    <div className="absolute bottom-0 w-full flex items-center p-2 pr-4 z-10">
      {isRecording ? (
        <div className="w-full flex justify-between items-center bg-white  p-2 pl-4 h-11 rounded-3xl ">
          <span className="text-blue-400 font-bold flex-1">
            {formatTime(recordTime)}
          </span>
          <button
            className="cursor-pointer p-2 flex justify-center items-center bg-green-500 text-white rounded-full"
            onClick={handleSendVoice}
          >
            <SendIcon />
          </button>
        </div>
      ) : (
        <>
          <div className="w-[90%] relative ">
            <div
              onClick={handleFileClick}
              className="cursor-pointer absolute right-4 top-[11px]"
            >
              <FileIcon />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <input
              type="text"
              ref={inputRef}
              className="w-full  bg-white flex-1 p-2 pl-4 border border-gray-300 outline-none rounded-tl-3xl rounded-tr-2xl rounded-bl-3xl  "
              placeholder="Type a message..."
              value={message}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <SpeechBubbleCornerIcon className="rotate-180 absolute -right-[11.4px] top-5" />
          </div>
          <button
            className="flex items-center justify-center cursor-pointer w-9 h-9 ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            onClick={message ? handleSendMessage : handleStartRecording}
          >
            {message ? <SendIcon /> : <MicIcon />}
          </button>
        </>
      )}

      {selectedSymbol && (
        <div
          className="absolute bottom-full left-0 w-full bg-white shadow-xl rounded-lg border border-gray-200 p-4 z-50 max-h-60 overflow-y-auto"
          onScroll={handleScroll}
        >
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Select an item for{" "}
              <span className="text-blue-500">{selectedSymbol}</span>
            </h3>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedSymbol(null)}
            >
              ✕
            </button>
          </div>
          <div className="space-y-2">
            {dynamicSymbolAssignments
              ? dynamicSymbolAssignments
                  .filter((config) => config.symbol === selectedSymbol)
                  .map((config) => {
                    const { component: Component, lists } = config;
                    if (!Component) return null;
                    if (filterSymbol) {
                      return lists
                        ?.filter((list) => list?.name.includes(filterSymbol))
                        ?.map((list, index) => (
                          <div
                            key={index}
                            className="hover:bg-gray-100 rounded-md p-2 cursor-pointer"
                          >
                            <Component
                              listsProps={list}
                              onClick={(id, value) =>
                                handleItemClick(id, value)
                              }
                            />
                          </div>
                        ));
                    }
                    return lists?.map((list, index) => (
                      <div
                        key={index}
                        className="hover:bg-gray-100 rounded-md p-2 cursor-pointer"
                      >
                        <Component
                          listsProps={list}
                          onClick={(id, value) => handleItemClick(id, value)}
                        />
                      </div>
                    ));
                  })
              : null}
            <div className="h-8">{loading && "Loading more items..."}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
