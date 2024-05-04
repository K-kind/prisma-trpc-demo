type Props = {
  page: number;
  totalPages: number;
  goTo: (page: number) => void;
};

export const Pagination = ({ page, totalPages, goTo }: Props) => {
  return (
    <div className="flex gap-1">
      <button
        className="border h-10 w-9 text-blue-600"
        disabled={page === 1}
        onClick={() => goTo(page - 1)}
      >
        {"<"}
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          className={`border h-10 w-9 ${
            index + 1 === page ? "bg-blue-600 text-white" : "text-blue-600"
          }`}
          key={index}
          disabled={index + 1 === page}
          onClick={() => goTo(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="border h-10 w-9 text-blue-600"
        disabled={page === totalPages}
        onClick={() => goTo(page + 1)}
      >
        {">"}
      </button>
    </div>
  );
};
