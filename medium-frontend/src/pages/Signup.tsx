import Quote from "../components/Quote";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  return (
    <div className="h-screen flex w-full">
      <div className="w-1/2">
        <SignupForm />
      </div>
      <Quote />
    </div>
  );
}
