import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Person from "@/models/Person";

export async function PUT(req: Request, context: any) {
  try {
    await connectDB();

    const { id } = await context.params; // ← FIX HERE
    const { name } = await req.json();

    const updated = await Person.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    await connectDB();

    const { id } = await context.params; // ← FIX HERE

    await Person.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
