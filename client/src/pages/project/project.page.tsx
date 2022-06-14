import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { ClientInfo, DeleteProjectButton, Spinner } from '../../components';
import { GET_PROJECT } from '../../graphql/project/project.queries';
import { IProject } from '../../interfaces/IProject';

interface ProjectData {
  project: IProject;
}

export function ProjectPage(): JSX.Element {
  const { id } = useParams();
  const { loading, error, data } = useQuery<ProjectData>(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong!</p>;

  const project: IProject | undefined = data?.project;

  return (
    <>
      {project && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>

          <h1>{project.name}</h1>
          <p>{project.description}</p>

          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{project.status}</p>

          <ClientInfo client={project.client} />

          <DeleteProjectButton projectId={id!} />
        </div>
      )}
    </>
  );
}
