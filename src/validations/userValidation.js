import * as yup from "yup";

export const userSignupSchema = yup.object({
  fullName: yup.string().min(3).required("Full name is required"),
  email: yup.string().email().required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
    .required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
      "Password must be 6-10 chars with uppercase, lowercase, number & special character"
    )
    .required(),
  terms: yup.boolean().oneOf([true], "Accept terms to continue"),
});

export const userLoginSchema = yup.object({
  identifier: yup.string().required("Email or phone required"),
  password: yup.string().required("Password required"),
  rememberMe: yup.boolean(),
});