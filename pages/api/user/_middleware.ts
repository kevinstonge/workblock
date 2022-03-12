import type { NextApiRequestExtended } from "../../../utils/types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import validator from "validator";

export function middleware(req: NextApiRequestExtended) {
  try {
    if (req.headers) {
      const authHeader: string = req.headers.get("authorization") || "";
      const token: string = authHeader.split(" ")[1];
      const decodedToken: JwtPayload | null = jwt.decode(token, {
        complete: true,
      });
      const email: string = decodedToken?.payload?.email || "";
      const response = NextResponse.next();
      if (validator.isEmail(email)) {
        response.headers.set("email", email);
        return response;
      } else {
        return new Response(JSON.stringify({ message: "unauthorized" }), {
          status: 401,
        });
      }
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "an error ocurred during authentication" })
    );
  }
}
