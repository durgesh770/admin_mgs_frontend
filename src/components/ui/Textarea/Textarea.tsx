import React from "react";

interface textareaprops {
  value: any;
  onChange: any;
  textrows: any;
  label: string;
}

const Textarea = ({ value, onChange, textrows, label }: textareaprops) => {
  return (
    <>
      <form className="">
        <div className="block border border-gray-200 lg:flex lg:bg-[--brand-pastel-color]   ">
          <span
            style={{ width: "180px" }}
            className={` inline-flex items-center pl-2 text-lg text-black font-bold lg:bg-[--brand-pastel-color] p-2 lg:border lg:border-gray-200 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600  `}
          >
            {" "}
            {label}
          </span>
          <textarea
            id="comment"
            value={value}
            onChange={onChange}
            rows={textrows}
            className={` text-gray-900 focus:border-gray-100 block flex-1 min-w-0 w-full text-sm lg:border border-0 border-gray-200 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-gray-100 bg-white`}
            placeholder="Add a Notes"
            required
          ></textarea>
        </div>
      </form>
    </>
  );
};

export default Textarea;
