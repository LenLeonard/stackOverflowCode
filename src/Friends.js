import React, { useCallback, useMemo } from "react";
import { useFormikContext, getIn } from "formik";
import Table from "./Table";
import Input from "./Input";

const EMPTY_ARR = [];

function Friends({ name, handleAdd, handleRemove }) {
  const { values } = useFormikContext();

  // from all the form values we only need the "friends" part.
  // we use getIn and not values[name] for the case when name is a path like `social.facebook`
  const formikSlice = getIn(values, name) || EMPTY_ARR;

  const onAdd = useCallback(() => {
    const item = {
      id: Math.floor(Math.random() * 100) / 10,
                          carrierName: "",
                          phoneNumber: "",
                          dispatchEmail:"",
                          contactName:"",
                          rate:'',
                          notes:"",
    };
    handleAdd(item);
  }, [handleAdd]);

  const onRemove = useCallback(
    index => {
      handleRemove(index);
    },
    [handleRemove]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id"
      },
      {
        Header: "Carrier",
        id: "carrierName",
        Cell: ({ row: { index } }) => (
          <Input name={`${name}[${index}].carrierName`} />
        )
      },
      {
        Header: "Phone Number",
        id: "phoneNumber",
        Cell: ({ row: { index } }) => (
          <Input name={`${name}[${index}].phoneNumber`} />
        )
      },
      {
        Header: "dispatchEmail",
        id: "dispatchEmail",
        Cell: ({ row: { index } }) => (
          <Input name={`${name}[${index}].dispatchEmail`} />
        )
      },
      {
        Header: "Contact Name",
        id: "contactName",
        Cell: ({ row: { index } }) => (
          <Input name={`${name}[${index}].contactName`} />
        )
      },
      {
        Header: "Rate",
        id: "rate",
        Cell: ({ row: { index } }) => (
          <Input name={`${name}[${index}].rate`} />
        )
      },
      {
        Header: "Notes",
        id: "notes",
        Cell: ({ row: { index } }) => (
          <Input name={`${name}[${index}].notes`} />
        )
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row: { index } }) => (
          <button type="button" onClick={() => onRemove(index)}>
            delete
          </button>
        )
      }
    ],
    [name, onRemove]
  );

  return (
    <div className="field">
      <div>
        Friends:{" "}
        <button type="button" onClick={onAdd}>
          add
        </button>
      </div>
      <Table data={formikSlice} columns={columns} rowKey="id" />
    </div>
  );
}

export default React.memo(Friends);