"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { buildYupSchema } from "./buildYupSchema";

export default function DynamicRegistrationForm({ fields }) {
  const schema = buildYupSchema(fields);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Validated Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field) => (
        <div key={field.id} className="space-y-1">
          <label className="font-medium">{field.label}</label>

          {/* TEXT */}
          {field.type === "text" && (
            <input
              {...register(field.id)}
              className="w-full border p-2 rounded"
            />
          )}

          {/* TEXTAREA */}
          {field.type === "textarea" && (
            <textarea
              {...register(field.id)}
              className="w-full border p-2 rounded"
            />
          )}

          {/* SELECT */}
          {field.type === "select" && (
            <select {...register(field.id)} className="w-full border p-2 rounded">
              <option value="">Select</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {/* CHECKBOX */}
          {field.type === "checkbox" &&
            field.options.map((opt) => (
              <label key={opt} className="flex gap-2">
                <input
                  type="checkbox"
                  value={opt}
                  {...register(field.id)}
                />
                {opt}
              </label>
            ))}

          {/* RADIO */}
          {field.type === "radio" &&
            field.options.map((opt) => (
              <label key={opt} className="flex gap-2">
                <input
                  type="radio"
                  value={opt}
                  {...register(field.id)}
                />
                {opt}
              </label>
            ))}

          {/* DATE */}
          {field.type === "date" && (
            <input
              type="date"
              {...register(field.id)}
              className="w-full border p-2 rounded"
            />
          )}

          {/* ERROR */}
          {errors[field.id] && (
            <p className="text-red-500 text-sm">
              {errors[field.id].message}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="px-6 py-2 bg-teal-500 text-white rounded"
      >
        Register
      </button>
    </form>
  );
}