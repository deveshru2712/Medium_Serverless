interface QuoteProps {
  quote: string;
  author: string;
}

const Quote = ({ quote, author }: QuoteProps) => {
  return (
    <div className="px-4 max-w-md py-10 h-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold text-start">{quote}</h1>
      <span className="text-lg font-semibold text-slate-600 w-full">
        -{author}
      </span>
    </div>
  );
};

export default Quote;
