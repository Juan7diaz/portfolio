import fs from 'fs';
import path from 'path';

const getAllFiles = (type: 'projects' | "blogs") => {

  if (type !== "projects" && type !== "blogs") {
    throw new Error("Type must be 'projects' or 'blogs'")
  }

  const root = path.join(process.cwd(), "src", "data", type)

  const files = fs.readdirSync(root);

  return files;
}

export default getAllFiles