import { AddClientModal, Clients, Projects } from '../../components';
import { AddProjectModal } from '../../components/AddProjectModal/AddProjectModal';

export function HomePage(): JSX.Element {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <Clients />
    </>
  );
}
