import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// leet https://www.hamedbahram.io/notes/using-mdx-with-nextjs

// obtiene el frontmatter de un archivo .mdx en la carpeta src/data/projects o src/data/blogs
// slug: nombre del archivo .mdx
const getFrontmatter = (slug: string, type: 'projects' | "blogs") => {

  if (type !== "projects" && type !== "blogs") throw new Error("Type must be 'projects' or 'blogs'")

  const root = path.join(process.cwd(), "src", "data", type)

  const realSlug = slug.replace(/\.mdx$/, '')
  const filePath = path.join(root, `${realSlug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContent)

  return data
}

export default getFrontmatter