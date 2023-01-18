import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex page justify-center ">
        <div className="w-full max-w-md space-y-8 mt-20">
          <div>
            <p className="text-center text-accent font-bold uppercase">
              Crypto Market
            </p>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
              Sign in to your account
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=" block w-full  rounded-md  my-4 text-input bg-secondary"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className=" block w-full  rounded-md  my-4 text-input bg-secondary"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-xl  p-2 bg-button text-btnText "
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-btnText group-hover:text-btnText"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
            <div className="flex items-center justify-end">
              <div className="text-sm">
                Don't have an account?
                <Link to={"/signup"} className="font-medium text-accent ml-2">
                  Sign up
                </Link>
              </div>
            </div>
          </form>

          <div className="bg-secondary p-4 shadow-xl flex  flex-col gap-2 border-2 rounded-xl border-accent">
            <h2 className="text-xl font-bold underline">Demo account </h2>
            <p className="text-sm flex justify-between"> <span className="text-secondary font-bold">Email:</span> demo@coinzy.com</p>
            <p className="text-sm flex justify-between"><span className="text-secondary font-bold">Password:</span> secret</p>
          </div>
        </div>
      </div>
    </>
  );
}
