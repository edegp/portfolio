import { useUser } from "@supabase/supabase-auth-helpers/react";
import Link from "./Link";

export default function ToggleButton() {
  const { user } = useUser();
  return (
    <>
      <div className="laptop:flex items-center mr-6 text-lg fixed top-[calc(4vw-5px)] right-h-w px-8 z-40 pb-8 mix-blend-difference hidden">
        {user ? (
          <Link
            href="/api/auth/logout"
            className="text-white capitalize mr-10 hover:cursor-pointer mix-blend-difference"
          >
            Sign out
          </Link>
        ) : (
          <Link
            href="/subscription/signin"
            className="text-white capitalize mr-10 hover:cursor-pointer mix-blend-difference"
          >
            Sign in
          </Link>
        )}
      </div>
    </>
  );
}
