import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { number } from 'prop-types';
import { Toast } from 'react-bootstrap';
import { getField } from '../../../apis/fieldApi';
import CheckboxField from '../../../components/CheckboxField';

const SetFieldManager = ({ managerId }) => {
  const dispatch = useDispatch();
  const listField = useSelector((state) => state.field.data);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getField());
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          selected: [],
        }}
        onSubmit={async (values) => {
          const data = {
            fieldId: values.selected[0],
            managerId,
            id: 0,
          };
          try {
            const response = await axios({
              method: 'POST',
              url: `${process.env.REACT_APP_BASE_URL}/api/ad/managerField/create_and_update`,
              headers: {
                token: localStorage.getItem('AccessToken'),
                'Content-Type': 'application/json',
              },
              data: JSON.stringify(data),
            });
            if (response.data.message === 'success') {
              console.log(response.data);
              setShow(true);
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {
          () => (
            <Form>
              <div role="group" aria-labelledby="checkbox-group">
                {
                listField && listField.map((field) => (
                  <CheckboxField label={field.name} name="selected" value={field.id} key={field.name} />
                ))
                }
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-user btn-block mt-5"
              >
                Set Field
              </button>
            </Form>
          )
      }

      </Formik>
      <Toast
        show={show}
        delay="3000"
        autohide
        onClose={() => setShow(false)}
        className="mt-2"
        bg="success"
      >
        <Toast.Body>Update Field Manager</Toast.Body>
      </Toast>
    </>
  );
};

SetFieldManager.propTypes = {
  managerId: number.isRequired,
};

export default React.memo(SetFieldManager);
