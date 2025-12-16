"use client";

import { useState } from "react";
import { userSchema } from "@/schemas/user.schema";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const parsed = userSchema.safeParse({
      ...form,
      age: Number(form.age),
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach(err => {
        fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Clear form after success
    setForm({
      name: "",
      email: "",
      password: "",
      age: "",
    });

    setSuccess("Registration successful!");
  };

  return (
    <div className="register-container">
      <form
        className="register-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h2>Create Account</h2>

        {/* 🔒 Chrome autofill prevention trick */}
        <input type="text" name="fakeusernameremembered" style={{ display: "none" }} />
        <input type="password" name="fakepasswordremembered" style={{ display: "none" }} />

        <div className="form-group">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
          />
          <p className="error">{errors.name}</p>
        </div>

        <div className="form-group">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="new-email"
          />
          <p className="error">{errors.email}</p>
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <p className="error">{errors.password}</p>
        </div>

        <div className="form-group">
          <input
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            autoComplete="off"
          />
          <p className="error">{errors.age}</p>
        </div>

        <button type="submit">Register</button>
        <p className="success">{success}</p>
      </form>
    </div>
  );
}
