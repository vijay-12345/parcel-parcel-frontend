import React from 'react';
import services from '../../services';
import { Modal,Space, Button, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Lang from '../../lang'

const { confirm } = Modal;

class DeleteModal extends React.Component{

    constructor(props){
        super(props);
    }

    showDeleteConfirm = () =>{
        
        const handleDeleteModal = () => {
            // let id = this.props.row['id'] ? 
            //     this.props.row['id'] 
            //     : 
            //     Array.isArray(this.props.row['codEstatuto']) ? 
            //       this.props.row['codEntidade']
            //       :
            //       this.props.row['codEstatuto']
            // console.log("delete",id,this.props.row['codEntidade'],this.props.row['codEstatuto'])
            this.props.handleDelete(this.props.row)
        }

        confirm({
          title: Lang.langCheck.langRequest('Are you sure?'),
          icon: <ExclamationCircleOutlined />,
          content: Lang.langCheck.langRequest('You want to Delete this.'),
          okText: Lang.langCheck.langRequest('Yes'),
          okType: 'danger',
          cancelText: Lang.langCheck.langRequest('No'),
          onOk() {
            handleDeleteModal();
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    
    render(){
        return (
            <Space>
                <Tooltip title="Excluir" color={"#808080"}>
                  <a onClick={this.showDeleteConfirm}><i className="fas fa-trash-alt text-inactive" aria-hidden="true"></i></a>
                </Tooltip>
          </Space>
        )
    }
}

export default DeleteModal;