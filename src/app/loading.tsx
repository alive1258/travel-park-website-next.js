/** Outermost fallback, above both the public and dashboard layout groups.
 * Rarely shown in practice — each layout group defines its own more
 * specific loading.tsx that takes over first — so this stays a minimal,
 * brand-neutral spinner rather than a skeleton tied to either audience. */
const Loading = () => (
  <div className="flex min-h-screen items-center justify-center bg-white">
    <div
      className="h-10 w-10 animate-spin rounded-full border-2 border-brand-900/10 border-t-brand-600"
      role="status"
      aria-label="Loading"
    />
  </div>
);

export default Loading;
