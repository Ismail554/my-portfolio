// Cloudflare Worker Entrypoint for my-portfolio
export default {
  async fetch(request, env) {
    // Serve static assets from the build directory with single-page-application routing
    return env.ASSETS.fetch(request);
  }
};
