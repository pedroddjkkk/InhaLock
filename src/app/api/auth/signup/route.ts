import { auth } from "@/auth/lucia";
import { isRedirectError } from "@/lib/utils";
import { createUserSchema } from "@/lib/validations/user";
import { Prisma } from "@prisma/client";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const email = formData.get("email");
  const confirmPassword = formData.get("confirmPassword");

  const validatedUserInput = createUserSchema.safeParse({
    username,
    password,
    email,
    confirmPassword,
  });

  if (!validatedUserInput.success) {
    return NextResponse.json(
      {
        field: validatedUserInput.error.issues[0].path[0],
        message: validatedUserInput.error.issues[0].message,
      },
      {
        status: 400,
      }
    );
  }

  try {
    const user = await auth.createUser({
      key: {
        providerId: "username",
        providerUserId: validatedUserInput.data.username.toLowerCase(),
        password: validatedUserInput.data.password,
      },
      attributes: {
        username: validatedUserInput.data.username,
        email: validatedUserInput.data.email,
      },
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);
    redirect("/");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      if (e.meta?.target === "PRIMARY") {
        return NextResponse.json(
          {
            message: "Nome de usuário já está em uso",
            field: "username",
          },
          {
            status: 400,
          }
        );
      } else if (e.meta?.target === "User_email_key") {
        return NextResponse.json(
          {
            message: "Email já está em uso",
            field: "email",
          },
          {
            status: 400,
          }
        );
      }
    }

    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
};
