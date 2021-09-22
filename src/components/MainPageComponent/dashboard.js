import React from 'react';




class DashBoardComponent extends React.Component{
    render(){
        
        return (
            <div className="inner-container">
            <div className="outer-space">
                <div className="heading d-md-flex align-items-center">
                <img src="imgs/icon1_gray.png" alt=""/>
                    <h3>Parcelas</h3>
                    <button className="btn btn-theme mr-4 btn-sm">+ Inserir</button>
                    <button className="btn btn-black  btn-sm"><i className="fas fa-bars mr-1"></i> INSERIR</button>
                </div>
            
                <div className="container-fluid">
                    <div className="search-section d-md-flex">
                    <div className="text-area d-sm-flex">
                        <div className="input-img"> <i className="fas fa-search mr-1" aria-hidden="true"></i></div>
                        <input type="text" className="form-control" placeholder="Pesquise por Nº de Parcela IVDP" />
                    </div>
                    <div className="categories-section d-md-flex align-items-center justify-content-between">
                        <select className="form-control filter" id="sel1" name="sellist1">
                        <option>Filtors</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        </select>
                        <button className="btn btn-black"><i className="fas fa-search mr-1"></i> PESQUisar</button>
                        
                    </div>
                    </div>
                </div>

                <div className="searct-found">
                    <img className="img-fluid" src="imgs/search-large-icon.png" />
                    <p className="font-14">Sem resultados</p>
                    <h3>Pesquise a parcela que<br/> pretende consultar</h3>
                </div>
            </div>
            </div>
        )
    }
}

export default DashBoardComponent;