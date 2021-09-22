import React from 'react';
import services from '../../services';
import { Select } from 'antd';
import Lang from '../../lang'
const {Option} = Select;

class EntityFilter extends React.Component{

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

    onSearch = async(e) => {
        if(e.length >= 3){
         
         let res = await services.EntityList.getEntityList(this.props.modulename,e);
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
    
     entityListOption = () => {
          let optionsEntityList = (
             this.state.entityDataList.map((_r,i)=>(
                <Option value={_r.nif}>{_r.nome}<br />{_r.nifap}</Option>
             ))
          )
    
          this.setState({
             optionsEntityList
          })
       }
    handleSelect = (value) => {
        this.props.getselectedEntity(value);
        this.setState({defaultSelection: value})
     }
    
    render(){
        return (
            <div className="form-group position-relative"> 
                <div className="input-box active-grey">
                <Select 
                    onChange={this.handleSelect} 
                    showSearch
                    onSearch={this.onSearch}
                    style={{width:"100%"}} 
                    value={this.state.defaultSelection||""}
                    placeholder="Pesquisar por Nº ou Nome" 
                    optionFilterProp='children' 
                    notFoundContent="Entidade não encontrada, refina os critérios de pesquisa"
                    >
                    {
                    this.state.searchValid >= 3 &&
                        this.state.optionsEntityList
                    }
                    </Select>
                </div>
                <a className="search-icon">
                <i className="fas fa-search"></i>
                </a>
             </div>
        )
    }
}

export default EntityFilter;