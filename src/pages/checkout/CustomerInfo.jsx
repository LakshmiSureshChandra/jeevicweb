import React from "react";
import OrderSummary from "../../components/OrderSummary";
import { Select } from "radix-ui";
import { ArrowDown01Icon } from "hugeicons-react";
import SelectItem from "../../components/ui/SelectItem";

const countries = [
  "pakistan",
  "india",
  "nepal",
  "china",
  "bangladesh",
  "afghanistan",
  "australia",
];

const reigons = [
  "sindh",
  "balochistan",
  "punjab",
  "texas",
  "mahrashtra",
  "mumbai",
  "dubai",
];

const CustomerInfo = () => {
  return (
    <section className="flex flex-col items-end justify-between gap-8 lg:flex-row lg:items-start xl:gap-12">
      <div className="w-full">
        <h2 className="text-dark text-xl font-bold">Customer Info</h2>
        <div className="mt-5 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex w-full flex-col gap-1">
              <label
                htmlFor="customer-email"
                className="text-sm font-semibold text-[#555]"
              >
                E-mail
              </label>
              <input
                className="text-dark w-full rounded-[4px] border border-[#d9d9d9] p-3 text-sm font-semibold placeholder:font-medium placeholder:opacity-60 md:text-base"
                placeholder="Enter your email"
                type="email"
                id="customer-email"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="customer-firstname"
                  className="text-sm font-semibold text-[#555]"
                >
                  First Name
                </label>
                <input
                  className="text-dark w-full rounded-[4px] border border-[#d9d9d9] p-3 text-sm font-semibold placeholder:font-medium placeholder:opacity-60 md:text-base"
                  placeholder="Enter your First Name"
                  type="text"
                  id="customer-firstname"
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="customer-lastname"
                  className="text-sm font-semibold text-[#555]"
                >
                  Last Name
                </label>
                <input
                  className="text-dark w-full rounded-[4px] border border-[#d9d9d9] p-3 text-sm font-semibold placeholder:font-medium placeholder:opacity-60 md:text-base"
                  placeholder="Enter your Last Name"
                  type="text"
                  id="customer-lastname"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-dark font-bold">Shipping Address</h3>
            <div className="mt-5 flex flex-col gap-3">
              <SelectDropdown label="Country" items={countries} />
              <SelectDropdown label="Region" items={reigons} />

              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="customer-address"
                  className="text-sm font-semibold text-[#555]"
                >
                  Address
                </label>
                <input
                  className="text-dark w-full rounded-[4px] border border-[#d9d9d9] p-3 text-sm font-semibold placeholder:font-medium placeholder:opacity-60 md:text-base"
                  placeholder="Enter your Address"
                  type="text"
                  id="customer-address"
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="customer-phonenumber"
                  className="text-sm font-semibold text-[#555]"
                >
                  Phone Number
                </label>
                <input
                  className="text-dark w-full rounded-[4px] border border-[#d9d9d9] p-3 text-sm font-semibold placeholder:font-medium placeholder:opacity-60 md:text-base"
                  placeholder="Enter your Phone Number"
                  type="text"
                  id="customer-phonenumber"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderSummary link="/checkout/order-information" buttonText="Pay now" />
    </section>
  );
};

export default CustomerInfo;

const SelectDropdown = ({ label, items }) => {
  return (
    <Select.Root>
      <span className="text-sm font-semibold text-[#555]">{label}</span>
      <Select.Trigger className="text-dark flex w-full cursor-pointer justify-between rounded-[4px] border border-[#d9d9d9] p-3 text-sm font-semibold capitalize data-[placeholder]:font-medium data-[placeholder]:opacity-60 md:text-base">
        <Select.Value className="capitalize" placeholder={`Select ${label}`} />
        <Select.Icon>
          <ArrowDown01Icon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          className="max-h-[300px] overflow-y-scroll rounded-md border border-[#d9d9d9] bg-white"
        >
          <Select.Viewport className="px-5 py-4">
            <Select.Group className="flex flex-col gap-3">
              {items.map((item, i) => {
                return (
                  <SelectItem key={i} className="capitalize" value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
