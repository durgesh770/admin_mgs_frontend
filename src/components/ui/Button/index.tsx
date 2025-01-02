import { Grid } from "@mui/material";
import React from "react";
import { CircularProgress } from "@mui/material";

const GlobalStyle = () => (
  <style>{`
  button.custom-btn{
    text-align: center;
    font-family: var(--mulish);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 2px;
    padding: 8px 16px;
    fontFamily: var(--mulish);
    border-radius:3px;
    width: 100%; // Ensure full width
  }

  .primary-btn{
    border-radius:3px;
    color: #FFF;
    background: var(--brand-color);
    border: none;
    fontFamily: var(--mulish);
  }

  .secondary-btn{
    color: #FFF;
    background: var(--brand-black-color);
    fontFamily: var(--mulish);
  }

  .outline-btn{
    border-radius:3px;
    border: 0.5px solid var(--brand-black-color);
    color: var(--brand-black-color);
    fontFamily: var(--mulish);
    border-radius:0.3rem;
  }

  .disabled-btn{
    color: var(  --brand-dark-grey-color);
    background: var(--brand-disabled-white-color);
    fontFamily: var(--mulish);
  }

  .blue-btn{
    color: #FFF;
    background: #006AFF;
    border: none;
    border-radius:0.3rem;
    font-size:14px;
    padding:10px 20px;
    fontFamily: var(--mulish);
  }

  .white-btn{
    background:white;
    fontFamily: var(--mulish);
  }

  .delete-btn{
    color:red;
    background:white;
    border: 1.5px solid red;
    fontFamily: var(--mulish);
  }
  .red-btn{
    color:white;
    background:red;
    padding:10px 20px;
    border-radius:3px;
    fontFamily: var(--mulish);
  }
  .green-btn{
    color:white;
    background:green;
    padding:10px 20px;
    border-radius:3px;
    fontFamily: var(--mulish);
  }
`}</style>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  btnType:
    | "primary"
    | "secondary"
    | "outline"
    | "disabled"
    | "blue"
    | "white"
    | "delete"
    | "red"
    | "green";
  loading: boolean;
  isDisable?:boolean
}

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  btnType,
  isDisable,
  ...restProps
}) => {
  let btn_class = `custom-btn ${btnType}-btn ${restProps.className}`;

  return (
    <>
      <button {...restProps} className={btn_class} disabled={isDisable}>
        {loading && <CircularProgress size={16} style={{ color: "#fff" }} />}
        {children}
      </button>
      <GlobalStyle />
    </>
  );
};

export const BoxButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      className="p-1 mt-4 text-center border"
      sx={{
        backgroundColor: "var(--brand-grey-color)",
        borderRadius: "2px",
        border: "1px solid #dbdbdb",
      }}
    >
      {/* Open modal on button click */}
      <button className="text-sm font-semibold text-blue-500 ">
        {children}
      </button>
    </Grid>
  );
};

export default Button;
