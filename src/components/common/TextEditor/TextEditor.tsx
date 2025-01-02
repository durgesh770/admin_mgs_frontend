import Link from "next/link";
import React, { useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import SimpleTextEditor from "../SimpleTextEditor/SimpleTextEditor";

interface TextEditorProps {
  defaultValue?: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  Fixedheight?: string | number;
  maxWords?: number;
  url:string
}

const TextEditor = ({
  defaultValue,
  value,
  onChange,
  placeholder,
  Fixedheight,
  maxWords,
  url
}: TextEditorProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
    <div className="flex flex-row items-center justify-between mx-2">
      <div> <Link className="text-blue-600 underline " href={''} >Click here to See </Link>  </div>
      <div className="flex justify-end py-2 ">
        {show && (
          <RemoveRedEyeOutlinedIcon
            onClick={() => setShow(false)}
            className="cursor-pointer "
          />
        )}
        {!show && (
          <VisibilityOffOutlinedIcon
            onClick={() => setShow(true)}
            className="cursor-pointer "
          />
        )}
      </div>
      </div>
        <div className="py-4" hidden={show}>
          <SimpleTextEditor
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            Fixedheight={Fixedheight}
            maxWords={maxWords}
          />
        </div>
      {show && (
        <div
          className="py-4 "
          dangerouslySetInnerHTML={{
            __html: value,
          }}
        ></div>
      )}
    </>
  );
};

export default TextEditor;
