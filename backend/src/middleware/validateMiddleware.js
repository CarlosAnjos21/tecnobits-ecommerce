// Middleware de validação para Joi
// Aceita tanto um schema único (para body) quanto um objeto { body, params, query }
export const validate = (schema) => (req, res, next) => {
  const normalize = (sch) => ({ body: sch });
  const target = schema && (schema.isJoi ? normalize(schema) : schema);

  if (!target || (!target.body && !target.params && !target.query)) {
    return next();
  }

  const options = { abortEarly: false, stripUnknown: true }; // remove chaves desconhecidas

  // Validar body
  if (target.body) {
    const { value, error } = target.body.validate(req.body, options);
    if (error) return res.status(422).json({ message: error.details.map(d => d.message).join('; ') });
    req.body = value;
  }
  // Validar params
  if (target.params) {
    const { value, error } = target.params.validate(req.params, options);
    if (error) return res.status(422).json({ message: error.details.map(d => d.message).join('; ') });
    req.params = value;
  }
  // Validar query
  if (target.query) {
    const { value, error } = target.query.validate(req.query, options);
    if (error) return res.status(422).json({ message: error.details.map(d => d.message).join('; ') });
    req.query = value;
  }
  next();
};
