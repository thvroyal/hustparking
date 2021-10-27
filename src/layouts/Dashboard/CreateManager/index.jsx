import React, { useState } from 'react';
import NewManagerForm from './NewManagerForm';
import SetFieldManager from './SetFieldManager';

function NewManager() {
  const [status, setStatus] = useState(0);
  const [managerId, setManagerId] = useState(null);

  const handleSuccess = (id) => {
    setStatus(1);
    setManagerId(id);
  };

  return (
    <>
      <div>
        <h1 className="h3 mb-2 text-gray-800">Create a new manager</h1>
        <p className="mb-4">A manager will have limited permissions to add, edit, and delete.</p>
      </div>
      {/* // <!-- DataTales Example --> */}
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow mb-4">
            <div className="card-body p-5">
              {
                status ? <SetFieldManager managerId={managerId} />
                  : <NewManagerForm onSuccess={handleSuccess} />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewManager;
