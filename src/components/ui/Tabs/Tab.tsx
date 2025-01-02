import { usePathname, useRouter,  } from "next/navigation";
import * as React from "react";

interface TabProps {
  value: number;
  setValue: (newValue: number) => void;
  tabs: { label: string; icon: React.ReactNode }[];
}

export default function Tab({ setValue, value, tabs }: TabProps) {
  const pathname = usePathname();
  const router =   useRouter()

  const handleChange = (newValue: number) => {
    router.push(`${pathname}?tab=${newValue}`)
    setValue(newValue);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 ">
      <ul className="flex relative  overflow-x-auto  tab-hide-scrollbar  text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {tabs.map((tab, index) => (
          <li key={index} className="me-2" onClick={() => handleChange(index)}>
            <a
              href="#"
              className={`inline-flex items-center justify-center p-4 rounded-t-lg 
                                ${
                                  value === index
                                    ? "text-[--brand-color] border-b-2 border-[--brand-color] active dark:text-[--brand-color] dark:border-[--brand-color]"
                                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                                }`}
            >
              {tab.icon} <span className="ml-2">{tab.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
