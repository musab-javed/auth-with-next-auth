"use client";

import { redirect, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
export default function HomePage() {
    const {data: session, status} = useSession();
    console.log(session);
  const router = useRouter();
  async function onSubmit() {
    console.log("logout submit called");
    // event.preventDefault();
    signOut({
        redirect:true,
        callbackUrl:"/login"
    });
    
  }
  if(!session) {
    redirect("/login")
  }
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-tr from-[#F86CA7] to-[#F4D444] text-white">
      <h1 className="text-4xl ">HomePage visited</h1>
      {session ? <h1 className="text-2xl mt-10 ">{`Hi, ${session.user?.email}`}</h1> : <></>}

      <button
        className="mb-2 mt-4 block  p-8 rounded-2xl bg-orange-500 py-2 font-semibold text-white "
        onClick={() => onSubmit()}
      >
        Logout
      </button>
    </div>
  );
}
