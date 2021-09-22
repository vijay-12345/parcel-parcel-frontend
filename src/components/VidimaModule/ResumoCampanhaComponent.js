import React from 'react';
import ChartContainer from '../tlelrik/pieChart';
import CountUp from 'react-countup';


class ResumoCampanha extends React.Component {

    componentDidMount(){
    }

    render() {
        console.log("...........",this.props.data)
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-4">
                        <div className="row">
                            <div className="border bg-white custom-box">
                                <h6>APS/Circulares Cepas emitidas e impressas(Retidas nao incluidas)</h6>
                                <p>total 0123456789</p>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="box-title">
                                            <h4>com MG</h4>
                                            <h2>012345</h2>
                                        </div>
                                        <div className="box-title">
                                            <h4>sem MG</h4>
                                            <h2>012345</h2>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="chart Bigpie" style={{ height: "200px" }}>
                                            <ChartContainer date={new Date()} data={[{ value: 0.5 }, { value: 0.25 }]} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="border bg-white custom-box">
                                <h6>APS/Circulares Cepas emitidas e impressas(Retidas nao incluidas)</h6>
                                <p>total 0123456789</p>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="box-title">
                                            <h4>com MG</h4>
                                            <h2>012345</h2>
                                        </div>
                                        <div className="box-title">
                                            <h4>sem MG</h4>
                                            <h2>012345</h2>
                                        </div>
                                        <div className="box-title">
                                            <h4>sem MG</h4>
                                            <h2>012345</h2>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="chart Bigpie" style={{ height: "200px" }}>
                                            <ChartContainer date={new Date()} data={[{ value: 0.5 },{ value: 0.6 }, { value: 0.25 }]} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="border bg-white custom-box">
                                <h6>APS/Circulares Cepas emitidas e impressas(Retidas nao incluidas)</h6>
                                <p>total 0123456789</p>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="box-title">
                                            <h4>com MG</h4>
                                            <h2>012345</h2>
                                        </div>
                                        <div className="box-title">
                                            <h4>sem MG</h4>
                                            <h2>012345</h2>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="chart Bigpie" style={{ height: "200px" }}>
                                            <ChartContainer date={new Date()} data={[{ value: 0.5 }, { value: 0.25 }]} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="border bg-white custom-box">
                                <h6>APS/Circulares Cepas emitidas e impressas(Retidas nao incluidas)</h6>
                                <p>total 0123456789</p>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="box-title">
                                            <h4>com MG</h4>
                                            <h2>012345</h2>
                                        </div>
                                        <div className="box-title">
                                            <h4>sem MG</h4>
                                            <h2>012345</h2>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="chart Bigpie" style={{ height: "200px" }}>
                                            <ChartContainer date={new Date()} data={[{ value: 0.5 }, { value: 0.25 }]} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            {
                                this.props.data && this.props.data[0] && Object.keys(this.props.data[0].rightTab).length>0 && Object.keys(this.props.data[0].rightTab).map((_k, i) => (
                                    <div className="tab-section col-md-6" key={i}>
                                        <div className="innerBox">
                                            <div className="display-content">
                                                <h5>{_k}</h5>
                                                <CountUp start={0} end={this.props.data[0].rightTab[_k]} duration={6} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}


export default ResumoCampanha;