import { authRoutes } from "@/routes";
import LoginForm from "../../_components/login-form";

const LoginPage = () => {
  return (
    <section className="h-screen w-full">
      <div className="mt-20 flex h-full justify-center">
        <LoginForm signupUrl={authRoutes.register} />
      </div>
    </section>
  );
};

export default LoginPage;
