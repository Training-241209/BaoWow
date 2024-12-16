import { useState } from "react";
import { Input } from "../../../components/shared/input";
import { Button } from "../../../components/shared/button";

export function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="border p-10 rounded-lg flex flex-col gap-y-5 w-[400px]">
      <FormHeader />
      <FormContent
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
}

/**
 * FormHeader component renders the header section of the registration form.
 * It includes a title and a brief instruction for the user.
 *
 * @returns {JSX.Element} The JSX code for the form header.
 */
function FormHeader() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Register</h1>
      <p>Enter your information</p>
    </div>
  );
}

interface FormContentProps {
  email: string;
  password: string;
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
  setEmail,
  setPassword,
}: FormContentProps) {
  return (
    <div className="flex flex-col gap-y-5">
      <Input value={email} setValue={setEmail} placeholder="Email" />
      <Input
        value={password}
        setValue={setPassword}
        placeholder="Password"
        type="password"
      />

      <Button>Register</Button>
    </div>
  );
}
