import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { getField } from '../../../apis/fieldApi';
import CheckboxField from '../../../components/CheckboxField';

const SetFieldManager = () => {
  const dispatch = useDispatch();
  const listField = useSelector((state) => state.field.data);

  useEffect(() => {
    dispatch(getField());
    console.log(listField);
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          selected: [],
        }}
        onSubmit={(values) => {
          console.log(values);
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

    </>
  );
};

export default React.memo(SetFieldManager);
