import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Person from "@/models/Person";

export async function GET() {
  await connectDB();
  const people = await Person.find();
  return NextResponse.json(people);
}

export async function POST(req: Request) {
  await connectDB();
  const { name } = await req.json();
  const person = await Person.create({ name });
  return NextResponse.json(person);
}
