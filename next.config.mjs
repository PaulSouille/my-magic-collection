import fs from 'fs';
import path from 'path';

const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

const nextConfig = {
    env: {
        NEXT_PUBLIC_VERSION: version,
    },
};

export default nextConfig;