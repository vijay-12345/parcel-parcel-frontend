import React from 'react';
import CountUp from 'react-countup';



class AnaliseEntregasTabModule extends React.Component {

    state = {
        data: {}
    }

    componentDidMount() {
        this.processData()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            this.processData()
        }
    }

    processData = () => {
        let data = {}
        console.log("MOUNTDATA", this.props.data)
        this.props.data.map((_r, i) => {
            if (!data[_r.prevYear]) { data[_r.prevYear] = {} }
            if (!data[_r.currentYear]) { data[_r.currentYear] = {} }

            data[_r.prevYear]['branco'] = data[_r.prevYear]['branco'] ?
                parseInt(data[_r.prevYear]['branco']) + parseInt(_r.branco_1) : parseInt(_r.branco_1)
            data[_r.prevYear]['tinto'] = data[_r.prevYear]['tinto'] ?
                parseInt(data[_r.prevYear]['tinto']) + parseInt(_r.tinto_1) : parseInt(_r.tinto_1)
            data[_r.prevYear]['moscatel'] = data[_r.prevYear]['moscatel'] ?
                parseInt(data[_r.prevYear]['moscatel']) + parseInt(_r.moscatel_1) : parseInt(_r.moscatel_1)
            data[_r.prevYear]['total'] = data[_r.prevYear]['total'] ?
                parseInt(data[_r.prevYear]['total']) + parseInt(_r.total_1) : parseInt(_r.total_1)

            data[_r.currentYear]['branco'] = data[_r.currentYear]['branco'] ?
                parseInt(data[_r.currentYear]['branco']) + parseInt(_r.branco_2) : parseInt(_r.branco_2)
            data[_r.currentYear]['tinto'] = data[_r.currentYear]['tinto'] ?
                parseInt(data[_r.currentYear]['tinto']) + parseInt(_r.tinto_2) : parseInt(_r.tinto_2)
            data[_r.currentYear]['moscatel'] = data[_r.currentYear]['moscatel'] ?
                parseInt(data[_r.currentYear]['moscatel']) + parseInt(_r.moscatel_2) : parseInt(_r.moscatel_2)
            data[_r.currentYear]['total'] = data[_r.currentYear]['total'] ?
                parseInt(data[_r.currentYear]['total']) + parseInt(_r.total_2) : parseInt(_r.total_2)
        })

        this.setState({ data })
    }

    render() {
        console.log("DATAAAA0", this.props.data, this.state.data)
        return (
            <React.Fragment>
                <div className="row">
                    {
                        Object.keys(this.state.data).map(_k => (
                            _k && 
                            <div className="tab-section">
                                <div className="display-content">
                                    <div className="innerBox col-md-6" style={{marginRight:"140px"}}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                Total ano {_k}<br />
                                                Branco <br />
                                                <p>{this.state.data[_k].branco}</p>
                                                {/* <CountUp start={0} end={this.state.data[_k] && this.state.data[_k].branco} /> */}

                                            </div>
                                            <div className="col-md-3">
                                                Tinto <br />
                                                 <p>{this.state.data[_k].tinto}</p>
                                                 {/* <CountUp start={0} end={this.state.data[_k] && this.state.data[_k].tinto} /> */}

                                            </div>
                                            <div className="col-md-3">
                                                Moscatel <br />
                                                 <p>{this.state.data[_k].moscatel}</p>
                                                 {/* <CountUp start={0} end={this.state.data[_k] && this.state.data[_k].moscatel} /> */}

                                            </div>
                                            <div className="col-md-3">
                                                Total {_k} <br />
                                                 <p>{this.state.data[_k].total}</p>
                                                 {/* <CountUp start={0} end={this.state.data[_k] && this.state.data[_k].total} /> */}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default AnaliseEntregasTabModule;