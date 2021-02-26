import * as React from "react";

export const Modal: React.FC<{ title: string, show: boolean, onClose: () => void }> = ({ title, show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-xl font-semibold">
                {title}
              </h3>
            </div>
            {/*body*/}
            {children}
            {/*footer*/}
            <div className="flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b">
              <button
                className="background-transparent font-bold uppercase px-6 py-2 text-sm mr-1 mb-1 outline-none focus:outline-none"
                type="button"
                style={{ transition: "all .15s ease" }}
                onClick={onClose}
              >
                Close
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}