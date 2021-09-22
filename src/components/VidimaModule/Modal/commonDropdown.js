import React from 'react';
import { Select } from 'antd';

const {Option} = Select;

class CommonDropdown extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="dropDownSelect">
                    <p style={{marginTop:"4px"}}>Valor em</p>
                    <Select
                        showSearch
                        placeholder="Sectionar"
                        style={{marginLeft:" 20px"}}
                        optionFilterProp="children"
                    >
                        <Option selected value="">Sectionar</Option>
                        {
                            this.props.dropDownKey.map((_opt,i) =>(
                                <Option key={i} value={_opt.key}>{_opt.key}</Option>
                            ))
                        }
                    </Select>
                </div>
            </React.Fragment>
        )
    }
}


export default CommonDropdown;