"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
} from "react";
import { ChevronDown } from "lucide-react";
import useClickOutside from "@hooks/useClickOutside";

interface DropdownContextType {
  open: boolean;
  setOpen: (v: boolean) => void;
  value: string;
  onChange: (v: string) => void;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

export default function Dropdown({
  children,
  value,
  onChange,
}: {
  children: ReactNode;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <DropdownContext.Provider value={{ open, setOpen, value, onChange }}>
      <div ref={ref} className="relative w-full">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function useDropdown() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("Dropdown components must be inside <Dropdown>");
  return ctx;
}

Dropdown.Trigger = function Trigger({ placeholder }: { placeholder: string }) {
  const { open, setOpen, value } = useDropdown();
  return (
    <button
      onClick={() => setOpen(!open)}
      className="flex justify-between items-center w-full border border-border-main p-3 rounded-lg bg-card"
    >
      {value || placeholder}
      <ChevronDown size={20} className="text-muted" />
    </button>
  );
};

Dropdown.Content = function Content({ children }: { children: ReactNode }) {
  const { open } = useDropdown();
  if (!open) return null;

  return (
    <div className="absolute z-20 bg-card mt-2 w-full border border-border-main rounded-lg shadow-lg">
      {children}
    </div>
  );
};

Dropdown.List = function List({ children }: { children: ReactNode }) {
  return <ul className="max-h-60 overflow-y-auto">{children}</ul>;
};

Dropdown.Item = function Item({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) {
  const { onChange, setOpen } = useDropdown();

  return (
    <li
      onClick={() => {
        onChange(value);
        setOpen(false);
      }}
      className="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {children}
    </li>
  );
};
