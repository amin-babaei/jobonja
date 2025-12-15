"use client";

import Dropdown from "@components/ui/Dropdown";
import { Category } from "@typess/index";

export default function CategorySelect({
  categories,
  value,
  onChange,
}: {
  categories: Category[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Dropdown value={value} onChange={onChange}>
      <Dropdown.Trigger placeholder="انتخاب دسته بندی..." />
      <Dropdown.Content>
        <Dropdown.List>
          {categories.map((cat) => (
            <Dropdown.Item key={cat.id} value={cat.name}>
              {cat.name}
            </Dropdown.Item>
          ))}
        </Dropdown.List>
      </Dropdown.Content>
    </Dropdown>
  );
}
