import { useQuery } from '@apollo/client';

import { GET_PROJECTS } from '../../graphql/project/project.queries';
import { IProject } from '../../interfaces/IProject';
import { Spinner } from '..';
import { ProjectCard } from './ProjectCard';

interface ProjectsData {
  projects: IProject[];
}

export function Projects(): JSX.Element {
  const { loading, error, data } = useQuery<ProjectsData>(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong!</p>;

  return (
    <>
      {data?.projects.length ? (
        <ul className="row mt-4 list-unstyled">
          {data.projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </ul>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}
