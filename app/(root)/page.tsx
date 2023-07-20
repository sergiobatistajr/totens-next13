import Login from "@/components/login";
import getUser from "@/actions/getCurrentUser";
export default async function Home() {
  const user = await getUser();
  if (!user) {
    return <Login />;
  }

  return <div>bem vindo {user?.name}</div>;
}
