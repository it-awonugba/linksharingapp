"use client";
import React, { useState, FocusEvent, ChangeEvent, MouseEvent } from "react";
import {
  ChevronDown,
  ChevronUp,
  Facebook,
  Github,
  LinkedinIcon,
  Search,
  Youtube,
} from "lucide-react";
import { Input } from "../ui/input";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({ icon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    setShowDropdown(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setTimeout(() => setShowDropdown(false), 100);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e);
  };

  const handleSelect = (value: string) => {
    const event = {
      target: { value },
    } as ChangeEvent<HTMLInputElement>;
    props.onChange?.(event);
    setShowDropdown(false);
  };

  const toggleDropdown = (e: MouseEvent) => {
    e.preventDefault();
    if (showDropdown) {
      setIsFocused(false);
      setShowDropdown(false);
    } else {
      setIsFocused(true);
      setShowDropdown(true);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
        {icon && <span className="absolute left-3 text-gray-500">{icon}</span>}
        <Input
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-10 py-2  focus:outline-none`}
          {...props}
        />
        <div
          className="absolute right-3 text-gray-500 cursor-pointer"
          onMouseDown={toggleDropdown}
        >
          {isFocused || showDropdown ? (
            <ChevronUp color="#633CFF" />
          ) : (
            <ChevronDown />
          )}
        </div>
      </div>
      {showDropdown && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul className="px-4">
            <li
              className="group/item flex items-center gap-x-3 px-4 py-2 cursor-pointer border-b-1 border-b hover:text-primary"
              onMouseDown={() => handleSelect("Github")}
            >
              <Github
                size="12"
                className="fill-[#737373] group-hover/item:fill-primary"
              />
              <span className="text-base">Github</span>
            </li>
            <li
              className="group/item flex items-center gap-x-3 px-4 py-2 cursor-pointer border-b-1 border-b hover:text-primary"
              onMouseDown={() => handleSelect("Youtube")}
            >
              <Youtube
                size="16"
                color="#fff"
                className="fill-[#737373] group-hover/item:fill-primary"
              />
              <span className="text-base">Youtube</span>
            </li>
            <li
              className="group/item flex items-center gap-x-3 px-4 py-2 cursor-pointer border-b-1 border-b hover:text-primary"
              onMouseDown={() => handleSelect("LinkedIn")}
            >
              <LinkedinIcon
                size="12"
                className="fill-[#737373] group-hover/item:fill-primary"
              />
              <span className="text-base">LinkedIn</span>
            </li>
            <li
              className="group/item flex items-center gap-x-3 px-4 py-2 cursor-pointer border-b-1 border-b hover:text-primary"
              onMouseDown={() => handleSelect("Facebook")}
            >
              <Facebook
                size="12"
                color="#fff"
                className="bg-[#737373] group-hover/item:fill-primary group-hover/item:bg-primary"
              />
              <span className="text-base">Facebook</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomInput;
