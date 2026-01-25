import * as yup from "yup";

export const buildYupSchema = (fields) => {
  const shape = {};

  fields.forEach((field) => {
    let rule;

    switch (field.type) {
      case "text":
      case "textarea":
        rule = yup.string();
        break;

      case "email":
        rule = yup
          .string()
          .email("Invalid email address");
        break;

      case "mobile":
        rule = yup
          .string()
          .matches(/^[6-9]\d{9}$/, "Invalid mobile number");
        break;

      case "age":
        rule = yup
          .number()
          .typeError("Age must be a number")
          .min(1, "Too young")
          .max(120, "Invalid age");
        break;

      case "select":
      case "radio":
        rule = yup.string();
        break;

      case "checkbox":
        rule = yup
          .array()
          .of(yup.string())
          .min(1, "Select at least one option");
        break;

      case "date":
        rule = yup
          .date()
          .typeError("Invalid date");
        break;

      default:
        rule = yup.mixed();
    }

    if (field.required) {
      rule = rule.required("This field is required");
    }

    shape[field.id] = rule;
  });

  return yup.object().shape(shape);
};