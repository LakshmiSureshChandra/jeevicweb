import React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "../../lib/utils";

const InputOTP = React.forwardRef(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  ),
);

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative mx-1 flex h-9 w-10 items-center justify-center border-b border-b-[#D9D9D9] text-sm transition-all",
        isActive && "border-b-blue",
        className,
      )}
      {...props}
    >
      {!char && (
        <div
          className={`aspect-square w-2 rounded-full bg-[#d9d9d9] ${isActive && "bg-blue opacity-60"}`}
        ></div>
      )}
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
});

export { InputOTP, InputOTPGroup, InputOTPSlot };
