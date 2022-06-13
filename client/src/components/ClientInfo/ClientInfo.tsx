import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FaEnvelope, FaIdBadge, FaPhone } from 'react-icons/fa';
import { IClient } from '../../interfaces/IClient';

interface ClientInfoProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  client: IClient;
}

export function ClientInfo({ client }: ClientInfoProps): JSX.Element {
  return (
    <>
      <h5 className="mt-5">Client Information</h5>

      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge className="icon" /> {client.name}
        </li>
        <li className="list-group-item">
          <FaEnvelope className="icon" /> {client.email}
        </li>
        <li className="list-group-item">
          <FaPhone className="icon" /> {client.phone}
        </li>
      </ul>
    </>
  );
}
