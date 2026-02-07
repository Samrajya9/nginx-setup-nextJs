import { findAllUsers } from "@/services/users.services";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  const users = await findAllUsers({
    page: parseInt(page),
    limit: parseInt(limit),
  });
  return NextResponse.json(users);
};
