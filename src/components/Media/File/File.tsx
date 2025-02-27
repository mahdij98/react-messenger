import React from "react";
import { ChatThemEntity } from "../../../ts/enum";

interface FilePreviewProps {
  format?: string;
  fileName: string;
  fileSize: number; // in bytes
  src: string; // Download URL
  them?: ChatThemEntity;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  fileName,
  fileSize,
  format,
  src,
  them,
}) => {
  const getFileIcon = () => {
    const icons: { [key: string]: JSX.Element } = {
      rar: <p className="p-2 text-green-500 font-bold">{format}</p>,
      zip: <p className="p-2 text-blue-500 font-bold">{format}</p>,
      pdf: <p className="p-2 text-red-500 font-bold">{format}</p>,
      doc: <p className="p-2 text-blue-400 font-bold">{format}</p>,
      vid: <p className="p-2 text-orange-400 font-bold">{format}</p>,
      txt: <p className="p-2 text-purple-500 font-bold">{format}</p>,
      xls: <p className="p-2 text-green-400 font-bold">{format}</p>,
      ppt: <p className="p-2 text-yellow-500 font-bold">{format}</p>,
      png: <p className="p-2 text-pink-500 font-bold">{format}</p>,
      jpg: <p className="p-2 text-indigo-500 font-bold">{format}</p>,
      mp3: <p className="p-2 text-teal-500 font-bold">{format}</p>,
      mp4: <p className="p-2 text-gray-500 font-bold">{format}</p>,
      exe: <p className="p-2 text-red-400 font-bold">{format}</p>,
      html: <p className="p-2 text-orange-500 font-bold">{format}</p>,
      css: <p className="p-2 text-blue-300 font-bold">{format}</p>,
      js: <p className="p-2 text-yellow-400 font-bold">{format}</p>,
      json: <p className="p-2 text-purple-400 font-bold">{format}</p>,
      xml: <p className="p-2 text-green-300 font-bold">{format}</p>,
      svg: <p className="p-2 text-pink-400 font-bold">{format}</p>,
      gif: <p className="p-2 text-indigo-400 font-bold">{format}</p>,
      csv: <p className="p-2 text-teal-400 font-bold">{format}</p>,
      sql: <p className="p-2 text-gray-400 font-bold">{format}</p>,
    };
    return format && icons[format] ? (
      icons[format]
    ) : (
      <p className="p-2 text-black ">{format ?? "UN"}</p>
    );
  };

  const formatFileSize = (size: number) => {
    return size > 1024 * 1024
      ? (size / (1024 * 1024)).toFixed(1) + " MB"
      : (size / 1024).toFixed(1) + " KB";
  };

  return (
    <div className="flex items-center rounded-lg">
      <div
        className={` border ${
          them === ChatThemEntity.Simple
            ? " border-white "
            : them === ChatThemEntity.Telegram
            ? " border-green-900"
            : ""
        } w-14 h-14 mr-3 flex items-center justify-center relative  rounded-md p-3`}
      >
        {getFileIcon()}
      </div>
      <div className="flex flex-col flex-grow">
        <a
          href={src}
          download={fileName}
          className={`${
            them === ChatThemEntity.Simple
              ? "text-white"
              : them === ChatThemEntity.Telegram
              ? "text-gray-900"
              : ""
          }  font-medium hover:underline`}
        >
          {fileName}
        </a>
        <span
          className={`${
            them === ChatThemEntity.Simple
              ? "text-gray-800"
              : them === ChatThemEntity.Telegram
              ? "text-gray-900"
              : ""
          }   text-sm`}
        >
          {formatFileSize(fileSize)}
        </span>
      </div>
      <a
        href={src}
        download={fileName}
        className="ml-2 bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600"
      >
        Download
      </a>
    </div>
  );
};

export default FilePreview;
