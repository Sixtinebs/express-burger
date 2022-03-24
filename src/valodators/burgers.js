const Joi = require("joi");

const create = Joi.object({
  nom: Joi.string().required(),
  prix: Joi.number().required(), 
  description: Joi.string().required(),
});

module.exports = {
  create,
};