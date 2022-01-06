import { check, validationResult } from "express-validator"

export const validatior = [
    check('firstName')
        .notEmpty()
        .withMessage('firstname is required'),
    check('lastName')
        .notEmpty()
        .withMessage('lastname is required'),
    check('email')
        .isEmail()
        .withMessage('invalid email'),
    check('pass')
        .isLength({ min: 5 })
        .withMessage('min pass 5')

]
export const validatiorReq = (req, res, next) => {
    const errors = validationResult(req);
console.log(errors)
    if (errors.array().length > 0) {
        return res.status(500).json({ error: errors.array()[0].msg });
    }
    next()
}

