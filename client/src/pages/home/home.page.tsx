import { AddClientModal, Clients, Projects } from '../../components';

export function HomePage(): JSX.Element {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
      </div>
      <Projects />
      <Clients />
    </>
  );
}
