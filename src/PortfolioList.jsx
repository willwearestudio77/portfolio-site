import {
    useQuery,
} from '@tanstack/react-query'

import './App.css'

const ENDPOINT = 'https://eu-west-2.cdn.hygraph.com/content/clog33cey6q1g01uk3rat0c7u/master'

const getAllProjects = `
  query Allprojects{
    projects{
      projectTitle
      description{
        text
      }
      projectImage {
        id
        url
      }
      id
      links
    }
  }
  `


function PortfolioList() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await fetch(ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "appllication/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    query: getAllProjects
                })
            })
            if (!res.ok) throw new Error("Failed to fetch")
            return await res.json()
        }
    })

    if (isLoading) return <p>Loading...</p>

    if (error) return <p>An error occured: {error.message}</p>
    console.log(data.data.projects)
    const projectsArray = data.data.projects
    console.log(projectsArray)



    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="rounded">
            {projectsArray.map(project => (
  <div key={project.id} className="w-full h-full flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
    <i className="devicon-javascript-plain colored" alt="JavaScript Icon"></i>
    <img src={project.projectImage.url} key={project.projectImage.id}/>
    <div>
      <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">{project.projectTitle}</h4>
      <p className="text-gray-800 dark:text-gray-100 text-sm">{project.description.text}</p>
    </div>
    <div>
      <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
        <p className="text-sm">{project.date}</p>
      </div>
    </div>
  </div>
))}

            </div>

        </div>

    )
}

export default PortfolioList