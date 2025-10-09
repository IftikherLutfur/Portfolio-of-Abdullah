import { getServerSession } from "next-auth";
import { authOptions } from "./authoption";

export default async function getUserSession() {
  await getServerSession(authOptions)
}
