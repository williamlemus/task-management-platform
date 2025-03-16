import TaskContainer from "./components/TaskContainer";
import { trpc } from "./trpc";

// only do this for server side component
export default async function Home() {
  const user = await trpc.getUser.query({});
  return (
    <div className="container mx-auto">
      <TaskContainer userId={user?.id || null} />
    </div>
  );
}
