import { DetailedHTMLProps, LiHTMLAttributes } from 'react';
import { IProject } from '../../interfaces/IProject';

interface ProjectCardProps
  extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  project: IProject;
}

export function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  return (
    <li className="col-md-6">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{project.name}</h5>

            <a className="btn btn-light" href={`/projects/${project.id}`}>
              View
            </a>
          </div>
          <p className="small">
            Status: <strong>{project.status}</strong>
          </p>
        </div>
      </div>
    </li>
  );
}
