import Joi from 'joi'

export const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .min(6)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
})
