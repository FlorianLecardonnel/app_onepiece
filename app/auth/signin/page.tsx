import React from "react";
import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";

const SignIn: React.FC = () => {
    return (
        <div className="container">
            <SignInForm />
            <Link href="/auth/signup">
                Vous n&apos;avez pas de compte ? S&apos;inscrire
            </Link>
        </div>
    );
};
export default SignIn;
