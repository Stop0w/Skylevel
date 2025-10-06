import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function CandidateProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // TODO: Fetch real candidate profile from database
  const mockProfile = {
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "Senior Frontend Engineer",
    location: "San Francisco, CA",
    skills: [
      { name: "React", proficiency: 9 },
      { name: "TypeScript", proficiency: 8 },
      { name: "Node.js", proficiency: 7 },
      { name: "GraphQL", proficiency: 6 },
    ],
    fitScore: 92,
    referrals: [
      { name: "John Doe", relationship: "Manager", trustScore: 95 },
      { name: "Jane Smith", relationship: "Colleague", trustScore: 88 },
      { name: "Mike Johnson", relationship: "Client", trustScore: 92 },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-50">Your Profile</h1>
          <p className="mt-2 text-neutral-400">
            Manage your candidate information and track your Fit Score
          </p>
        </div>
        <Link
          href="/sign-out"
          className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-50 rounded-md transition-colors"
        >
          Sign Out
        </Link>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="p-6 bg-neutral-900 rounded-lg border border-neutral-800">
            <h2 className="text-xl font-semibold text-neutral-50 mb-4">
              Basic Information
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-neutral-500">Name</label>
                <p className="text-neutral-50">{mockProfile.name}</p>
              </div>
              <div>
                <label className="text-sm text-neutral-500">Email</label>
                <p className="text-neutral-50">{mockProfile.email}</p>
              </div>
              <div>
                <label className="text-sm text-neutral-500">Role</label>
                <p className="text-neutral-50">{mockProfile.role}</p>
              </div>
              <div>
                <label className="text-sm text-neutral-500">Location</label>
                <p className="text-neutral-50">{mockProfile.location}</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="p-6 bg-neutral-900 rounded-lg border border-neutral-800">
            <h2 className="text-xl font-semibold text-neutral-50 mb-4">
              Skills & Expertise
            </h2>
            <div className="space-y-4">
              {mockProfile.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-50">{skill.name}</span>
                    <span className="text-neutral-400">{skill.proficiency}/10</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${skill.proficiency * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fit Score Card */}
        <div className="space-y-6">
          <div className="p-6 bg-neutral-900 rounded-lg border border-neutral-800">
            <h2 className="text-xl font-semibold text-neutral-50 mb-4">
              Your Fit Score
            </h2>
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-accent-400 bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                  <span className="text-4xl font-bold text-neutral-900">
                    {mockProfile.fitScore}
                  </span>
                </div>
                <span className="absolute -bottom-1 -right-1 px-3 py-1 text-sm bg-accent-400 text-neutral-900 rounded-full font-semibold">
                  Excellent
                </span>
              </div>
              <p className="text-sm text-neutral-500 mt-4 text-center">
                You're in the top 10% of candidates!
              </p>
            </div>
          </div>

          {/* Referrals */}
          <div className="p-6 bg-neutral-900 rounded-lg border border-neutral-800">
            <h2 className="text-xl font-semibold text-neutral-50 mb-4">
              Referrals ({mockProfile.referrals.length})
            </h2>
            <div className="space-y-3">
              {mockProfile.referrals.map((referral, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-50">{referral.name}</p>
                    <p className="text-sm text-neutral-500">{referral.relationship}</p>
                  </div>
                  <span className="text-sm font-medium text-accent-400">
                    {referral.trustScore}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}