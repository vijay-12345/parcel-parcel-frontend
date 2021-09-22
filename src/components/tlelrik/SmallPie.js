import React from 'react'
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem
} from '@progress/kendo-react-charts';


  class SmallPie extends React.Component{

    constructor(props){
      super(props);
      this.state={
        series : []
      }
    }

    componentDidMount(){
      this.updateSeries()
    }

    componentDidUpdate(prevProps){
     
      if(prevProps.date !== this.props.date){
       this.updateSeries()
      }
    }

    updateSeries = () =>{
      let series = this.props.data > 0 ? [
        {  value: 1-this.props.data },
        {  value:this.props.data }
    ]
    : 
    [
        {  value: 0.2 },
        {  value: 0.8 }
    ];
    this.setState({series})
    }

    render(){
      return (
         <div className="smallpie">
            <Chart >
              <ChartLegend/>
              <ChartSeries>
                <ChartSeriesItem type="pie" data={this.state.series} />
              </ChartSeries>
          </Chart>
         </div>
        )
      }
    }
  export default SmallPie;