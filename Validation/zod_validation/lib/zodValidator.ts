import { ZodSchema } from "zod";
import { NextResponse } from "next/server";

export async function zodValidator(
  req: Request,
  schema: ZodSchema
) {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map(err => ({
        field: err.path[0],
        message: err.message,
      }));

      return {
        success: false,
        response: NextResponse.json(
          { errors },
          { status: 400 }
        ),
      };
    }

    return { success: true, data: result.data };
  } catch {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      ),
    };
  }
}
