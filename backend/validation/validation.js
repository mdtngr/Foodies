// Validation
const joi = require('@hapi/joi');

const registerValidation= (data) =>{

    const schema= joi.object({
                            firstName: joi.string()
                                      .min(3)
                                      .required(),

                            lastName: joi.string()
                                      .min(3)
                                      .required(),
                                      
                           phone: joi.string().max(10).min(10).required(),
                           email: joi.string()
                                  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } })
                                  .required(),

                            password: joi.string()
                                  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                                  .min(6)
                                  .required(),

                              facebook: joi.string().default("#"),
                              instagram: joi.string().default("#"),
                              youtube: joi.string().default("#")

                          });

                         return schema.validate(data);

}



const loginValidation = (data) =>{

const schema= joi.object({
                           email: joi.string()
                                  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } })
                                  .required(),

                            password: joi.string()
                                  .min(6)
                                  .required()
                          });

                         return schema.validate(data);

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;