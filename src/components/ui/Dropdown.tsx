// PriorityDropdown.tsx
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";

interface PriorityDropdownProps {
  priority: "low" | "medium" | "high";
  setPriority: React.Dispatch<React.SetStateAction<"low" | "medium" | "high">>;
}

const PriorityDropdown: React.FC<PriorityDropdownProps> = ({
  priority,
  setPriority,
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {priority.charAt(0).toUpperCase() + priority.slice(1)}{" "}
          {/* Capitalize the first letter */}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Priority selection"
        selectionMode="single"
        selectedKeys={new Set([priority])}
        onSelectionChange={(selectedKeys) => {
          const selected = Array.from(selectedKeys)[0];
          setPriority(selected as "low" | "medium" | "high");
        }}
      >
        <DropdownItem key="low">Low</DropdownItem>
        <DropdownItem key="medium">Medium</DropdownItem>
        <DropdownItem key="high">High</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PriorityDropdown;
