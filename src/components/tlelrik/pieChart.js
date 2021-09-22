import React from 'react'
import {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem
  } from '@progress/kendo-react-charts';

  
  
  class ChartContainer extends React.Component{

    constructor(props){
      super(props);
      this.state={
        series : []
      }
    }

    componentDidMount(){
      this.updateSeries()
    }

    componentWillUnmount(){
      this.setState({series:[]})
    }

    componentDidUpdate(prevProps){
      if(prevProps.date !== this.props.date){
       this.updateSeries()
      }
    }
    
    updateSeries = () =>{
      let series =[];
    if(this.props.data.length === 1){
      series=[
        {  value: 1-this.props.data[0].value },
        {  value: this.props.data[0].value }
      ]
    }else if(this.props.data.length > 1){
      series = this.props.data;
    }else{
      series= [
        {  value: 1 }
      ]
    }
    //console.log("serihjkhues",series)
    this.setState({series})
    }

      render(){
        return (
          <Chart title="World Population by Broad Age Groups">
            <ChartLegend position="bottom" />
            <ChartSeries>
              <ChartSeriesItem type="pie" data={this.state.series} />
            </ChartSeries>
          </Chart>
          )
      }
    }
  export default ChartContainer;