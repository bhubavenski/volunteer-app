import { auth } from "@/lib/auth";
import Settings from "./components/Settings";

export default async function ProfileManager() {
  const session = await auth();
  if(!session) {
    return <>No session</>
  }
  return (
    <main className="mt-8 max-w-[1000px] m-auto">
      <div className="mt-8 space-y-4">
        <Settings role={session.user.role} />
      </div>
    </main>
  );
}
