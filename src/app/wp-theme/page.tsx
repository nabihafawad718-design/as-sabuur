import { redirect } from "next/navigation";

/**
 * The WordPress/static-site packager was removed.
 *
 * It generated a second, parallel copy of the site from a hard-coded template
 * that no longer matched this codebase: it repeated unverified claims
 * ("certified tutors", "35+ countries") and depended on five image files that
 * were blank placeholders. Serving it would have published an inconsistent and
 * misleading duplicate of the academy. Old links are redirected to the home
 * page so nothing 404s.
 */
export default function WpThemePage() {
  redirect("/");
}
