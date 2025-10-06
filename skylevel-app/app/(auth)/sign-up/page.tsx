import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-50 mb-2">
            Join Skylevel
          </h1>
          <p className="text-neutral-400">
            Create your account to start hiring smarter
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-neutral-900 border border-neutral-800 shadow-2xl",
              headerTitle: "text-neutral-50",
              headerSubtitle: "text-neutral-400",
              socialButtonsBlockButton: "border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-50",
              formButtonPrimary: "bg-skylevel-600 hover:bg-skylevel-700 text-neutral-50",
              footerActionLink: "text-skylevel-400 hover:text-skylevel-300",
              formFieldInput: "bg-neutral-800 border-neutral-700 text-neutral-50 focus:border-skylevel-500",
              formFieldLabel: "text-neutral-300",
              formFieldHintText: "text-neutral-500",
            }
          }}
          redirectUrl="/fit-queue"
        />
      </div>
    </div>
  );
}