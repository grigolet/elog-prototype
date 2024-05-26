import React, { useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";

class MyUploadAdapter {
  constructor(loader) {
    // CKEditor 5's FileLoader instance.
    this.loader = loader;

    // URL where to send files.
    this.url = "/upload";
  }

  // Starts the upload process.
  upload() {
    return new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject);
      this._sendRequest();
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());
    const csrfToken = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");

    xhr.open("POST", this.url, true);
    xhr.responseType = "json";
    xhr.setRequestHeader("X-CSRF-TOKEN", csrfToken);
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;
      console.log(response, response.error);

      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      resolve({
        default: response.url,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest() {
    this.loader.file.then((file) => {
      const data = new FormData();
      data.append("upload", file);

      this.xhr.send(data);
    });
  }

  // Aborts the upload process.
  abort() {
    // Reject the promise returned from the upload() method.
    this.source.cancel("Operation cancelled by the user");
    this.cancelToken.cancel();
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your backend here!
    return new MyUploadAdapter(loader);
  };
}

export default function CustomCKEditor({
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
}) {
  const [state, setState] = useState({
    documents: [value],
    documentID: 0,
    editor: null,
  });

  const csrfToken = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

  const config = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
  };

  function updateData(event, editor) {
    setState((prevState) => ({
      ...prevState,
      documents: state.documents.map((data, index) => {
        if (index === state.documentID) {
          return state.editor.getData();
        }

        return data;
      }),
    }));
    onChange(editor.getData());
  }

  return (
    <div className="prose">
      <CKEditor
        editor={ClassicEditor}
        config={config}
        id={state.documentID}
        data={state.documents[state.documentID]}
        onReady={(editor) => {
          if (readonly) editor.enableReadOnlyMode("read-only");
          window.editor = editor;
          setState((prevState) => ({ ...prevState, editor }));
        }}
        readonly={readonly}
        onChange={(event, editor) => updateData(event, editor)}
      />
    </div>
  );
}
