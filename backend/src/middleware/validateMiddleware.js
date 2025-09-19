import { ZodError } from "zod";
import { UnprocessableEntityError } from "../utils/AppError.js";

export const validate = (schema) => (req, res, next) => {
  try {
    if (schema.body) req.body = schema.body.parse(req.body);
    if (schema.params) req.params = schema.params.parse(req.params);
    if (schema.query) req.query = schema.query.parse(req.query);
    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      const msg = err.issues?.map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
      return next(new UnprocessableEntityError(msg || 'Dados inválidos'));
    }
    return next(err);
  }
};
