"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Save,
  Type,
  CheckSquare,
  Calendar,
  ChevronDown,
  AlignLeft,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function FormsPage() {
  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  const DRAFT_KEY = "unifiro_form_draft";

  const saveDraftToLocalStorage = (fields) => {
    const payload = {
      fields,
      lastSavedAt: new Date().toISOString(),
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    toast.success("Draft saved successfully");
  };

  const loadDraftFromLocalStorage = () => {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  };

  /* ---------------- Handlers ---------------- */
  const addField = (type) => {
    const newField = {
      id: crypto.randomUUID(),
      type,
      label: "Untitled Question",
      placeholder: "",
      required: false,
      validations: {},
      options:
        type === "select" || type === "checkbox" || type === "radio"
          ? ["Option 1"]
          : [],
    };

    setFields((prev) => [...prev, newField]);
  };

  const updateField = (id, updates) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, ...updates } : field)),
    );
  };

  useEffect(() => {
    const draft = loadDraftFromLocalStorage();
    if (draft?.fields?.length) {
      setFields(draft.fields);
    }
  }, []);

  /* ---------------- Render ---------------- */
  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* ---------- Top Bar ---------- */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Design Your Registration Form
          </h1>
          <p className="text-sm text-gray-500">
            Customize the questions for your attendees.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => saveDraftToLocalStorage(fields)}
            className="px-6 py-2.5 rounded-xl cursor-pointer border border-teal-200 text-teal-700 font-medium hover:bg-teal-50 flex items-center gap-2"
          >
            <Save size={18} />
            Save Draft
          </button>

          <Link href="/create-event/upload">
            <button className="px-6 py-2.5 cursor-pointer rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-white font-medium flex items-center gap-2">
              Next Step
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>

      {/* ---------- Main Builder ---------- */}
      <div className="flex-1 flex overflow-hidden">
        {/* ---------- Sidebar ---------- */}
        <div className="w-80 bg-white border-r border-gray-100 p-6 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
            Form Elements
          </h3>

          <div className="space-y-3">
            <SidebarItem
              icon={Type}
              label="Input Field"
              onClick={() => addField("text")}
            />
            <SidebarItem
              icon={AlignLeft}
              label="Text Area"
              onClick={() => addField("textarea")}
            />
            <SidebarItem
              icon={ChevronDown}
              label="Dropdown"
              onClick={() => addField("select")}
            />
            <SidebarItem
              icon={CheckSquare}
              label="Checkbox"
              onClick={() => addField("checkbox")}
            />
            <SidebarItem
              icon={Calendar}
              label="Date Picker"
              onClick={() => addField("date")}
            />
            <SidebarItem
              icon={Type}
              label="Radio Button"
              onClick={() => addField("radio")}
            />
          </div>
        </div>

        {/* ---------- Preview ---------- */}
        <div className="flex-1 bg-white p-8 overflow-y-auto flex justify-center">
          <div className="w-full">
            <div className="border-b pb-6 mb-6">
              <h2 className="text-3xl font-bold">Event Registration</h2>
              <p className="text-gray-500">
                Please fill out the details below to register.
              </p>
            </div>

            {fields.length === 0 && (
              <p className="text-center text-gray-400">
                Click an element from the left to start building the form
              </p>
            )}

            <div className="space-y-6">
              {fields.map((field) => (
                <div
                  key={field.id}
                  onClick={() => setSelectedFieldId(field.id)}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition ${
                    selectedFieldId === field.id
                      ? "border-teal-400 bg-teal-50"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <FormPreviewField
                    field={field}
                    updateField={updateField}
                    isSelected={selectedFieldId === field.id}
                    onRemove={() => {
                      setFields((prev) =>
                        prev.filter((f) => f.id !== field.id),
                      );
                      setSelectedFieldId(null);
                    }}
                    onDeselect={() => setSelectedFieldId(null)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function SidebarItem({ icon: Icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-4 rounded-xl bg-white border shadow-sm cursor-pointer hover:border-teal-300 hover:shadow-md transition"
    >
      <div className="p-2 rounded-lg bg-gray-50 text-gray-500">
        <Icon size={20} />
      </div>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
  );
}

function FormPreviewField({
  field,
  updateField,
  isSelected,
  onRemove,
  onDeselect,
}) {
  const hasOptions = ["select", "checkbox", "radio"].includes(field.type);

  return (
    <div className="space-y-3">
      {/* Editable Label */}
      {isSelected && (
        <div className="flex justify-end">
          <button
            on
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }}
            className="text-sm text-red-500 hover:text-red-600 cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
      {isSelected ? (
        <input
          value={field.label}
          onChange={(e) => updateField(field.id, { label: e.target.value })}
          onBlur={onDeselect}
          className="w-full text-sm font-medium bg-transparent border-b border-teal-400 focus:outline-none"
          autoFocus
        />
      ) : (
        <label className="text-sm font-medium text-gray-700">
          {field.label}
        </label>
      )}

      {/* Field Preview */}
      {field.type === "text" && (
        <input
          disabled
          className="w-full p-3 rounded-xl border bg-gray-50"
          placeholder={field.label}
        />
      )}

      {field.type === "textarea" && (
        <textarea
          disabled
          className="w-full p-3 rounded-xl border bg-gray-50"
          placeholder={field.label}
        />
      )}

      {field.type === "select" && (
        <select className="w-full p-3 rounded-xl border bg-gray-50">
          {field.options.map((opt, i) => (
            <option key={i}>{opt}</option>
          ))}
        </select>
      )}

      {field.type === "checkbox" &&
        field.options.map((opt, i) => (
          <label key={i} className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" disabled />
            {opt}
          </label>
        ))}

      {field.type === "radio" &&
        field.options.map((opt, i) => (
          <label key={i} className="flex items-center gap-2 text-gray-600">
            <input type="radio" disabled />
            {opt}
          </label>
        ))}

      {field.type === "date" && (
        <input
          type="date"
          disabled
          className="w-full p-3 rounded-xl border bg-gray-50"
        />
      )}

      {/* OPTIONS EDITOR */}
      {isSelected && hasOptions && (
        <div className="mt-4 p-3 rounded-lg bg-white border">
          <OptionsEditor field={field} updateField={updateField} />
        </div>
      )}
    </div>
  );
}

function OptionsEditor({ field, updateField }) {
  const updateOption = (index, value) => {
    const updated = [...field.options];
    updated[index] = value;
    updateField(field.id, { options: updated });
  };

  const addOption = () => {
    updateField(field.id, {
      options: [...field.options, "New option"],
    });
  };

  const removeOption = (index) => {
    updateField(field.id, {
      options: field.options.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-3">
      <label className="text-sm text-gray-600">Options</label>

      {field.options.map((opt, i) => (
        <div key={i} className="flex gap-2">
          <input
            className="flex-1 border p-2 rounded"
            value={opt}
            onChange={(e) => updateOption(i, e.target.value)}
          />
          <button onClick={() => removeOption(i)} className="text-red-500">
            ✕
          </button>
        </div>
      ))}

      <button onClick={addOption} className="text-sm text-teal-600">
        + Add option
      </button>
    </div>
  );
}
