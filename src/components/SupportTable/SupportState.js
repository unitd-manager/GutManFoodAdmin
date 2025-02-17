import React from 'react';
import { Input } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types'

const SupportState = ({supportDetails}) => {

  SupportState.propTypes = {
    supportDetails: PropTypes.array
  }
  const [count, setCount] = React.useState()

React.useEffect(() => {
  if(supportDetails){
    const res = {}
     supportDetails.forEach((v) =>{
      res[v.value] = (res[v.value] || 0) + 1;
      return res
    })
  
  const labels = ['new', 'in progress', 'tested', 'hold', 're-open', 'cancelled','completed']
  const finalArray = []
  for(let i=0; i <= labels.length;i++){
    if(labels[i] in res){
      finalArray.push(res[labels[i]])
    }else{
      finalArray.push(0)
    }
  }
  setCount(finalArray)
  }
}, [supportDetails])

  //Bar Chart
  const barData = {
    labels: ['New', 'In progress', 'Tested', 'Hold', 'Re-open', 'Cancelled','Completed'],
    datasets: [
      {
        label: 'Status',
        backgroundColor: '#2962ff',
        borderColor: '#2962ff',
        data: count,
      }
    ],
  };

  return (
    <>
      <Input type="select" className="custom-select">
        <option value="1">Weekly</option>
        <option value="2">Monthly</option>
        <option value="3">Quaterly</option>
      </Input>
        <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
          <Bar
            data={barData}
            options={{
             
              maintainAspectRatio: false,
              legend: {
                display: true,
                labels: {
                  fontFamily: 'Nunito Sans, sans-sarif',
                  fontColor: '#8898aa',
                },
              },
              scales: {
                yAxes: [
                  {
                    gridLines: { display: false },
                    ticks: {
                      fontFamily: 'Nunito Sans, sans-sarif',
                      fontColor: '#8898aa',
                      min:0,
                      max:20,
                      stepSize:2
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: { display: false },
                    ticks: {
                      fontFamily: 'Nunito Sans, sans-sarif',
                      fontColor: '#8898aa',
                    },
                  },
                ],
              },
            }}
          />
        </div>
    </>
  );
};

export default SupportState;
