import Joi from "joi";

export const createTask = Joi.object({
    user: Joi.object(),
    start: Joi.date().iso(),
    end: Joi.date().iso(),
    task: Joi.string().min(3).max(30)
});