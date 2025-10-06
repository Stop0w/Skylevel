import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getAuthenticatedUser() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return { userId };
}

export async function requireRecruiterRole() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // TODO: Fetch user role from database
  // For now, we'll assume all authenticated users are recruiters
  // Later implementation:
  // const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  // if (!user || user.role !== 'RECRUITER') {
  //   redirect('/unauthorized');
  // }

  return { userId };
}

export async function requireCandidateRole() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // TODO: Fetch user role from database
  // const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  // if (!user || user.role !== 'CANDIDATE') {
  //   redirect('/unauthorized');
  // }

  return { userId };
}

export type UserRole = 'RECRUITER' | 'HIRING_MANAGER' | 'ADMIN' | 'CANDIDATE';

export async function getUserRole(): Promise<UserRole | null> {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // TODO: Fetch from database
  // For now, default to RECRUITER for demo
  return 'RECRUITER';
}