import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Email or password is missing");
          return null; // ✅ return null
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            console.error("Login failed:", await res.text());
            return null; // ✅ return null
          }

          const user = await res.json();

          if (user && user._id) {
            return {
              id: user._id, // ✅ make sure you use _id if backend returns that
              name: user.name,
              email: user.email,
            };
          }

          return null; // ✅ if user not found, return null
        } catch (error) {
          console.error("Authorize error:", error);
          return null; // ✅ always return null on error
        }
      },
    }),
  ],
};
