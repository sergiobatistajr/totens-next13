"use client";

import { User } from "@prisma/client";
import NewUser from "./new-user-form";
interface RegisterFormProps {
  initialData: User | null;
}

const Register: React.FC<RegisterFormProps> = ({ initialData }) => {
  return initialData ? null : <NewUser />;
};

export default Register;
