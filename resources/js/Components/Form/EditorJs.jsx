import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import NestedList from "@editorjs/nested-list";
import CheckList from "@editorjs/checklist";
import Table from "@editorjs/table";
import CodeTool from "@editorjs/code";
import CodeBox from "@bomdi/codebox";

import React, { useEffect, useRef, useState } from "react";
import { ariaDescribedByIds } from "@rjsf/utils";

const EditorJs = ({
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
  const editorRef = useRef(null);
  // const [editorInstance, setEditorInstance] = useState(null);
  // const [inputValue, setInputValue] = useState("{}");

  let formattedData;
  try {
    formattedData = formData;
  } catch (error) {
    formattedData = null;
  }

  useEffect(() => {
    async function initializeEditor() {
      if (!editorRef.current) {
        const editor = new EditorJS({
          holder: "editorjs",
          data: formattedData,
          autofocus,
          placeholder,
          readOnly: readonly,
          onChange: async (api, event) => {
            try {
              const content = await api.saver.save();
              onChange(content);
            } catch (Error) {}
          },
          tools: {
            header: {
              class: Header,
              shortcut: "CTRL+SHIFT+H",
              levels: [1, 2, 3],
              defaultLevel: 1,
              inlineToolbar: true,
            },
            quote: {
              class: Quote,
              inlineToolbar: true,
            },
            list: {
              class: NestedList,
              inlineToolbar: true,
            },
            checklist: {
              class: CheckList,
              inlineToolbar: true,
            },
            table: {
              class: Table,
              inlineToolbar: true,
            },
            code: CodeTool,
            codeBox: {
              class: CodeBox,
              config: {
                themeURL:
                  "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css", // Optional
                themeName: "atom-one-dark", // Optional
                useDefaultTheme: "light", // Optional. This also determines the background color of the language select drop-down
              },
            },
          },
        });
        try {
          await editor.isReady;
          editorRef.current = editor;
        } catch (error) {
          console.error(error);
        }
      }
    }
    initializeEditor();
  }, []);

  return (
    <div
      className="block prose w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
      id="editorjs"
    ></div>
  );
};

// link
// attaches
// embed
// table
// code
// raw
// marker
// inline-code underline
// simple-image
// image
// checklist
// nested-list
// list
// quote

// /** The `EditorJs` is a widget for rendering input fields as textarea.
//  *
//  * @param props - The `WidgetProps` for this component
//  */
// function EditorJs({
//     id,
//     options = {},
//     placeholder,
//     value,
//     required,
//     disabled,
//     readonly,
//     autofocus = false,
//     onChange,
//     onBlur,
//     onFocus,
// }) {
//     const handleChange = useCallback(
//         ({ target: { value } }) =>
//             onChange(value === "" ? options.emptyValue : value),
//         [onChange, options.emptyValue]
//     );

//     const handleBlur = useCallback(
//         ({ target: { value } }) => onBlur(id, value),
//         [onBlur, id]
//     );

//     const handleFocus = useCallback(
//         ({ target: { value } }) => onFocus(id, value),
//         [id, onFocus]
//     );

//     return (
//         <textarea
//             id={id}
//             name={id}
//             className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
//             value={value ? value : ""}
//             placeholder={placeholder}
//             required={required}
//             disabled={disabled}
//             readOnly={readonly}
//             autoFocus={autofocus}
//             rows={options.rows}
//             onBlur={handleBlur}
//             onFocus={handleFocus}
//             onChange={handleChange}
//             aria-describedby={ariaDescribedByIds(id)}
//         />
//     );
// }

export default EditorJs;
