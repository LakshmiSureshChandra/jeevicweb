import { Select } from "radix-ui";
import { cn } from "../../lib/utils";
import React from "react";
import { Tick01Icon } from "hugeicons-react";

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={cn(
          "relative flex h-[25px] cursor-pointer items-center rounded-[3px] pr-[35px] pl-[25px] leading-none text-[#555] select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          <Tick01Icon />
        </Select.ItemIndicator>
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  },
);

export default SelectItem;
