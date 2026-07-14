/**
 * PostHog client-side initialization. Next.js loads this file once,
 * before the app hydrates, in every Next.js app that ships it.
 *
 * `defaults: '2026-05-30'` opts into PostHog's May 2026 SDK defaults:
 * autocapture (clicks, form submits, tag inputs), history-change
 * pageviews (Next.js App Router route changes fire pageviews without
 * additional code), pageleave events, and session replay defaults.
 *
 * When the token is absent (local dev without the env var, forks that
 * don't run analytics), `posthog.init` is skipped — the app renders
 * identically, just without telemetry.
 */
import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (typeof window !== "undefined" && token !== undefined && token.length > 0) {
  posthog.init(token, {
    api_host: apiHost ?? "https://us.i.posthog.com",
    defaults: "2026-05-30",
    // Honor the browser's Do-Not-Track signal. If the user set it,
    // PostHog stays quiet — nothing is captured.
    respect_dnt: true,
  });
}
