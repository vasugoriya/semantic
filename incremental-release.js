module.exports = {
    analyzeCommits: async (pluginConfig, { commits, nextRelease }) => {
      const { version } = nextRelease;
      const [major, minor, patch] = version.split('.');
  
      if (nextRelease.type === 'minor') {
        return `${major}.${parseInt(minor) + 1}.0`;
      } else if (nextRelease.type === 'major') {
        return `${parseInt(major) + 1}.0.0`;
      } else {
        return `${major}.${minor}.${parseInt(patch) + 1}`;
      }
    }
  };
  