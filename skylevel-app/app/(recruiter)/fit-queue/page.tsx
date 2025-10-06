import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserMenu } from "@/app/components/auth/UserMenu";

export default async function FitQueuePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // TODO: Fetch real candidates from database
  const mockCandidates = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Senior Frontend Engineer",
      location: "San Francisco, CA",
      fitScore: 92,
      status: "new",
      skills: ["React", "TypeScript", "Node.js"],
      referralCount: 3,
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      role: "Product Manager",
      location: "New York, NY",
      fitScore: 87,
      status: "reviewing",
      skills: ["Strategy", "Analytics", "Leadership"],
      referralCount: 2,
    },
    {
      id: "3",
      name: "Emily Johnson",
      role: "UX Designer",
      location: "Seattle, WA",
      fitScore: 78,
      status: "new",
      skills: ["Figma", "User Research", "Prototyping"],
      referralCount: 1,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-50">Fit Queue</h1>
          <p className="mt-2 text-neutral-400">
            Review candidates ranked by their Fit Score
          </p>
        </div>
        <UserMenu />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-neutral-900 rounded-lg border border-neutral-800">
        <select className="px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-50 rounded-md focus:outline-none focus:border-skylevel-500">
          <option>All Jobs</option>
          <option>Senior Frontend Engineer</option>
          <option>Product Manager</option>
          <option>UX Designer</option>
        </select>
        <select className="px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-50 rounded-md focus:outline-none focus:border-skylevel-500">
          <option>All Scores</option>
          <option>90+ (Excellent)</option>
          <option>80-89 (Great)</option>
          <option>70-79 (Good)</option>
        </select>
        <select className="px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-50 rounded-md focus:outline-none focus:border-skylevel-500">
          <option>All Status</option>
          <option>New</option>
          <option>Reviewing</option>
          <option>Shortlisted</option>
        </select>
      </div>

      {/* Candidate List */}
      <div className="space-y-4">
        {mockCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="p-6 bg-neutral-900 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-neutral-50">
                    {candidate.name}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      candidate.status === "new"
                        ? "bg-blue-600 text-white"
                        : "bg-yellow-600 text-white"
                    }`}
                  >
                    {candidate.status}
                  </span>
                </div>
                <p className="text-neutral-400 mb-1">{candidate.role}</p>
                <p className="text-sm text-neutral-500 mb-3">{candidate.location}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs bg-neutral-800 text-neutral-300 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-neutral-500">
                  {candidate.referralCount} referral{candidate.referralCount !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex flex-col items-center ml-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-coral-400 bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-neutral-900">
                      {candidate.fitScore}
                    </span>
                  </div>
                  <span className="absolute -bottom-1 -right-1 px-2 py-1 text-xs bg-coral-400 text-neutral-900 rounded-full font-semibold">
                    {candidate.fitScore >= 90 ? "Excellent" : candidate.fitScore >= 80 ? "Great" : "Good"}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-2">Fit Score</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mockCandidates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500">No candidates found</p>
        </div>
      )}
    </div>
  );
}