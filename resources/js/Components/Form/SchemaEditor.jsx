import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { VFC, useRef, useState, useEffect } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

export const SchemaEditor = ({
  id,
  value,
  onChange,
  className = "w-full h-72",
}) => {
  return (
    <Editor
      className={className}
      id={id}
      value={value}
      onChange={onChange}
      defaultLanguage="json"
      options={{
        scrollbar: {
          useShadows: false,
          vertical: "hidden",
          verticalScrollbarSize: 0,
        },
      }}
    />
  );
};
