import * as React from "react";
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import classNames from "classnames";
import Markdown from 'markdown-to-jsx';
import { AnalyticsScopeProvider } from "@yext/pages/components";

const Faqs = (props:any) => {
    const { faqs } = props;

  return (
    <>
        <AnalyticsScopeProvider name={"faqs"}>
            <div className="section bg-gray-50">
                <div className="mx-auto max-w-7xl py-12 px-4 shadow-md sm:py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
                    <h2 className="text-center font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Frequently asked questions
                    </h2>
                    <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                    {faqs.map((faq) => (
                        <Disclosure as="div" key={faq.question} className="pt-6">
                        {({ open }) => (
                            <>
                            <dt className="text-lg">
                                <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                                <span className="font-medium text-gray-900">{faq.question}</span>
                                <span className="ml-6 flex h-7 items-center">
                                    <ChevronDownIcon
                                    className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                                    aria-hidden="true"
                                    />
                                </span>
                                </Disclosure.Button>
                            </dt>
                            <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                <Markdown className="prose prose-a:text-blue-700">{faq.answer}</Markdown>
                            </Disclosure.Panel>
                            </>
                        )}
                        </Disclosure>
                    ))}
                    </dl>
                </div>
                </div>
            </div>
        </AnalyticsScopeProvider>
    </>
  );
};

export default Faqs;
