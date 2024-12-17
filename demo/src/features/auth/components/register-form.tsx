import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  useEffect(() => {
    if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address.");
    }
  }, [email]);

  useEffect(() => {
    if (
      password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    ) {
      setPasswordError("");
    } else {
      setPasswordError("Please enter a valid password.");
    }
  }, [password]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("Registering user with email:", email);
  }

  return (
    <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
      <FormContent
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        emailError={emailError}
        passwordError={passwordError}
      />

      <Button type="submit">Register</Button>
    </form>
  );
}

interface FormContentProps {
  email: string;
  password: string;
  emailError?: string;
  passwordError?: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

/**
 * FormContent component renders a registration form with email and password inputs.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.email - The email value.
 * @param {string} props.password - The password value.
 * @param {function} props.setEmail - The function to update the email value.
 * @param {function} props.setPassword - The function to update the password value.
 *
 * @returns {JSX.Element} The rendered form content.
 */
function FormContent({
  email,
  password,
  emailError,
  passwordError,
  setEmail,
  setPassword,
}: FormContentProps) {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-1">
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={`${emailError && emailError?.length > 0 ? "border-red-500" : ""}`}
        />
        {emailError && emailError?.length > 0 && (
          <p className="text-red-500 text-sm">{emailError}</p>
        )}
      </div>

      <div className="flex flex-col gap-y-1">
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {passwordError && passwordError?.length > 0 && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}
      </div>
    </div>
  );
}
