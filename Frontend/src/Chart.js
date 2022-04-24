import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';


function Chart(props) {
    const options = {
        title: {
          text: props.driverID + "  Real Time Monitoring"
        },
        series: [
          {
            // data: [[1650733894,95],[1650733895,75],[1650733896,55],[1650733897,75],[1650733898,70],[1650733900,110],[1650733901,60],[1650733902,65],[1650733907,100]]
            data: props.data
          }
        ]
      };
    return(
        <div>
            <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
            />
        </div>
    )
}
  
export default Chart;

