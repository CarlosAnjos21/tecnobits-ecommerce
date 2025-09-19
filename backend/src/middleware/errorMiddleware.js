import { AppError } from "../utils/AppError.js";

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message, code: err.code });
  }

  console.error("Unhandled error:", err);
  return res.status(500).json({ error: "Erro interno do servidor", code: "internal_error" });
}
