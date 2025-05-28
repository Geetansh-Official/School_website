import fs from 'fs';
import https from 'https';
import path from 'path';

const GITHUB_USER = "Geetansh-Official";
const REPO_NAME = "Photos";
const BRANCH_NAME = "main";
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO_NAME}/${BRANCH_NAME}/`;

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']);

// GitHub API URL for recursive file tree
const API_URL = `https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/git/trees/${BRANCH_NAME}?recursive=1`;

// GitHub requires a User-Agent header
const fetchFromGitHub = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          return reject(`GitHub API Error ${res.statusCode}: ${data}`);
        }
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(`Failed to parse JSON: ${err}`);
        }
      });
    }).on('error', (err) => reject(`Request error: ${err.message}`));
  });
};

const isImage = (filePath) => {
  return IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
};

const generateGalleryData = async () => {
  try {
    const data = await fetchFromGitHub(API_URL);
    const tree = data.tree;
    const galleryData = [];

    for (const item of tree) {
      if (item.type !== 'blob' || !isImage(item.path)) continue;

      const parts = item.path.split('/');
      if (parts.length < 2) continue;

      const category = parts[0];
      const encodedPath = parts.map(encodeURIComponent).join('/');
      const src = `${RAW_BASE}${encodedPath}`;

      galleryData.push({ category, src });
    }

    return galleryData;
  } catch (err) {
    console.error("❌ Error:", err);
    return [];
  }
};

const writeToTSX = (galleryData) => {
  const lines = ['export const galleryData = ['];

  galleryData.forEach(item => {
    lines.push('  {');
    lines.push(`    "category": "${item.category}",`);
    lines.push(`    "src": "${item.src}"`);
    lines.push('  },');
  });

  lines.push('];');

  fs.writeFileSync('src/galleryData.tsx', lines.join('\n'), 'utf8');
  console.log(`✅ galleryData.tsx written with ${galleryData.length} entries.`);
};

// Run
(async () => {
  const data = await generateGalleryData();
  writeToTSX(data);
})();
