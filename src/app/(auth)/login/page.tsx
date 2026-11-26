
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main
      className="
        mx-auto
        flex
        min-h-[88vh]
        max-w-5xl
        items-center
        px-4
        py-8
        md:px-8
      "
    >
      <LoginForm />
    </main>
  );
}