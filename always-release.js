module.exports = {
    analyzeCommits: async (pluginConfig, { commits }) => {
      return 'patch'; // Always return 'patch' to create a new version
    }
  };