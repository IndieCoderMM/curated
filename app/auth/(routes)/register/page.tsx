import { authRoutes } from "@/routes";
import RegisterForm from "../../_components/register-form";

const RegisterPage = () => {
  return (
    <section className="h-screen w-full">
      <div className="mt-20 flex h-full justify-center">
        <RegisterForm signInUrl={authRoutes.login} />
      </div>
    </section>
  );
};

export default RegisterPage;
