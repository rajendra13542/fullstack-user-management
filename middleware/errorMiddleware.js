import AppError from "../utils/AppError.js";

const handleCastError = () =>
  new AppError("Invalid ID format", 400);

const handleDuplicateError = () =>
  new AppError("Duplicate field value", 400);

const handleValidationError = (err) => {
  const message = Object.values(err.errors)
    .map(val => val.message)
    .join(", ");
  return new AppError(message, 400);
};

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // 🔹 MongoDB / Mongoose errors
  if (err.name === "CastError") error = handleCastError();
  if (err.code === 11000) error = handleDuplicateError();
  if (err.name === "ValidationError") error = handleValidationError(err);

  // 🔹 Default values
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  // 🔹 Development (full error)
  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      success: false,
      message,
      stack: err.stack,
      error: err,
    });
  }

  // 🔹 Production (safe response)
  if (error.isOperational) {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  // 🔹 Unknown errors
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};

export default errorHandler;