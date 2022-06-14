import { useMutation } from '@apollo/client';
import { DetailedHTMLProps, FormEvent, useState } from 'react';
import { UPDATE_PROJECT } from '../../graphql/project/project.mutations';
import { GET_PROJECT } from '../../graphql/project/project.queries';
import { IProject } from '../../interfaces/IProject';

import { IStatus } from '../../interfaces/IStatus';

interface EditProjectFormProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  project: IProject;
}

export function EditProjectForm({
  project,
}: EditProjectFormProps): JSX.Element {
  const [name, setName] = useState<string>(project.name);
  const [description, setDescription] = useState<string>(project.description);
  const [status, setStatus] = useState<IStatus>('NOT_STARTED');

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name === '' || description === '') {
      return alert('Please fill out all fields');
    }

    updateProject();
  }

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as IStatus)}
          >
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETE">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
