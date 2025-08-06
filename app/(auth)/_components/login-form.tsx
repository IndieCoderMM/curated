import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  heading?: string;
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const LoginForm = ({
  heading = "Login",
  buttonText = "Login",
  signupText = "Need an account?",
  signupUrl = "/register",
}: LoginFormProps) => {
  return (
    <div className="flex flex-col items-center gap-6 lg:justify-start">
      <Logo />
      <div className="min-w-sm flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md">
        {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
        <Input type="email" placeholder="Email" className="text-sm" required />
        <Input
          type="password"
          placeholder="Password"
          className="text-sm"
          required
        />
        <Button type="submit" className="w-full">
          {buttonText}
        </Button>
      </div>
      <div className="flex justify-center gap-1 text-sm text-muted-foreground">
        <p>{signupText}</p>
        <a
          href={signupUrl}
          className="font-medium text-primary hover:underline"
        >
          Sign up
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
