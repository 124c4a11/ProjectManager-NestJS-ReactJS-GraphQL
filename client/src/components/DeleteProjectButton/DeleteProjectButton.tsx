import { useMutation } from '@apollo/client';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { DELETE_PROJECT } from '../../graphql/project/project.mutations';
import { GET_PROJECTS } from '../../graphql/project/project.queries';

interface DeleteProjectButtonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  projectId: string;
}

export function DeleteProjectButton({
  projectId,
}: DeleteProjectButtonProps): JSX.Element {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  function removeProject() {
    deleteProject();
  }

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={removeProject}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
}
