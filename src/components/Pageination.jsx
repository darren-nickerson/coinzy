import { Link } from "react-router-dom";

const number = {
  1: 1,
  2: 11,
  3: 21,
  4: 31,
  5: 41,
  6: 51,
  7: 61,
  8: 71,
  9: 81,
  10: 91,
};
function pageination({ page, setPage, searchData }) {
  return (
    <>
      {searchData === "" ? (
        <nav
          className="flex items-center justify-between border-t border-gray-200 bg-primary text-primary px-4 py-6 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm">
              Showing <span className="font-medium">{number[page]}</span> to{" "}
              <span className="font-medium">{page * 10}</span> of{" "}
              <span className="font-medium">100</span> results
            </p>
          </div>
          <div className="flex flex-1 justify-between sm:justify-end">
            {page === 1 ? (
              <Link
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border bg-primary px-4 py-2 text-sm font-medium text-accent opacity-40 "
              >
                The Beginning
              </Link>
            ) : (
              <Link
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-secondary  px-4 py-2 text-sm font-medium text-accent hover:bg-primary"
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Link>
            )}

            {page >= 10 ? (
              <Link
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border bg-primary px-4 py-2 text-sm font-medium text-accent opacity-40 "
              >
                The End
              </Link>
            ) : (
              <Link
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-secondary  px-4 py-2 text-sm font-medium text-accent hover:bg-primary"
                onClick={() => setPage(page + 1)}
              >
                Next Page
              </Link>
            )}
          </div>
        </nav>
      ) : null}
    </>
  );
}

export default pageination;
