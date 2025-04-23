import React, { forwardRef, Fragment } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "../../lib/utils";

const DualRangeSlider = forwardRef(
  ({ className, label, labelPosition = "top", ...props }, ref) => {
    const initialValue = Array.isArray(props.value)
      ? props.value
      : [props.min, props.max];

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none items-center select-none",
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-[#D9D9D9]">
          <SliderPrimitive.Range className="absolute h-full bg-[#4172DC]" />
        </SliderPrimitive.Track>
        {initialValue.map((value, index) => (
          <Fragment key={index}>
            <SliderPrimitive.Thumb className="ring-offset-background focus-visible:ring-ring relative block h-4 w-4 rounded-full border-2 border-[#4172DC] bg-[#4172DC] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
              {label && (
                <span
                  className={cn(
                    "absolute flex w-full justify-center",
                    labelPosition === "top" && "-top-7",
                    labelPosition === "bottom" && "top-4",
                  )}
                >
                  {label(value)}
                </span>
              )}
            </SliderPrimitive.Thumb>
          </Fragment>
        ))}
      </SliderPrimitive.Root>
    );
  },
);

export default DualRangeSlider;
