import { useEffect, useRef, useState } from "react";
import { MessageEntity } from "../../domain/MessageEntity";
import formatTimer from "../../helper/formatTimer";
import { normalizeMessage } from "../../helper/normalizeMessage";
import { SymbolAssignmentInterface } from "../../ts/interfaces";
import FileIcon from "../Icons/FileIcon";
import MicIcon from "../Icons/MicIcon";
import SendIcon from "../Icons/SendIcon";
import SpeechBubbleCornerIcon from "../Icons/SpeechBubbleCornerIcon";

const ChatInput = ({
  onSendMessage,
  onEditMessage,
  onSendVoice,
  onImageSend,
  onVideoSend,
  onFileSend,
  dynamicSymbolAssignments,
  onDynamicSymbolListSet,
  onDynamicSymbolListDelete,
  messageToEdit,
  setMessageToEdit,
}: {
  onSendMessage: (newMessage: string) => void;
  onEditMessage: (newMessageEntity: MessageEntity) => void;
  onSendVoice: (voiceBlobUrl: Blob) => void;
  onFileSend: (blob: Blob) => void;
  onImageSend: (blob: Blob) => void;
  onVideoSend: (blob: Blob) => void;
  dynamicSymbolAssignments?: SymbolAssignmentInterface<any>[];
  onDynamicSymbolListSet?: (value: string, id: string, symbol?: string) => void;
  onDynamicSymbolListDelete?: (id: string, symbol?: string) => void;
  messageToEdit?: MessageEntity;
  setMessageToEdit: React.Dispatch<
    React.SetStateAction<MessageEntity | undefined>
  >;
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
  const textareaRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [dynamicSymbolListUpdate, setDynamicSymbolListUpdate] = useState<
    string[]
  >([]);

  const TEXTAREA_MAX_HEIGHT = 150;
  const TEXTAREA_INITIAL_HEIGHT = 41.6;

  useEffect(() => {
    const divElement = document.getElementById("static-display");
    if (divElement && !divElement.textContent && messageToEdit?.text) {
      divElement.textContent = messageToEdit?.text;
    }
  }, [messageToEdit?.text]);

  const handleInputChange = (newMessage: string) => {
    if (messageToEdit)
      setMessageToEdit((pre) => {
        if (!pre) return undefined;
        const newEntity = new MessageEntity({
          ...pre,
          text: newMessage,
          isEdited: true,
        });
        return newEntity;
      });
    else setMessage(newMessage);

    const match = newMessage.match(/(\S+)$/);
    handleSymbol(match);

    if (dynamicSymbolListUpdate.length > 0) {
      const spanIdMatches = Array.from(
        newMessage.matchAll(/<span[^>]*id=["']([^"']+)["'][^>]*>/g),
      ).map((m) => m[1]);
      setDynamicSymbolListUpdate((prev) => {
        const removedIds = prev.filter(
          (symbolPlusId) => !spanIdMatches.includes(symbolPlusId),
        );
        removedIds.forEach((symbolPlusId) => {
          const symbol = symbolPlusId.charAt(0);
          const id = symbolPlusId.slice(1);
          onDynamicSymbolListDelete?.(id, symbol);
        });
        return spanIdMatches;
      });
    }
    if (textareaRef.current) {
      const newHeight = textareaRef.current.scrollHeight;
      const newLineCount =
        Math.ceil(textareaRef.current.scrollHeight / newHeight) - 1;
      if (newHeight > TEXTAREA_INITIAL_HEIGHT) {
        if (newHeight > TEXTAREA_MAX_HEIGHT) {
          textareaRef.current.style.height = `${TEXTAREA_MAX_HEIGHT}px`;
          textareaRef.current.style.overflowY = "auto";
        } else {
          textareaRef.current.style.height = `${newHeight}px`;
          textareaRef.current.style.overflowY = "hidden";
        }
      } else {
        textareaRef.current.style.height = `${TEXTAREA_INITIAL_HEIGHT}px`;
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  };

  const handleSendMessage = () => {
    if (messageToEdit) {
      const cleanText = normalizeMessage(messageToEdit.text);
      if (cleanText.trim() === "") return;
      onEditMessage({
        ...messageToEdit,
        text: cleanText,
      });
      setMessageToEdit(undefined);
    } else {
      const cleanMessage = normalizeMessage(message);
      if (cleanMessage.trim() === "") return;
      onSendMessage(cleanMessage);
      setMessage("");
    }

    setSelectedSymbol(null);
    setFilterSymbol(null);

    if (textareaRef.current) {
      textareaRef.current.style.height = `${TEXTAREA_INITIAL_HEIGHT}px`;
      textareaRef.current.innerHTML = "";
    }
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
      const audioFile = new File([audioBlob], "recording.mp3", {
        type: "audio/mp3",
      });
      onSendVoice(audioFile);
      setIsRecording(false);
    };

    mediaRecorder.start();
  };

  const handleSendVoice = () => {
    mediaRecorderRef.current?.stop();
  };

  const handleSymbol = (match: RegExpMatchArray | null) => {
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
      setFilterSymbol(null);
    }
  };

  const handleSymbolItemClick = (
    id: string,
    value: string,
    symbol?: string,
  ) => {
    if (!textareaRef.current) return;

    setDynamicSymbolListUpdate((pre) => [...pre, `${symbol + id}`]);
    let currentContent = textareaRef.current?.innerHTML || "";

    const lastSymbolMatch = currentContent.match(/(\S+)$/);
    if (lastSymbolMatch) {
      const lastSymbol = lastSymbolMatch[0];
      currentContent = currentContent.slice(0, -lastSymbol.length);
    }

    const spanHtml = `<span id="${symbol + id}" contentEditable="false" class="inline-flex items-center  gap-1 px-2 pb-1 text-sm font-medium text-white bg-blue-500 rounded-full pointer-events-none select-none truncate max-w-[250px]">${symbol + value}</span>&nbsp;`;

    textareaRef.current.innerHTML = currentContent + spanHtml;

    const textNode = document.createTextNode("");
    textareaRef.current.appendChild(textNode);

    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(textNode, 0);
    range.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(range);

    const newContent = textareaRef.current.innerHTML;
    handleInputChange(newContent);

    onDynamicSymbolListSet ? onDynamicSymbolListSet(value, id, symbol) : null;
    setSelectedSymbol(null);
    setFilterSymbol(null);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleSymbolPagination = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    if (scrollTop > previousScrollTopForSymbol) {
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if (isAtBottom) {
        const config = dynamicSymbolAssignments?.find(
          (assignment) => assignment.symbol === selectedSymbol,
        );

        if (config && config?.updatePageNumber) {
          setLoading(true);
          config?.updatePageNumber(config.pagNumber + 1);
          setPreviousScrollTopForSymbol(scrollTop);

          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      }
    } else {
      setPreviousScrollTopForSymbol(scrollTop);
    }
  };

  const IMAGE_MIME_TYPES = new Set([
    "jpeg",
    "png",
    "gif",
    "webp",
    "bmp",
    "svg+xml",
    "tiff",
    "x-icon",
  ]);

  const VIDEO_MIME_TYPES = new Set([
    "mp4",
    "webm",
    "ogg",
    "mpeg",
    "quicktime",
    "x-msvideo",
    "x-ms-wmv",
    "3gpp",
    "3gpp2",
  ]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    let subtype: string = "";
    if (file.type) {
      const parts = file.type.split("/");
      if (parts.length === 2) {
        subtype = parts[1];
      }
    }
    if (!subtype) {
      subtype = file.name.split(".").pop()?.toLowerCase() || "";
    }

    if (IMAGE_MIME_TYPES.has(subtype)) {
      onImageSend(file);
    } else if (VIDEO_MIME_TYPES.has(subtype)) {
      onVideoSend(file);
    } else {
      onFileSend(file);
    }
  };

  return (
    <div className="absolute bottom-0 w-full flex items-center p-2 pr-4 z-10">
      {isRecording ? (
        <div className="w-full flex justify-between items-center bg-white  p-2 pl-4 h-11 rounded-3xl ">
          <span className="text-blue-400 font-bold flex-1">
            {formatTimer(recordTime)}
          </span>
          <button
            className="cursor-pointer p-2 flex justify-center items-center bg-green-500 text-white rounded-full"
            onClick={handleSendVoice}
          >
            <SendIcon />
          </button>
        </div>
      ) : messageToEdit ? (
        <>
          <div className="w-[90%] relative h-10">
            <div className=" h-12 absolute bottom-10  w-full flex justify-between items-center px-2 border-t border-x border-gray-300 bg-white rounded-t-lg ">
              <span
                id="static-display"
                className="text-gray-400 whitespace-nowrap truncate"
              ></span>
              <button
                className="text-gray-500 hover:text-gray-700 -mt-4"
                onClick={() => setMessageToEdit(undefined)}
              >
                ✕
              </button>
            </div>
            <textarea
              className="w-full resize-none h-[41.6px] absolute bottom-0 bg-white flex-1 p-2 pl-4 border border-gray-300 outline-none rounded-bl-3xl  "
              placeholder="Type a message..."
              value={messageToEdit.text}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <SpeechBubbleCornerIcon className="rotate-180 absolute -right-[11.4px] top-[18.4px]" />
          </div>
          <button
            className="flex items-center justify-center cursor-pointer w-9 h-9 ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            onClick={handleSendMessage}
          >
            <SendIcon />
          </button>
        </>
      ) : (
        <>
          <div className="w-[90%] h-10 relative ">
            <div
              onClick={handleFileClick}
              className="cursor-pointer z-10 absolute right-4 top-[11px]"
            >
              <FileIcon />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <div
              ref={textareaRef}
              contentEditable
              suppressContentEditableWarning
              className="w-full absolute bottom-0 resize-none bg-white flex-1 p-2 pr-10 pl-4 border border-gray-300 outline-none rounded-tl-3xl rounded-tr-2xl rounded-bl-3xl overflow-hidden"
              style={{ height: TEXTAREA_INITIAL_HEIGHT }}
              onInput={(e) => handleInputChange(e.currentTarget.innerHTML)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <SpeechBubbleCornerIcon className="rotate-180 absolute -right-[11.4px] top-[18.4px]" />
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
          onScroll={handleSymbolPagination}
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
                                handleSymbolItemClick(id, value, selectedSymbol)
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
                          onClick={(id, value) =>
                            handleSymbolItemClick(id, value, selectedSymbol)
                          }
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
