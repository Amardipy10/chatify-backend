import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";

// decide mode based on environment
const MODE = ENV.NODE_ENV === "production" ? "DRY_RUN" : "DRY_RUN";
// 👆 prod me pehle DRY_RUN rakho, baad me LIVE karna

const aj = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    /* =========================
       SHIELD – basic protection
    ========================= */
    shield({ mode: MODE }),

    /* =========================
       BOT DETECTION
       (DRY_RUN in prod initially)
    ========================= */
    detectBot({
      mode: MODE,
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:PREVIEW",   // Discord, Slack previews
        "CATEGORY:MONITOR",   // Uptime bots (Render, Vercel)
      ],
    }),

    /* =========================
       RATE LIMIT
       Soft limit first
    ========================= */
    slidingWindow({
      mode: MODE,
      max: 200,     // safer for auth routes
      interval: 60,
    }),
  ],
});

export default aj;