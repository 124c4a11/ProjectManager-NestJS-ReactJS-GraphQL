import { useQuery } from '@apollo/client';

import { GET_CLIENTS } from '../../graphql/client/client.queries';
import { IClientsData } from '../../interfaces/IClientsData';
import { Spinner } from '../Spinner/Spinner';
import { ClientRow } from './ClientRow';

export function Clients(): JSX.Element {
  const { loading, error, data } = useQuery<IClientsData>(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong!</p>;

  return (
    <table className="table table-hower mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data?.clients.map((client) => (
          <ClientRow key={client.id} client={client} />
        ))}
      </tbody>
    </table>
  );
}
