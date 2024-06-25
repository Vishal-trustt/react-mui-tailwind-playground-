import { useState } from "react";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import quillEmoji from "react-quill-emoji";
import "react-quill-emoji/dist/quill-emoji.css";
import ToolbarEmoji from "./ToolbarEmoji";
import EmojiBlot from "./EmojiBlot";
import { Box } from "@mui/material";

Quill.register(
  {
    "modules/emoji-toolbar": ToolbarEmoji,
    "modules/emoji-shortname": quillEmoji.ShortNameEmoji,
  },
  true
);
function Editor() {
  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  let editorRef;
  const toolbarOptions = {
    container: [["bold", "italic", "emoji"]],
  };
  const modules = {
    toolbar: toolbarOptions,
    emoji: true,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setText(value);
    setValue("");
  };

  return (
    <Box>
      <Box>
        <form className="card" onSubmit={handleSubmit}>
          <div className="group">
            <ReactQuill
              theme="snow"
              value={value}
              placeholder="Your Text Here..."
              onChange={setValue}
              modules={modules}
              ref={editorRef}
              style={{
                display: "flex",
                flexDirection: "column-reverse",
                border: "1px solid grey",
              }}
            />
          </div>
        </form>
      </Box>
    </Box>
  );
}

export default Editor;
