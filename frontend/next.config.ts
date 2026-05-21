const getNextConfig = () => {
  const proxyClientMaxBodySizeValue = '4000mb';
  const baseConfig = {
    experimental: {
      proxyClientMaxBodySize: proxyClientMaxBodySizeValue,
    },
    turbopack: {
      root: __dirname,
    },
  };

  const lifecycle = process.env.npm_lifecycle_event;
  const explicitMode = process.env.NEXT_BUILD_MODE;

  // ------------------------------
  // Decide build mode
  // ------------------------------
  const buildMode =
    explicitMode ??
    (lifecycle === 'dev' ? 'dev' : 'server');

  // ------------------------------
  // DEV MODE
  // ------------------------------
  if (buildMode === 'dev') {
    return baseConfig;
  }

  // ------------------------------
  // SERVER MODE (imgproxy wrapper — Next.js serves API routes)
  // ------------------------------
  if (buildMode === 'server') {
    return {
      ...baseConfig,
      output: 'standalone',
      images: {
        unoptimized: true,
      },
    };
  }

  // ------------------------------
  // EXPORT MODE (build / CI / prod)
  // ------------------------------
  return {
    ...baseConfig,
    output: 'export',
    images: {
      unoptimized: true,
    },
  };
};

module.exports = getNextConfig();
