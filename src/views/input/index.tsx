import React, { ChangeEvent, FC } from "react";

interface InputViewProps {
  name: string;
  placeholder: string;
  clickhandle?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputView: FC<InputViewProps> = ({
  placeholder,
  name,
  clickhandle,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="input-label"
        className="text-base/normal text-default-200 mb-2 block font-semibold"
      >
        {name}
      </label>
      <input
        type="text"
        id="input-label"
        onChange={clickhandle}
        placeholder={placeholder}
        className="border-default-200 block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white focus:ring-transparent focus:border-white/25"
      />
    </div>
  );
};
