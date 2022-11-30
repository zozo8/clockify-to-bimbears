import * as React from 'react';
import './style.css';
import readXlsxFile from 'read-excel-file';

class ClockifyToTimeSheet extends React.Component {
  state = {
    rows: [],
  };

  headers = [
    'Date',
    'Team / Project',
    'Title / Product Backlog Item / Bug / Task',
    'Time Spent (h)',
  ];

  constructor(props) {
    super(props);
  }

  toBimbearsTs(rows: any[][]) {
    let date;
    const outputRows = [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0]) {
        date = rows[i][0];
      } else {
        outputRows.push([
          date,
          'Treasury',
          rows[i][1],
          Math.round(rows[i][3] * 2) / 2,
        ]);
      }
    }
    return outputRows;
  }

  fileHandler = (event) => {
    let fileObj = event.target.files[0];
    readXlsxFile(fileObj).then((rows) => {
      console.log(rows);
      this.setState({
        rows: this.toBimbearsTs(rows),
      });
    });
  };

  render() {
    return (
      <div>
        <input
          type="file"
          onChange={this.fileHandler.bind(this)}
          style={{ padding: '10px' }}
        />
        <table>
          <tr>
            {this.headers.map((field) => (
              <th> {field} </th>
            ))}
          </tr>
          {this.state.rows.map((row) => (
            <tr>
              {row.map((item) => (
                <td>{item}</td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default function App() {
  return <ClockifyToTimeSheet />;
}
