import { NextRequest } from "next/server";
import { createServerClient } from "./supabase/serverClient";

export const getUserInServer = async (request: NextRequest) => {
  const supabase = createServerClient({ request });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
