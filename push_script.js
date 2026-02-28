// API to push git commits via REST
const GH_TOKEN = process.env.GH_TOKEN;

async function pushToGitHub() {
  const owner = 'FilippTrigub';
  const repo = 'openclaw-marketing';
  const branch = 'main';
  
  // Read files
  const fs = require('fs');
  const path = require('path');
  const workspace = '/tmp/openclaw-marketing';
  
  // Get all files
  function getFiles(dir, base = '') {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(base, entry.name);
      if (entry.isDirectory()) {
        files.push(...getFiles(fullPath, relativePath));
      } else {
        const content = fs.readFileSync(fullPath, 'utf-8');
        files.push({ path: relativePath, content });
      }
    }
    return files;
  }
  
  const files = getFiles(workspace);
  
  // Create tree
  const treeResponse = await fetch('https://api.github.com/repos/' + owner + '/' + repo + '/git/trees', {
    method: 'POST',
    headers: {
      'Authorization': 'token ' + GH_TOKEN,
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify({
      base_tree: null,
      tree: files.map(f => ({
        path: f.path,
        mode: '100644',
        type: 'blob',
        content: f.content
      }))
    })
  });
  
  console.log('Tree response status:', treeResponse.status);
  const treeText = await treeResponse.text();
  console.log('Tree response:', treeText);
  const treeData = JSON.parse(treeText);
  console.log('Tree created:', treeData.sha);
  
  // Create commit
  const commitResponse = await fetch('https://api.github.com/repos/' + owner + '/' + repo + '/git/commits', {
    method: 'POST',
    headers: {
      'Authorization': 'token ' + GH_TOKEN,
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify({
      message: 'Initial commit: AI Marketing Agency CLI',
      tree: treeData.tree.sha,
      author: {
        name: 'Paloma',
        email: 'paloma@openclaw.dev'
      }
    })
  });
  
  const commitData = await commitResponse.json();
  console.log('Commit created:', commitData.sha);
  
  // Update branch
  const refResponse = await fetch('https://api.github.com/repos/' + owner + '/' + repo + '/git/refs/heads/' + branch, {
    method: 'PATCH',
    headers: {
      'Authorization': 'token ' + GH_TOKEN,
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify({
      sha: commitData.sha,
      force: true
    })
  });
  
  const refData = await refResponse.json();
  console.log('Branch updated:', refData);
}

pushToGitHub().catch(console.error);
