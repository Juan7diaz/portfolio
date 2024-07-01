
function ProjectPage({ params }: { params: { project: string }}) {
  return <div>
        <h1>Project</h1>
        <p>Unique name: {params.project}</p>
    </div>
}

export default ProjectPage