import Navbar from "@/components/navbar";
import getUser from "@/actions/getCurrentUser";
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  return (
    <div>
      {user && <Navbar user={user} />}
      {children}
    </div>
  );
};

export default RootLayout;
