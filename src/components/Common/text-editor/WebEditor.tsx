import React from "react";

interface WebEditorProps {
  label: string;
  content: string;
  setContent: (value: string) => void;
  placeholder?: string;
}

const WebEditor: React.FC<WebEditorProps> = ({
  label,
  content,
  setContent,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={8}
        className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
      />
    </div>
  );
};

export default WebEditor;
