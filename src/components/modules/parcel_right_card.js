import React from 'react';
import { Card } from 'antd';



const ParcelRightPanelCard = (props) => {
    return (
        <div className="d-flex pb10">
            <div className="col-md-6 pl5 pr5">
                <Card>
                    <label>Classe</label>
                    <p className="card-design">{props.cardData.parcel && props.cardData.parcel.classe}</p>
                </Card>
            </div>
            <div className="col-md-6 pr5 pl5">
                <Card>
                    <label>Pontuação</label>
                    <p className="card-design">{props.cardData.parcel && props.cardData.parcel.pontuacao}<span className="float-right mt-3 mr-2 k-icon k-i-edit"></span></p>
                    
                </Card>
            </div>
        </div>
    )
}


export default ParcelRightPanelCard;