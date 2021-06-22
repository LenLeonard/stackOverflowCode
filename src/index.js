import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, FieldArray, Field } from "formik";
import Input from "./Input";
import "./styles.css";

const initialFormData = undefined;

function App() {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // this is replacement for a network call that would load the data from a server
    setTimeout(() => {
      setFormData({
        id: 1,
        firstName: "First Name 1",
        friends: [
          { id: 2, carrierName: "Metro X", phoneNumber: "555-555-5555", dispatchEmail:"dispatch@metrox.com", contactName: "Ghav", rate:1000, notes:"None" },
          
        ]
      });
    }, 1000);
    // Missing dependency array here
  }, []);

  return (
    <div className="app">
      {formData && (
        <Formik initialValues={formData} enableReinitialize>
          {({ values }) => (
            <Form>
              
              <FieldArray name="friends">
                {arrayHelpers => (
                  <div>
                    <button
                      onClick={() =>
                        arrayHelpers.push({
                          id: Math.floor(Math.random() * 100) / 10,
                          carrierName: "",
                          phoneNumber: "",
                          dispatchEmail:"",
                          contactName:"",
                          rate:'',
                          notes:"",
                        })
                      }
                    >
                      add
                    </button>
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Carrier Name</th>
                          <th>Phone Number</th>
                          <th>Dispatch Email</th>
                          <th>Contact Name</th>
                          <th>Rate</th>
                          <th>Notes</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {values.friends && values.friends.length > 0 ? (
                          values.friends.map((friend, index) => (
                            <tr key={index}>
                              <td>{friend.id}</td>
                              <td>
                                <Input name={`friends[${index}].carrierName`} />
                              </td>
                              <td>
                                <Input name={`friends[${index}].phoneNumber`} />
                              </td>
                              <td>
                                <Input name={`friends[${index}].dispatchEmail`} />
                              </td>
                              <td>
                                <Input name={`friends[${index}].contactName`} />
                              </td>
                              <td>
                                <Input name={`friends[${index}].rate`} />
                              </td>
                              <td>
                                <Input name={`friends[${index}].notes`} />
                              </td>
                              <td>
                                <button
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  remove
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td>no friends :(</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);