import { ChangeEvent } from "react";

interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
}

export default function ColorPicker({ color, setColor }: ColorPickerProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <input
      onChange={handleChange}
      type="color"
      value={color}
      className="color-picker"
    />
  );
}
