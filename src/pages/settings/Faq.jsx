import React from "react";
import { Accordion } from "radix-ui";
import { cn } from "../../lib/utils";
import { ArrowDown01Icon, MinusSignIcon, PlusSignIcon } from "hugeicons-react";

const Faq = () => {
  return (
    <section className="flex w-full flex-col rounded-[8px] bg-[rgba(9,102,178,0.1)] p-6">
      <h2 className="px-5 text-xl font-semibold text-[#202020]">FAQ</h2>
      <Accordion.Root
        className="w-full rounded-md"
        type="single"
        defaultValue="question-1"
        collapsible
      >
        <FaqSection
          id="question-1"
          question="What is Webflow and why is it the best website builder?"
          answer="Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."
        />
        <FaqSection
          id="question-2"
          question="What is your favorite template from BRIX Templates?"
          answer="Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere"
        />
        <FaqSection
          id="question-3"
          question="How do you clone a template from the Showcase?"
          answer="Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."
        />
        <FaqSection
          id="question-4"
          question="Why is BRIX Templates the best Webflow agency?"
          answer="Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."
        />
        <FaqSection
          id="question-5"
          question="When was Webflow officially launched?"
          answer="Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."
        />
        <FaqSection
          id="question-6"
          question="How do you integrate Jetboost with Webflow?"
          answer="Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."
        />
      </Accordion.Root>
    </section>
  );
};

export default Faq;

const FaqSection = ({ id, question, answer }) => {
  return (
    <Accordion.Item
      className="mt-px overflow-hidden shadow-[0_1px_0] shadow-[#00000050] first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10"
      value={id}
    >
      <Accordion.Header className="flex">
        <Accordion.Trigger className="group flex h-[45px] flex-1 cursor-pointer items-center justify-between px-5 py-8 text-lg leading-none font-bold text-[#303A42] outline-none data-[state=open]:text-[#0093FF]">
          {question}
          <PlusSignIcon
            className="group-data-[state=open]:hidden"
            aria-hidden
          />
          <MinusSignIcon
            className="group-data-[state=closed]:hidden group-data-[state=open]:block"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="AccordionContent data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown overflow-hidden text-[#303A42]">
        <div className="px-5 pt-1 pb-4">{answer}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
};
