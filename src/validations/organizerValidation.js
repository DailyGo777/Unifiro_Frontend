// validations/organizerSchema.js
import * as yup from "yup";

export const step1Schema = yup.object({
  organizerName: yup.string().required("Organizer name is required"),
  organizerType: yup.string().required("Organizer type is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
      "Password must be 6-10 chars with uppercase, lowercase, number & special character"
    ),
});

export const step2Schema = yup.object({
  about: yup.string().min(20).required("About organization is required"),
  location: yup.string().required("Location is required"),
  idProof: yup.string().required("ID proof is required"),
});

export const step3Schema = yup.object({
  bankAccount: yup
    .string()
    .matches(/^\d{9,18}$/, "Invalid account number")
    .required(),
  ifsc: yup
    .string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
    .required(),
  terms: yup.boolean().oneOf([true], "Accept terms to continue"),
});

export const organizerLoginSchema = yup.object({
  identifier: yup.string().required("Email or phone required"),
  password: yup.string().required("Password required"),
  rememberMe: yup.boolean(),
});