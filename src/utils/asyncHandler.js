// asyncHandler is a higher-order function —
// it wraps your async function and automatically catches errors for you.

const asyncHandler = (requesthandler) => {
  return (req, res, next) => {
    Promise.resolve(requesthandler(req, res, next)).catch(next);
  };
};

export { asyncHandler };

// using try catch

// const asyncHandler1 =  (fn) => async (req , res , next) => {
//     try {
//         await fn(req , res ,next)
//     } catch (error) {
//        res.status(error.code || 500).json({
//         success : false ,
//         message : error.message
//        })

//     }
// }
