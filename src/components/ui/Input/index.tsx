import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  borderline?: boolean;
}

const Input: React.FC<InputProps> = ({ borderline, label, ...restProps }) => {
  return (
    <div className="input-container">
      <label
        className='input-label'
      >
        {label}
      </label>
      <input className="  focus:ring-blue-500 focus:border-blue-500 "  style={{ border: borderline ? `0.1px solid #a7a9ab` : "", borderRadius:"5px" }}
        {...restProps} />
    </div>
  );
};

export default Input;
