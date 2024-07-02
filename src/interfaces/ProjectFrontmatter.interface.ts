import { Project } from "./Project.interface"

export interface ProjectFrontmatter extends Project {
  level: number
  fileName: string
  type: string
}