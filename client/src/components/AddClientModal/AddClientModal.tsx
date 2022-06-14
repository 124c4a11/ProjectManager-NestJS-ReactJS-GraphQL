import { useMutation } from '@apollo/client';
import { FormEvent, useState } from 'react';
import { FaUser } from 'react-icons/fa';

import { CREATE_CLIENT } from '../../graphql/client/client.mutations';
import { GET_CLIENTS } from '../../graphql/client/client.queries';
import { IClient } from '../../interfaces/IClient';

export function AddClientModal(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [createClient] = useMutation(CREATE_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { createClient } }) {
      const clients = cache.readQuery<{ clients: IClient[] }>({
        query: GET_CLIENTS,
      })!.clients;

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, createClient] },
      });
    },
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name === '' || email === '' || phone === '') {
      return alert('Please fill in all fields');
    }

    await createClient();

    setName('');
    setEmail('');
    setPhone('');
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <span className="d-flex align-items-center">
          <FaUser className="icon" />
          <span>Add Client</span>
        </span>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        tabIndex={-1}
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add Client
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
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    value={phone}
                    type="text"
                    className="form-control"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
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
