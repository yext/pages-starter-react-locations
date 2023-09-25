export interface PaymentOptionsProps {
  name?: string;
  list?: Array<string>;
}

const PaymentOptions = ({ list }: PaymentOptionsProps) => {
  return (
    <>
      <div className="border-b border-gray-300 bg-gray-100 shadow-md rounded-lg p-2 px-4 py-5 sm:p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Options</h2>
        {list && (
          <ul className="list-disc pl-6 space-y-2">
            {list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default PaymentOptions;
