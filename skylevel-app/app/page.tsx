import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    // TODO: Check user role and redirect accordingly
    // For now, redirect all authenticated users to fit-queue
    redirect("/fit-queue");
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8B1538] to-[#D4AF37] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-50 sm:text-6xl">
              Hire Faster with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                AI-Powered Fit Scores
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-400">
              Transform 200+ resumes into 5 high-confidence candidates through validated Fit Scores
              and peer referrals. Make hiring decisions 70% faster.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/sign-in"
                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-neutral-50 shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/sign-up"
                className="text-sm font-semibold leading-6 text-neutral-300 hover:text-neutral-50 transition-colors"
              >
                Sign up <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#8B1538] to-[#D4AF37] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-accent-400">How it works</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl">
              The Skylevel Advantage
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-50">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary-600">
                    <span className="text-neutral-50 font-bold">1</span>
                  </div>
                  Candidates Apply
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-400">
                  <p className="flex-auto">
                    Candidates submit their profiles and get an initial Fit Score based on skills alignment.
                  </p>
                  <p className="mt-6">
                    <a href="#" className="text-sm font-semibold leading-6 text-primary-400 hover:text-primary-300">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-50">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary-600">
                    <span className="text-neutral-50 font-bold">2</span>
                  </div>
                  Peer Validation
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-400">
                  <p className="flex-auto">
                    Candidates share referral links for peers to validate their skills and boost their score.
                  </p>
                  <p className="mt-6">
                    <a href="#" className="text-sm font-semibold leading-6 text-primary-400 hover:text-primary-300">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-50">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary-600">
                    <span className="text-neutral-50 font-bold">3</span>
                  </div>
                  Hire Confidently
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-400">
                  <p className="flex-auto">
                    Recruiters review a ranked list of 5 top candidates with validated Fit Scores.
                  </p>
                  <p className="mt-6">
                    <a href="#" className="text-sm font-semibold leading-6 text-primary-400 hover:text-primary-300">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
