
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
  },

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  },

  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
})

// import { z } from "zod";

// const envSchema = z.object({
//   NEXT_PUBLIC_API_BASE_URL: z.string().url(),
//   APP_URL: z.string().url(),
// });

// const parseEnv = envSchema.safeParse(process.env);

// if (!parseEnv.success) {
//   console.error(
//     "Invalid environment variables",
//     parseEnv.error.flatten().fieldErrors,
//   );

//   throw new Error("Invalid environment variables");
// }

// export const env = parseEnv.data;
