import { useMutation, useQuery } from '@apollo/client';
import { useState, FormEvent } from 'react';
import { FaList } from 'react-icons/fa';

import { GET_CLIENTS } from '../../graphql/client/client.queries';
import { CREATE_PROJECT } from '../../graphql/project/project.mutations';
import { GET_PROJECTS } from '../../graphql/project/project.queries';
import { IClientsData } from '../../interfaces/IClientsData';
import { IProject, ProjectStatus } from '../../interfaces/IProject';

type Status = keyof typeof ProjectStatus;

export function AddProjectModal(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<Status>('NOT_STARTED');
  const [clientId, setClientId] = useState<string>('');

  const { loading, error, data } = useQuery<IClientsData>(GET_CLIENTS);

  const [createProject] = useMutation<any, Omit<IProject, 'id' | 'client'>>(
    CREATE_PROJECT,
    {
      variables: {
        name,
        description,
        status: status as ProjectStatus,
        clientId: Number(clientId),
      },

      update(cache, { data: { createProject } }) {
        const projects = cache.readQuery<{ projects: IProject[] }>({
          query: GET_PROJECTS,
        })!.projects;

        cache.writeQuery({
          query: GET_PROJECTS,
          data: { projects: [...projects, createProject] },
        });
      },
    },
  );

  if (loading) return <></>;
  if (error) return <p>Something Went Wrong!</p>;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name === '' || description === '' || clientId === '') {
      return alert('Please fill in all fields');
    }

    await createProject();

    setName('');
    setDescription('');
    setStatus('NOT_STARTED');
    setClientId('');
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModal"
      >
        <span className="d-flex align-items-center">
          <FaList className="icon" />
          <span>Add Project</span>
        </span>
      </button>

      <div
        className="modal fade"
        id="addProjectModal"
        tabIndex={-1}
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">
                Add Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    value={status}
                    className="form-select"
                    onChange={(e) => setStatus(e.target.value as Status)}
                  >
                    <option value="NOT_STARTED">Not Started</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETE">Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Client</label>
                  <select
                    className="form-select"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option value="">Select Client</option>
                    {data?.clients.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
