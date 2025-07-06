import SignUpForm from "@/components/auth/SignUpForm";

export default function RegisterPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Create an account</h1>
      <SignUpForm />
      <p className="mt-6 text-center text-gray-600">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-pink-600 hover:underline focus:underline"
        >
          Sign In
        </a>
      </p>
    </main>
  );
}
