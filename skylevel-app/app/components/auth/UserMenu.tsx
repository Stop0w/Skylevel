"use client";

import { UserButton } from "@clerk/nextjs";

export function UserMenu() {
  return (
    <UserButton
      appearance={{
        elements: {
          userButtonBox: "h-10 w-10",
          userButtonAvatarBox: "w-10 h-10",
          userButtonPopoverCard: "bg-neutral-900 border border-neutral-800 shadow-2xl",
          userButtonPopoverActionButton: "text-neutral-300 hover:bg-neutral-800 hover:text-neutral-50",
          userButtonPopoverActionButtonText: "text-neutral-300",
          userButtonPopoverActionButtonIcon: "text-neutral-400",
        },
      }}
      userProfileProps={{
        appearance: {
          elements: {
            rootBox: "bg-neutral-900",
            card: "bg-neutral-900 border border-neutral-800",
            navbar: "bg-neutral-900 border-b border-neutral-800",
            navbarTitle: "text-neutral-50",
            profileSection: "text-neutral-50",
            profileSectionTitle: "text-neutral-300",
            profileSectionPrimaryButton: "bg-skylevel-600 hover:bg-skylevel-700 text-neutral-50",
            formFieldInput: "bg-neutral-800 border-neutral-700 text-neutral-50 focus:border-skylevel-500",
            formFieldLabel: "text-neutral-300",
          },
        },
      }}
    />
  );
}