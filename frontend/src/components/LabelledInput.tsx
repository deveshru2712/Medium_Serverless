import { ChangeEvent } from "react";

interface LabelledInputProps {
  label: string;
  placeholder: string;
  type: string;
  name: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput = ({
  label,
  placeholder,
  type,
  name,
  onchange,
}: LabelledInputProps) => {
  return (
    <div className="w-full mt-3">
      <label htmlFor={label} className="text-lg text-slate-500 font-medium">
        {label}
      </label>
      <input
        type={type}
        id={type}
        name={name}
        onChange={onchange}
        placeholder={placeholder}
        className="w-full bg-active border-2 px-2 py-1 rounded-md mt-1 outline-none"
      />
    </div>
  );
};

export default LabelledInput;
