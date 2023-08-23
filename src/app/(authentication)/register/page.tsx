"use client"
import GradientSection from "../GradientSection";
import RegisterForm from "./RegisterForm";

export default function RegisterPage(){
    return(
        <div className="flex bg-white min-h-screen">
            <GradientSection/>
            <RegisterForm/>
        </div>
    )
}