import React from "react";
import SignUpForm from "@/app/components/SignUpForm";
import Link from "next/link";

const SignUp: React.FC = () => {
    return (
        <div className="container">
            <SignUpForm />
            <Link href="/auth/signin">
                Vous avez déjà un compte? Se connecter
            </Link>
        </div>
    );
};

export default SignUp;
