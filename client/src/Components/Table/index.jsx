import React from "react";
import "./Table.scss";
import { limitDescription } from "../../Utils/utils";
import { Popup } from "semantic-ui-react";

const Table = ({ data, heading }) => {
  return (
    <div className="table-container">
      <table>
        <tbody>
          <tr className="heading">
            {heading.map((element, index) => {
              return (
                <th>
                  <p> {element}</p>
                </th>
              );
            })}
          </tr>
          {data.map((element, index) => {
            return (
              <tr>
                <td>{element.data.date}</td>
                <td> {element.data.time} </td>
                <td> {element.data.amount} </td>
                <td>{element.data.currency}</td>
                <td>
                  {!!element.data.description ? (
                    element.data.description.length > 100 ? (
                      <Popup
                        content={element.data.description}
                        trigger={
                          <p>{limitDescription(element.data.description)}</p>
                        }
                      />
                    ) : (
                      element.data.description
                    )
                  ) : (
                    <p>No description</p>
                  )}
                </td>
                <td>{element.data.category}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
