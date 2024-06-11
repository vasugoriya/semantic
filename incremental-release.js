module.exports = {
    analyzeCommits: async (pluginConfig, { commits, lastRelease }) => {
      const releaseType = commits.some(commit => commit.type === 'feat') ? 'minor' :
                          commits.some(commit => commit.type === 'fix' || commit.type === 'perf' || commit.type === 'chore') ? 'patch' :
                          'patch';
  
      return releaseType;
    }
  };

// module.exports = {
//     analyzeCommits: async (pluginConfig, { commits, lastRelease }) => {
//       if (!lastRelease) {
//         // If there is no previous release, start with version 1.0.0
//         return '1.0.0';
//       }
  
//       const { version } = lastRelease;
//       const [major, minor, patch] = version.split('.');
  
//       // Increment the version based on the commit messages
//       const releaseType = commits.some(commit => commit.type === 'feat') ? 'minor' :
//                           commits.some(commit => commit.type === 'fix' || commit.type === 'perf' || commit.type === 'chore') ? 'patch' :
//                           'patch';
  
//       if (releaseType === 'minor') {
//         return `${major}.${parseInt(minor) + 1}.0`;
//       } else if (releaseType === 'major') {
//         return `${parseInt(major) + 1}.0.0`;
//       } else {
//         return `${major}.${minor}.${parseInt(patch) + 1}`;
//       }
//     }
//   };
  