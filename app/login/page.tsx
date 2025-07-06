import SignInForm from "@/components/auth/SignInForm";

export default function LoginPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      {/* Removed the <h1>Sign In</h1> */}
      <SignInForm />
      <p className="mt-6 text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="text-pink-600 hover:underline focus:underline"
        >
          Register
        </a>
      </p>
    </main>
  );
}
