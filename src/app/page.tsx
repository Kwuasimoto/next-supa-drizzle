import { db, users } from "@/db";
import { isProd } from "@/lib/const";
import { eq } from "drizzle-orm";

export default async function Home() {
  const userId = 1;

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return (
    <div className="relative grid min-h-screen items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      {user ? (
        <div className="flex flex-col gap-2 justify-center">
          <h2>Congratulations! {isProd ? "prod" : "local"} is working</h2>
          {isProd ? (
            <p className="text-white/80">Have fun!</p>
          ) : (
            <p className="text-white/50">Time for production</p>
          )}

          <pre className="rounded bg-gray-900 p-4">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      ) : (
        <span className="rounded bg-gray-900 p-4">
          Error!~ Failed to find user by ID {userId} in your db
        </span>
      )}
    </div>
  );
}
