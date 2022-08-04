import * as React from "react";
import Markdown from 'markdown-to-jsx';

const Faqs = (props:any) => {
    const { faqs } = props;
    const faqDivs = faqs.map((faq:any) => (
      <div className="bg-gray-200 p-4 rounded-lg drop-shadow-md space-y-5">
        <h3 className="text-lg font-semibold">{faq.question}</h3>
        <p><Markdown>{faq.answer}</Markdown></p>
      </div>
    ));


  return (
    <>
        <div>
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqDivs}
            </div>
        </div>
    </>
  );
};

export default Faqs;
