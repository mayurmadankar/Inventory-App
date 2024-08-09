import { body, validationResult } from 'express-validator';

export const validateRequest  = async (req, res, next) => {
  // console.log(req.body);
  // 1. Enter the validation rules
  const rules = [
    body('name').notEmpty().withMessage("Name is required"),
    body('price').isFloat({ gt: 0 }).withMessage('Price should be a positive value'),
    body('imageUrl').custom((value,{req})=>{
      if(!req.file){
        throw new Error('Image is Requires');
      }else{
        return true;
      }
    }),
  ];

  // 2. Run those promises
  await Promise.all(rules.map(rule => rule.run(req)));

  // 3. Check if there are any errors after running the rules
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).render('new-product', { validationErrors: validationErrors.array(), success: false });
  }

  next();
}
export const validateLogin = async (req, res, next) => {
  // Define validation rules
  const rules = [
      body('email').isEmail().withMessage("Invalid email address"),
      body('password').notEmpty().withMessage("Password is required")
  ];

  // Run validation rules
  await Promise.all(rules.map(rule => rule.run(req)));

  // Check for validation errors
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
      return res.status(400).render('login', { validationErrors: validationErrors.array(), success: false });
  }

  next();
};
// export default { validateRequest, validateLogin };