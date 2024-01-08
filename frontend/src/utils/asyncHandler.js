import { toast } from "react-toastify";
export const asyncHandler = async (callBack) => {
  return Promise.resolve(callBack()).catch((error) => {
    console.log(error);
    errorHandler(error);
    return null;
  });
};

//handle Error and display toast message to user
const errorHandler = (error) => {
  const message = error?.response?.data?.message || "something went wrongs !";
  toast.error(message);
};

// export const asyncHandler2 = (callback) => {
//   return (req, res, errorCallBack) => {
//     return Promise.resolve(callback(req, res, errorCallBack)).catch(
//       errorCallBack
//     );
//   };
// };


// export const asyncHandler3 = (callBack) => {
//   return new Promise((resolve, reject) => {
//     callBack()
//       .then((result) => {
//         resolve(result);//do more operations, toast or others
//       })
//       .catch((error) => {
//         console.log(error);
//         errorHandler(error);
//         reject(null);
//       });
//   });
// };

// // Assuming you have an asynchronous function like this
// const fetchData = async () => {
//   // Simulating an API call
//   const response = await fetch('https://api.example.com/data');
//   const data = await response.json();
//   return data;
// };

// // Call asyncHandler with the fetchData function
// asyncHandler(fetchData)
//   .then((result) => {
//     // Handle the result (data from the fetchData function)
//     console.log("Success!", result);
//   })
//   .catch((error) => {
//     // Handle errors
//     console.error("Error:", error);
//   });
