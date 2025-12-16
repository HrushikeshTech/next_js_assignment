import { NextResponse } from "next/server";
import { userSchema } from "@/schemas/user.schema";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = userSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.issues },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "User validated successfully", data: parsed.data },
    { status: 200 }
  );
}
