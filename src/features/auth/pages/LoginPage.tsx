import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { storage } from "../../../shared/lib/storage";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type FormData = z.infer<typeof schema>;

export function LoginPage() {
  const navigate = useNavigate();
  const form = useForm<FormData>({
    resolver: zodResolver(schema), defaultValues: {
      email: "admin@demo.com",
      password: "admin123",
    }
  });

  async function onSubmit(values: FormData) {
    if (
      values.email === "admin@demo.com" &&
      values.password === "admin123"
    ) {
      storage.setToken("demo-token");
      navigate("/", { replace: true });
      return;
    }

    form.setError("root", { message: "Invalid email or password." });
  }


  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="w-full max-w-sm rounded-2xl border p-6 shadow-sm bg-white">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <p className="text-sm text-gray-500 mt-1">
          Use <b>admin@demo.com</b> / <b>admin123</b>.
        </p>

        <form className="mt-6 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm">Email</label>
            <input className="mt-1 w-full border rounded-lg p-2"
              {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input type="password" className="mt-1 w-full border rounded-lg p-2"
              {...form.register("password")} />
            {form.formState.errors.password && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.password.message}</p>
            )}
          </div>

          {form.formState.errors.root?.message && (
            <p className="text-sm text-red-600">{form.formState.errors.root.message}</p>
          )}

          <button className="w-full rounded-lg bg-black text-white py-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
