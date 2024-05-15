import EditorJS from "@editorjs/editorjs";

import React, { useEffect, useRef, useState } from "react";
import { ariaDescribedByIds } from "@rjsf/utils";

// class EditorWidget extends Component {
//     constructor(props) {
//         super(props);
//         this.editorRef = createRef();
//     }

//     async componentDidMount() {
//         const data = this.props?.value || {};
//         console.log(data);
//         this.editor = new EditorJS({
//             holder: this.editorRef.current,
//             onChange: (api, event) => console.log(api, event),
//             data,
//         });
//         try {
//             await this.editor.isReady;
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     async saveData() {
//         try {
//             this.props.value = await this.editor.save();
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     render() {
//         return (
//             <>
//                 <div
//                     className="bg-white shadow border border-gray-300"
//                     ref={this.editorRef}
//                     value={this.props.value}
//                     id={this.props.id}
//                     name={this.props.name}
//                     onChange={(e) => await this.saveData()}
//                 />
//                 <input
//                     type="hidden"
//                     name={this.props.name}
//                     value={this.props.value}
//                 />
//             </>
//         );
//     }
// }

const EditorWidget = ({
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
}) => {
    const editorRef = useRef(null);
    // const [editorInstance, setEditorInstance] = useState(null);
    // const [inputValue, setInputValue] = useState("{}");

    let formattedData;
    try {
        formattedData = value;
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
        <div>
            <div
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
                id="editorjs"
            ></div>
        </div>
    );
};

// /** The `EditorWidget` is a widget for rendering input fields as textarea.
//  *
//  * @param props - The `WidgetProps` for this component
//  */
// function EditorWidget({
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

export default EditorWidget;
