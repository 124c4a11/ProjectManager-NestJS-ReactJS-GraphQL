import { useMutation } from '@apollo/client';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FaTrash } from 'react-icons/fa';

import { IClient } from '../../interfaces/IClient';
import { DELETE_CLIENT } from '../../graphql/client/client.mutations';
import { GET_CLIENTS } from '../../graphql/client/client.queries';

interface ClientRowProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  client: IClient;
}

export function ClientRow({ client }: ClientRowProps): JSX.Element {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    update(cache, { data: { deleteClient } }) {
      const clients = cache.readQuery<{ clients: IClient[] }>({
        query: GET_CLIENTS,
      })!.clients;

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter(
            (client) => client.id !== (deleteClient as IClient).id,
          ),
        },
      });
    },
  });

  function removeClient() {
    deleteClient();
  }

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td className="text-end">
        <button className="btn btn-danger btn-sm" onClick={removeClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
