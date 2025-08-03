import Quote from "../components/Quote";
import SigninForm from "../components/SigninForm";

export default function Signin() {
  return (
    <div className="h-screen flex w-full">
      <div className="w-1/2">
        <SigninForm />
      </div>
      <Quote />
    </div>
  );
}
