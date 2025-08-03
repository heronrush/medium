import type { ChangeEvent } from "react";

type LabelInputType = {
  label: string;
  type: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function LabelInput({
  label,
  type,
  placeholder,
  onChange,
}: LabelInputType) {
  return (
    <div className="mb-3">
      <label className="font-semibold text-[17px]">{label}</label>
      <br />
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 focus:border-gray-500 focus:outline-0 py-1.5 pl-2 rounded-sm my-1"
        required
        onChange={onChange}
      />
    </div>
  );
}
