import React from 'react';
import WizardExploraModalForm from './wizard_explora_modal';
import { Select } from 'antd';
import services from '../../services';

const {Option} = Select;

class WizardTitularModalForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           popUpForm : '',
           data : [],
           entityDataList : [],
           parcelHolder : {},
           holderDetail : {},
           searchValid : 0,
           optionsEntityList : '',
           entity_list_object : {},
           defaultSelection:""
        }
    }

    componentDidMount() {
         console.log("onmount",this.props.parcelData);
         this.state.defaultSelection="";
         let parcelData = this.props.parcelData;
         if(parcelData){
            if(!Array.isArray(parcelData)){
               parcelData = [parcelData]
            }
         }
         this.setState({
            data : parcelData
         })
    } 

    componentDidUpdate(prevProps){
      if(prevProps.tab !== this.props.tab){
         this.state.defaultSelection="";
         console.log("onUpdate",this.props.parcelData);
         let parcelData = this.props.parcelData;
         if(parcelData){
            if(!Array.isArray(parcelData)){
               parcelData = [parcelData]
            }
         }
         this.setState({
            data : parcelData,
            defaultSelection: null
          })
       }
    }

    addDatatoMainData=(setdata)=>{
      let data=[];
      let alreadySet = false
      console.log("After for submit",setdata,this.state.data);
      if(this.state.data){
         data = [...this.state.data] 
      }
      data.map((_r,i)=>{
         if(_r.entnum && ((_r.entnum).trim() == setdata.entnum)){
            alreadySet=true;
            if(Object.keys(setdata).length > 1)
               data[i]=setdata;
         }
      })
      if(!alreadySet){
         data.push(setdata)
      }
      console.log("After form submit",data);
      this.setState ({
         data
     },()=>this.props.getPopUpFormState(this.state.data,this.props.tab)) 
  }

    popUpDetailEntry = (row,index) => {
       console.log("onformopen",row);
      let popUpForm = (
         <WizardExploraModalForm tab={this.props.tab} date={new Date()} all_list={this.props.all_list} closePopup={()=>this.props.closePopup()} entity={this.state.entity_list_object[(row.entnum).trim()]} index={index} row={row} getPopUpFormState={(data,index,tab)=>this.getPopUpFormState(data,index,tab)}/>
      )
      this.setState ({
          popUpForm
      }) 
  } 

   getPopUpFormState = (formData,tab) => {
      this.addDatatoMainData(formData);
      
   }
   
   handleSelect = (value) => {
      this.entitypermissoncheck(value);
   }

      entitypermissoncheck = async (nif) => {
         let id = this.state.entity_list_object[nif].codEntidade;
         let data = {
            id:Number(id),
            modulename:"parcel"
         }
         let res = await services.apiCall.requestApi('/Entity/CheckPermission',data,'post');
         if(res){
            let newEntityId = {
               entnum : nif
            }
            this.addDatatoMainData(newEntityId);
         }
     }

   
   entityListOption = () => {
      console.log("ENTITYLIST",this.state.entityDataList)
      let optionsEntityList = (
         this.state.entityDataList.map((_r,i)=>(
            <Option value={_r.nif}>{_r.nome}<br />{_r.nifap}</Option>
         ))
      )

      this.setState({
         optionsEntityList
      })
   }
   

   handleParcelHolder = (row) => {  
      this.props.getPopUpFormState(row,this.props.tab);
      this.props.closePopup()
   }

   onSearch = async(e) => {
      if(e.length >= 3){
         
         let res = await services.EntityList.getEntityList('parcel',e);
         if(res){
            this.setState({
                entityDataList: res.entityList,
                entity_list_object: res.entity_row,
                searchValid : e.length,

            },()=>this.entityListOption())
         }
      }else{
         this.setState({
            searchValid : 0
         })
      }
      this.setState({defaultSelection: e})
   }


    render(){
        return (
               <div className="modal-content">
                  <div className="modal-header">
                     <h4 className="modal-title pl-0">Associar {
                     this.props.tab === 'parcel' ? "Titular" 
                     : this.props.tab === 'parcelProperty' ? 'Proprietário' : 'Exploradores'
                     }
                     </h4>
                     {/* <button type="button" className="btn btn-success btn-sm text-uppercase mr-3">Guardar</button> */}
                     <a href="#" onClick={()=>this.props.closePopup()} className="remoove mr-2">Fechar</a>
                  </div>
                  <div className="modal-body">
                     <div className="form-group position-relative">
                        <div className="input-box active-grey">
                           {/* <label className="input-label">Pesquisar por Nº ou Nome</label> */}
                           {/* <input type="text" name="searchKey" value={this.state.searchKey} onChange={this.handleChange} className="input-1" placeholder="Pesquisar por Nº ou Nome"/> */}
                          
                           <Select 
                              onChange={this.handleSelect} 
                              showSearch
                              onSearch={this.onSearch}
                              style={{width:"100%"}} 
                              value={this.state.defaultSelection||""}
                              //defaultValue={""}
                              placeholder="Pesquisar por Nº ou Nome" 
                              optionFilterProp='children' 
                              notFoundContent="Entidade não encontrada, refina os critérios de pesquisa"
                              >
                            {/* <Option value="" disabled>Pesquise por Nome ou Nº</Option> */}
                              {
                                 this.state.searchValid >= 3 &&
                                 this.state.optionsEntityList
                              }
                           </Select>
                           
                        </div>
                        <a className="search-icon">
                           <i className="fas fa-search"></i>
                        </a>
                        {
                           this.state.data && this.state.entity_list_object &&
                           this.state.data.map((_r,i)=>(
                              _r.entnum && this.state.entity_list_object[(_r.entnum).trim()] &&
                              <div className="listing" key={i}>
                                 <a href="#" className="d-flex justify-content-between align-items-center">
                                    <div>
                                       <p className="top-head m-0">{this.state.entity_list_object[(_r.entnum).trim()] && this.state.entity_list_object[(_r.entnum).trim()].nome}</p>
                                       <p className="small font-14 m-0">{this.state.entity_list_object[(_r.entnum).trim()] && this.state.entity_list_object[(_r.entnum).trim()].nifap}</p>
                                    </div>
                                    <div>
                                       {
                                          this.props.tab !== 'parcel' ?
                                          <a data-toggle="modal" data-target='#left-explor-popup' onClick={()=>this.popUpDetailEntry(_r,i-1)}><i className="fas fa-plus-circle"></i></a>
                                          :
                                          <a data-toggle="modal" data-target='#left-explor-popup' onClick={()=>this.handleParcelHolder(_r)}><i className="fas fa-plus-circle"></i></a>
                                       }
                                    </div>
                                 </a>
                              </div>
                           ))
                        }
                     </div>
                     <div className="modal left-popup" id="left-explor-popup">
                        <div className="modal-dialog modal-sm">
                           {
                              this.state.popUpForm
                           }
                        </div>
                     </div>
                  </div>
               </div>

            )
    }
}

export default WizardTitularModalForm;