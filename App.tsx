import * as React from 'react';
import './style.css';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

class ClockifyToTimeSheet extends React.Component {
  state = {
    rows: [],
    cols: [],
  };

  constructor(props) {
    super(props);
    console.log(this.state);
    this.setState({ rows: this.toBimbearsTs(this.state.rows) });
  }

  toBimbearsTs(rows: any[][]) {
    let date;
    const outputRows = [
      [
        'Date',
        'Team / Project',
        'Title / Product Backlog Item / Bug / Task',
        'Time Spent (h)',
      ],
    ];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0]) {
        date = rows[i][0];
      } else {
        outputRows.push([date, 'Treasury', rows[i][1], rows[i][3]]);
      }
    }
    return outputRows;
  }

  fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          cols: resp.cols,
          rows: this.toBimbearsTs(resp.rows),
        });
      }
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
        <OutTable
          data={this.state.rows}
          columns={this.state.cols}
          tableClassName="ExcelTable2007"
          tableHeaderRowClass="heading"
        />
      </div>
    );
  }
}

export default function App() {
  return <ClockifyToTimeSheet />;
}
