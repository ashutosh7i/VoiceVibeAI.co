import React, { useEffect } from "react";

const Toast = ({ type, message, show, setShow }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  const getColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500 hover:bg-green-600";
      case "error":
        return "bg-red-500 hover:bg-red-600";
      case "created":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    show && (
      <button
        type="button"
        onClick={() => setShow(false)}
        className={`fixed left-1/2 transform -translate-x-1/2 bottom-20 z-[9999] max-w-md rounded-md px-4 py-2 text-white transition ${getColor()}`}
      >
        <div className="flex items-center space-x-2">
          <span className="text-3xl">
            <i className="bx bx-check"></i>
          </span>
          <p className="font-bold">{message}</p>
        </div>
      </button>
    )
  );
};

export default Toast;

//usage-

// import React, { useState } from 'react';
// import Toast from './Toast';

// const MainComponent = () => {
//   const [showToast, setShowToast] = useState(false);

//   const displayToast = () => {
//     setShowToast(true);
//   };

//   return (
//     <div>
//       {/* Your other components */}
//       <button onClick={displayToast}>Show Toast</button>
//       <Toast type="success" message="Item Created Successfully!" show={showToast} setShow={setShowToast} />
//     </div>
//   );
// };

// export default MainComponent;
