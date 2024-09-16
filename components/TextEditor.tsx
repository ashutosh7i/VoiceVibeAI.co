// components/TextEditor.tsx
"use client";
import React, { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function MyAwesomeTextEditor({ value, onChange }: Props) {
  const modules = useMemo(() => {
    return {
      toolbar: {
        // ... (your toolbar options)
      },
    };
  }, []);

  return (
    <ReactQuill
      className="pt-2"
      defaultValue="Start speaking..."
      style={{ height: "250px" }}
      modules={modules}
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
}
