import { ArrowRight01Icon, UserIcon } from "hugeicons-react";
import React from "react";
import { DropdownMenu } from "radix-ui";

const SettingsMenu = ({ dropDownData, children }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex cursor-pointer items-center gap-2">
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="sm:ml-2sm:rounded-[8px] z-20 mt-6 !w-screen bg-[#fff] px-8 py-6 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.10)] md:ml-4 md:!w-[500px]">
          {Object.entries(dropDownData).map(([section, items]) => (
            <div key={section}>
              <DropdownMenu.Label className="my-2 text-lg font-semibold text-[#202020] md:text-xl">
                {section}
              </DropdownMenu.Label>
              {items[0].map((item, index) => (
                <div key={index}>
                  <DropdownMenu.Item
                    className="flex cursor-pointer items-center justify-between rounded py-2 pb-3 text-sm font-medium outline-none md:text-base"
                    onClick={() => (window.location.href = item.location)}
                  >
                    {item.name}
                    <ArrowRight01Icon />
                  </DropdownMenu.Item>
                  {
                    <DropdownMenu.Separator className="h-px bg-black opacity-10" />
                  }
                </div>
              ))}
            </div>
          ))}
          <DropdownMenu.Label
            className="my-2 flex cursor-pointer items-center justify-between rounded text-lg font-semibold text-[#202020] lg:text-xl"
            onClick={() => (window.location.href = "/about")}
          >
            About
            <ArrowRight01Icon />
          </DropdownMenu.Label>

          <DropdownMenu.Item className="mt-4 cursor-pointer text-sm text-[#FF0004] outline-none">
            Delete My account
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default SettingsMenu;
