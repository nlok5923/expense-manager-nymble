import React from "react";
import "./Table.scss";

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
                <td>
                    {element.data.date}
                </td>
                <td> {element.data.time} </td>
                <td> {element.data.amount} </td>
                <td>
                    {element.data.currency}
                 </td> 
                <td>
                    {element.data.description}
                </td>
                <td>
                    {element.data.category}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;