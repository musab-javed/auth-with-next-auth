"use client";
import Link from "next/link";
import InputField from "../InputField";
import { FormEvent, useEffect, useState } from "react";
import Loader from "../Loader";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  async function onSubmit(event: FormEvent<HTMLButtonElement>){
    console.log('submit called')
    // event.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, "name":fullName, password }),
  })
  setLoading(false);
    if (res.status == 201) router.replace("/login");
  
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('getting')
    setFullName(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  useEffect(() => {}, [loading]);
  return (
    <div className="mx-auto flex w-1/2 items-center justify-center bg-white">
      <form className="bg-white">
        <h1 className="mb-1 text-2xl font-bold text-gray-800">Join us!</h1>
        <p className="mb-7 text-sm font-normal text-gray-600">
          Please register below
        </p>
        <InputField
          type="text"
          placeholder="Full Name"
          name="fullName"
          onChange={handleFullNameChange}
          value={fullName}
        />
        <InputField
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <InputField
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {loading ? (
          <div className="flex items-center justify-center mb-2">
            <Loader />
          </div>
        ) : (
        //   <Link href="/login">
            <button
              type="button"
              className="mb-2 mt-4 block w-full rounded-2xl bg-orange-400 py-2 font-semibold text-white"
              onClick={(e) => onSubmit(e)}
            >
              Register
            </button>
        //   </Link>
        )}

        <Link href="/login">
          <span className="ml-2 cursor-pointer text-sm text-orange-400 hover:text-orange-500">
            Already have an account
          </span>
        </Link>
      </form>
    </div>
  );
}
