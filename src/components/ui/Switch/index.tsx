import * as React from 'react';


const GlobalStyle = () => (
  <style>{`
      /* Your global styles here */

      .switch-container  .circle{
        border-radius: 20px;
        background-color: var(--brand-pastel-color) !important;
        border: 2px solid var(--brand-dark-grey-color)  !important;
      }

      .switch-container  .circle:after{
        background-color: var(--brand-color);
        border-color: var(--brand-color);
      }
    `}</style>
);


interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  switchValue?: boolean
  setSwitchValue?: (value: boolean) => void;
}


const Switch: React.FC<SwitchProps> = ({ type, switchValue, setSwitchValue, ...restProps }) => {

  const handleChange = () => {
    setSwitchValue && setSwitchValue(!switchValue);
  };

  return (
    <div className='switch-container'>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" onClick={handleChange} checked={switchValue} {...restProps} />
        <div className="circle w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
      </label>
      <GlobalStyle />
    </div>
  );
}

export default Switch;