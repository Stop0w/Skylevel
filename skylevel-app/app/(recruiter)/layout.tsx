import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RecruiterLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // TODO: Check if user has recruiter role
  // For now, we'll just ensure they're authenticated
  // Later, we'll fetch user role from database

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-neutral-50">Skylevel</h1>
              <span className="ml-3 px-2 py-1 text-xs bg-primary-600 text-neutral-50 rounded-full">
                Recruiter
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Navigation will be added here */}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}