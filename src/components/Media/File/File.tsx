import React from "react";

interface FilePreviewProps {
  format?: string;
  fileName: string;
  fileSize: number; // in bytes
  src: string; // Download URL
}

const FilePreview: React.FC<FilePreviewProps> = ({
  fileName,
  fileSize,
  format,
  src,
}) => {
  const getFileIcon = () => {
    const icons: { [key: string]: JSX.Element } = {
      rar: <p className="p-2 text-green-500 font-bold">{format}</p>,
      zip: <p className="p-2 text-blue-500 font-bold">{format}</p>,
      pdf: <p className="p-2 text-red-500 font-bold">{format}</p>,
      doc: <p className="p-2 text-blue-400 font-bold">{format}</p>,
      vid: <p className="p-2 text-orange-400 font-bold">{format}</p>,
      "": <p className="p-2 text-black font-bold">{format}</p>,
    };
    return icons[format || ""];
  };

  const formatFileSize = (size: number) => {
    return size > 1024 * 1024
      ? (size / (1024 * 1024)).toFixed(1) + " MB"
      : (size / 1024).toFixed(1) + " KB";
  };

  return (
    <div className="flex items-center rounded-lg">
      <div className="mr-3 relative border border-green-950 rounded-md p-3">
        {getFileIcon()}
      </div>
      <div className="flex flex-col flex-grow">
        <a
          href={src}
          download={fileName}
          className="text-gray-900 font-medium hover:underline"
        >
          {fileName}
        </a>
        <span className="text-gray-600 text-sm">
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
