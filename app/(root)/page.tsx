import Login from "@/components/login";
import getUser from "@/actions/getCurrentUser";
export default async function Home() {
  const user = await getUser();
  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <h1>Bem vindo! {user?.name}</h1>
    </div>
  );
}
