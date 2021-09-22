import React from 'react';
import { DatePicker } from 'antd';
import { Input } from '@progress/kendo-react-inputs';
import services from '../../services';
var moment = require('moment')

const dateFormat = "YYYY-MM-DD"


class WizardExploraModalForm extends React.Component{
    constructor(props){
      super(props);
      this.state ={
         data:{},
      }
    }

    componentDidMount() {
      this.setState({
         data : this.props.row
      })
    }

    componentDidUpdate(prevProps){
      if(prevProps.date !== this.props.date){
         this.setState({
            data : {}
         })
         console.log("newdata",this.props.row)
         this.setState({
            data : this.props.row
         })
       }
    }

    handleDatePicker = () => {
      let datePicker = ( <DatePicker  
         placeholder="Data de Início"
         size="large"
         onChange={this.handleDate}
      />) 
      let date = this.props.row.dtinicio ? this.props.row.dtinicio : '' ;
       if(date){
          date = moment(date).format(dateFormat);
          datePicker = (<DatePicker 
            className="form-control"
            size="middle"
            placeholder="Date of Birth"
            defaultValue={moment(date,dateFormat)}
            format={dateFormat}
            onChange={this.handleDate}
        />)
       }
       return datePicker
  }

    handleDate = (e) => {
      let data = {...this.state.data}
         data['dtinicio'] = e && e._d ? moment(e._d).format(dateFormat) : ''
         this.setState({
            data
         })
    }

    handleChange = (e) => {
      let data = {...this.state.data}
     if(e.target.name !== 'quota'){
      data[e.target.name] = parseInt(e.target.value)
     }else{
      data[e.target.name] = e.target.value
     }
      this.setState({
         data
      })
    }

    handleCheck=()=>{
      let data = {...this.state.data}
      data['sitdcp'] = data.sitdcp ? false : true
      this.setState({
         data
      })
    }

    handleSubmit = () => {
       let quota = this.state.data && this.state.data.quota
      try{
         eval(quota)
         console.log("form Submit DATA",this.state.data)
         this.props.getPopUpFormState(this.state.data,this.props.tab)
         this.setState({
            data : {}
         },()=>this.props.closePopup())
      }catch(err){
         let data = {...this.state.data}
         let error = {
            errors : {
               "quota" : ["Quota parte deve estar em Fração ou Inteiro"]
            } 
         }
         services.errorCheck.error(error);
         data.quota = ''
         this.setState({data})
      }
    }

    render(){
       console.log("....l.l..",this.state.data)
       if(this.props.tab === 'parcelExplorer')
        return (
         <div className="modal-content">
         <div className="modal-header">
            <h4 className="modal-title pl-0">Associar Exploradores</h4>
            <button onClick={this.handleSubmit} type="button" className="btn btn-success btn-sm mr-3">Guardar</button>
            <a href="#" onClick={()=>this.props.closePopup()} className="remoove mr-2">Cancelar</a>
         </div>
         <div className="modal-body">
            <div className="details">
               <p>Número</p>
               <h3>{this.props.entity.nifap}</h3>
               <p>Nome</p>
               <h3>{this.props.entity.nome}</h3>
               <div className="row">
                  <div className="col-md-6 kendo-Input">
                     <div className="input-box active-grey mb-2">
                        {/* <label className="input-label">Data de Início </label> */}
                        {
                           this.handleDatePicker()
                        }
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="input-box active-grey mb-2">
                        {/* <label className="input-label">Quota parte</label>
                        <input onChange={this.handleChange} name="quota" value={this.state.data.quota || ''} type="text"  className="input-1" placeholder="Quota parte"/> */}
                        <Input
                           type="text"
                           style={{ width: "100%"}}
                           className="input-1"
                           name="quota" 
                           value={this.state.data.quota || ''}
                           label="Quota parte"
                           onChange={this.handleChange}
                        />
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-6">
                     <div className="input-box active-grey mb-2">
                        {/* <label className="input-label">Area apta </label>
                        <input type="text" onChange={this.handleChange} name="fitArea" value={this.state.data.fitArea || ''} className="input-1" placeholder="Enter Area apta"/> */}
                        <Input
                           type="number"
                           style={{ width: "100%"}}
                           className="input-1"
                           name="areaapta" 
                           value={this.state.data.areaapta || ''}
                           label="Área apta"
                           onChange={this.handleChange}
                        />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="input-box active-grey mb-2">
                        {/* <label className="input-label">Area nao apta</label>
                        <input type="text" onChange={this.handleChange} name="unsuitableArea" value={this.state.data.unsuitableArea || ''} className="input-1" placeholder="Enter Area nao apta"/> */}
                        <Input
                           type="number"
                           style={{ width: "100%"}}
                           className="input-1"
                           name="areanapta" 
                           value={this.state.data.areanapta || ''}
                           label="Área não apta"
                           onChange={this.handleChange}
                        />
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-6">
                     <div className="input-box active-grey mb-2">
                        {/* <label className="input-label">Area without Enq </label>
                        <input type="text" onChange={this.handleChange} name="areaWithoutEnq" value={this.state.data.areaWithoutEnq || ''} className="input-1" placeholder="Enter Area without Enq" /> */}
                        <Input
                           type="number"
                           style={{ width: "100%"}}
                           className="input-1"
                           name="areailegal" 
                           value={this.state.data.areailegal || ''}
                           label="Área Sem Enq"
                           onChange={this.handleChange}
                        />
                     </div>
                  </div>
                  <div className="col-md-6 kendo-Input">
                     <div className="input-box active-grey mb-2">
                        <label className="input-label">&nbsp;</label>
                        <div className="custom-control custom-checkbox pt10">
                           <input type="checkbox" onChange={this.handleCheck} checked={this.state.data.sitdcp} className="custom-control-input" id="Situacao" name="example1"/>
                           <label className="custom-control-label" for="Situacao">Situacao DCP</label>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-6">
                     <div className="input-box active-grey">
                        {/* <label className="input-label">Ano DCP</label>
                        <input type="text" onChange={this.handleChange} name="dcpYear" value={this.state.data.dcpYear || ''} className="input-1" placeholder="Ano DCP"/> */}
                         <Input
                           type="number"
                           style={{ width: "100%"}}
                           className="input-1"
                           name="anodcp" 
                           value={this.state.data.anodcp || ''}
                           label="Ano DCP"
                           onChange={this.handleChange}
                        />
                     </div>
                  </div>
                  
                  <div className="col-md-6 kendo-Input">
                     <div className="input-box active-grey drop-down-box">
                        <label className="input-label">Tipo explorador </label>
                        <select className="custome-drop-down" value={this.state.data.explorerType || ''} onChange={this.handleChange} name="explorerType">
                           <option value="">Opção</option>
                           {
                              this.props.all_list && this.props.all_list.ExplorerType && 
                              this.props.all_list.ExplorerType.map((_r,i)=>(
                                 <option key={i} value={_r.idtipoexplor}>{_r.destipoexplor}</option>
                              ))
                           }
                        </select>
                     </div>
                  </div>
                  {/* <div className="row"> */}
                  <div className="col-md-6">
                     <div className="input-box active-grey mb-2">
                        {/* <label className="input-label">Ano DCP</label>
                        <input type="text" onChange={this.handleChange} name="dcpYear" value={this.state.data.dcpYear || ''} className="input-1" placeholder="Ano DCP"/> */}
                         <Input
                           type="number"
                           style={{ width: "100%"}}
                           className="input-1"
                           name="areaaf" 
                           value={this.state.data.areaaf || ''}
                           label="A a F com MG"
                           onChange={this.handleChange}
                        />
                     </div>
                  </div>
                  {/* </div> */}
               </div>
            </div>
            </div>
         </div>
            )
         if(this.props.tab === 'parcelProperty'){
            return (
               <div className="modal-content">
                  <div className="modal-header">
                     <h4 className="modal-title pl-0">Associar Proprietário</h4>
                     <button onClick={this.handleSubmit} type="button" className="btn btn-success btn-sm mr-3">Guardar</button>
                     <a href="#" onClick={()=>this.props.closePopup()} className="remoove mr-2">Remover</a>
                  </div>
                  <div className="modal-body">
                     <div className="details">
                        <p>Número</p>
                        <h3>{this.props.entity.nifap}</h3>
                        <p>Nome</p>
                        <h3>{this.props.entity.nome}</h3>
                        <div className="row">
                           <div className="col-md-6 kendo-Input">
                              <div className="input-box active-grey">
                                 {/* <label className="input-label">Data de Início </label> */}
                                 {
                                   this.handleDatePicker()
                                 }
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="input-box active-grey">
                                 {/* <label className="input-label">Quota parte</label>
                                 <input type="text" onChange={this.handleChange} name="quota" value={this.state.data.quota || ''} className="input-1" placeholder="Quota parte" /> */}
                                 <Input
                                    type="text"
                                    style={{ width: "100%"}}
                                    className="input-1"
                                    name="quota" 
                                    value={this.state.data.quota || ''}
                                    label="Quota parte"
                                    onChange={this.handleChange}
                                 />
                              </div>
                           </div>
                        </div>
                        </div>
                        </div>
                     </div>
            )
         }
    }
}

export default WizardExploraModalForm;