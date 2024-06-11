module.exports = {
    analyzeCommits: async (pluginConfig, { commits, lastRelease }) => {
      let releaseType = 'patch';
  
      commits.forEach(commit => {
        if (commit.type === 'feat') {
          releaseType = 'major';
        } else if (commit.type === 'fix' && releaseType !== 'major') {
          releaseType = 'minor';
        }
      });
  
      return releaseType;
    }
  };
  
  
// module.exports = {
//     analyzeCommits: async (pluginConfig, { commits, lastRelease }) => {
//       const releaseType = commits.some(commit => commit.type === 'feat') ? 'minor' :
//                           commits.some(commit => commit.type === 'fix' || commit.type === 'perf' || commit.type === 'chore') ? 'patch' :
//                           'patch';
  
//       return releaseType;
//     }
//   };
