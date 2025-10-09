import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    const accessToken = req.cookies.get("accessToken")?.value; // get token value
    const protectedPaths = ["/Dashboard"];
    const isProtected = protectedPaths.some((path) =>
        req.nextUrl.pathname.startsWith(path)
    );

    if (isProtected && !accessToken) {
        const loginUrl = new URL("/Login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/Dashboard"]
};
    