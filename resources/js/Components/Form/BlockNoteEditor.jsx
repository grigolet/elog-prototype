import React, { useCallback } from "react";
import { ariaDescribedByIds } from "@rjsf/utils";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

const BlockNoteEditor = ({
  id,
  name,
  options = {},
  placeholder,
  value,
  required,
  disabled,
  readonly,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  formData,
}) => {
  let formattedData;
  try {
    formattedData = formData;
  } catch (error) {
    formattedData = null;
  }

  const editor = useCreateBlockNote({
    initialContent: formattedData,
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={!disabled}
      onChange={() => onChange(editor.document)}
    />
  );
};

export default BlockNoteEditor;
