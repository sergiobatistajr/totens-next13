"use client";

import { User } from "@prisma/client";
import NewUser from "./new-user-form";
import UserUpdate from "./update-user-form";
interface ClientFormFormProps {
  initialData: User | null;
}

const ClientForm: React.FC<ClientFormFormProps> = ({ initialData }) => {
  return initialData ? <UserUpdate initialData={initialData} /> : <NewUser />;
};

export default ClientForm;
