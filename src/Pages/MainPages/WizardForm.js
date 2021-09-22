import React from 'react';
import FormnavBar from '../../components/common/wizard_navbar'
import WizardLeft from '../../components/common/wizard_left'
import services from '../../services';
import $ from 'jquery';
import WizardForm from '../../components/MainPageComponent/wizard_form'
import ParcelRightPanel from '../../components/Parcel-Right-panel/parcel_right_panel';
import { toast } from 'react-toastify';
import { Row } from 'antd';

const queryString = require('query-string');

const parcel = []

let combolistrequest = {
    "Filters": null,
    "SortBy": "",
    "IsSortTypeDESC": true,
    "IsPagination": false,
    "Page": 2,
    "PageSize": 2
};

class WizardFormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            all_list: {},
            id: '',
            sel_nev: "Parcela",
            headName: null,
            params: {},
            AllVisiable:{},
            AllEnable:{}
        }
    }


    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        let headName = "Create Parcelas";
        document.title ='AGPP - Detalhes Parcela';

        this.setState({
            headName,
            params: parsed
        })
        if (parsed.id) {
            this.getparceldetails(parsed);
        }
        this.getAllLIst();
    }

    isEnable=(name)=>{
        let AllEnable = {...this.state.AllEnable}
        if(AllEnable[name]==true || AllEnable[name]==false)
          return AllEnable[name]?false:true;
        else  return false;
      }
    isVisiable = (name)=>{
        let AllVisiable = {...this.state.AllVisiable}
        if(AllVisiable[name]==true || AllVisiable[name]==false){
            return AllVisiable[name];
        }
        else  return true;
    }
    
   
    Inactiva=(status)=>{
        let AllEnable = {...this.state.AllEnable}
        let AllVisiable = {...this.state.AllVisiable}
        let full = false;
        if(status=="I"){
          full = true;
        }
        AllVisiable.btnCalculaDados= false;
        AllEnable.geocod= false;
        AllEnable.numparant= false;
        AllEnable.sitdeclar= false;
        AllEnable.desparc= false;
        AllEnable.pontuacao= false;
        AllEnable.dtultvist= false;
        AllEnable.codlitigio= false;
        AllEnable.fatordporto= false;
        AllEnable.areaprojectada= false;
        AllEnable.anoplantacao= false;
        AllEnable.idclasseplant= false;
        AllEnable.pontuacao= full;
        AllEnable.idclasseplant= false;
        
        
        AllEnable.bacelosileg = false;
        AllEnable.enxertoS1ILEG = false;
        AllEnable.videiraS2ILEG = false;
        AllEnable.videiraS3ILEG = false;
        AllEnable.videiraS4A25ILEG = false;
        AllEnable.videirasmaioR25ILEG = false;
        
        AllEnable.pcttinta = false;
        AllEnable.pctbranca = false;
        AllEnable.pctrose = false;
        AllEnable.pctmoscatel = false;
       
        AllEnable.compasso = false;
        AllEnable.densidade = false;
        AllEnable.prctLss3AndFailures = false;
        AllEnable.prctfaults = false;
        AllEnable.pesmaioR3 = false;
        AllEnable.pesmenoR3 = false;
        AllEnable.pesilegais = false;
        AllEnable.pestotals = false;
        AllEnable.pesramleg = false;
        AllEnable.falhasram = false;
        AllEnable.pesfalileg = false;
        AllEnable.pesfalleg = false;
        AllEnable.pescastasnaoaptas = false;
        AllEnable.pessemaramacao = false;
        AllEnable.armacaoterreno = false;

        AllEnable.bacelos = false;
        AllEnable.enxertoS1 = false;
        AllEnable.videiraS2 = false;
        AllEnable.videiraS3 = false;
        AllEnable.videiraS4A25 = false;
        AllEnable.videirasmaioR25 = false;
        AllEnable.bacelosileg = false;
        AllEnable.enxertoS1ILEG = false;
        AllEnable.videiraS2ILEG = false;
        AllEnable.videiraS3ILEG = false;
        AllEnable.videiraS4A25ILEG = false;
        AllEnable.videirasmaioR25ILEG = false;

        
        if(full){
            AllEnable.legalizavel= false;
            AllEnable.idsitparc = false;
            AllEnable.idsitleg = false;
            // btnGravarComent.Visible = True
            // linkPrint.Visible = False
            // proprietarios1.SetReadOnly()
            // NovoArtigoMatricial1.SetReadOnly()
            // txtTitularDireito.Enabled = False
            // btnProcTit.Visible = False
            // painelAddExplorador.Visible = False
            // grvExplorador.Enabled = False
            // btnGetPtCastas.Visible = False
            // imgCalcPontuacao.Visible = False
            // cpeObs.Collapsed = False
        }

        this.setState({
            AllEnable,
            AllVisiable
        })
      }
    
      
      


    getAllLIst = () => {
        this.getlist_new('busentdistrito');
        this.getlist('legalPlot');
        this.getlist('LitigationSituation');
        this.getlist('ClassPlantation');
        this.getlist('DouroPort');
        this.getlist_new('Sinonimo');
        this.getlist_new('Casta');
        this.getlist('colors');
        this.getlist('ExplorerType');
        this.getlist('SitucaoDaParcela');
    }

    getlist = async (listname) => {
        let res = await services.apiCall.requestApi("allservice/" + listname, combolistrequest, 'post');
        if (res) {
            let all_list = { ...this.state.all_list }
            all_list[listname] = res
            this.setState({
                all_list
            })
        }
    }
    getlist_new = async (listname) => {
        let res = await services.apiCall.requestApi(listname + "/GetAll", combolistrequest, 'post');
        if (res) {
            let all_list = { ...this.state.all_list }
            all_list[listname] = res
            this.setState({
                all_list
            })
        }
    }


    closePopup = () => {
        $(".left-popup").trigger('click');
        this.updatesel_nev(this.state.sel_nev);
    }



    getrightformdata = (data) => {
        console.log("right data", data)
        this.setState({
            data: data
        })
    }

    getcenterformdata = (data) => {
        console.log("center form", data)
        this.setState({
            data: data
        })

    }

    getparceldetails = async (parsed) => {
        let data = {
            id: parseInt(parsed.id),
            versao: parseInt(parsed.versao)
        }
        let res = await services.apiCall.requestApi("Parcel/GetById", data, 'post');

        if (res) {
            res.parcelProperty.map((_row) => {
                if (_row.dividendo && _row.divisor) {
                    _row['quota'] = (_row.dividendo / _row.divisor) * 100
                } else {
                    _row['quota'] = 0
                }
            })
            res.parcelExplorer.map((_row) => {
                if (_row.dividendo && _row.divisor) {
                    _row['quota'] = (_row.dividendo / _row.divisor) * 100
                } else {
                    _row['quota'] = 0
                }
            })
            let headName =  res.status == "I" ? "HISTÓRICO DA PARCELA" : "Edit Parcelas";
            document.title =res.status == "I"?  "AGPP - Histórico Parcela": 'AGPP - Detalhes Parcela';
            this.Inactiva(res.status);
            this.setState({
                data: res,
                id: parsed.id,
                headName
            })
        }
    }

    scrolthis = (sel_nev) => {
        if ($('#' + sel_nev).length)
            $('html, body').animate({
                scrollTop: $('#' + sel_nev).offset().top - 95 //#DIV_ID is an example. Use the id of your destination on the page
            }, 'slow');
    }

    handleSubmit = async (e, backUrl) => {
        const parsed = queryString.parse(this.props.location.search);
        let url = ''
        if (parsed.id) {
            url = `/Parcel/Edit`
        } else {
            url = '/Parcel/Create'
        }
        let data = { ...this.state.data }
        data.parcel &&
            delete data.parcel.id;
        if (!data.parcel) {
            toast.error("Por favor complete" + " Parcela" + " detalhes")
            this.scrolthis("parcel");
            return false;
        }
        else if (!data.castaparc) {
            toast.error("Por favor complete" + " Castas" + " detalhes")
            this.scrolthis("parcelGrapes");
            return false;
        } else if (!data.matrixArticle) {
            toast.error("Por favor complete" + " Artigo Matricial" + " detalhes")
            this.scrolthis("matrixArticle");
            return false;
        }
        else if (!data.parcel.titdireito) {
            toast.error("Por favor complete" + " Titular" + " detalhes")
            return false;
        }
        else if (!data.parcelProperty) {
            toast.error("Por favor complete" + " Proprietarios " + " detalhes")
            return false;
        } else if (!data.parcelExplorer) {
            toast.error("Por favor complete" + " Exploradores" + " detalhes")
            return false;
        }

        // let castasum=0;
        // let castaobject = ["pctbranca","pcttinta","pctrose"];
        // castaobject.map((_row,index)=>{
        //     castasum += data.parcel[_row]?parseInt(data.parcel[_row]): 0
        // });
        // if(castasum > 100){
        //     toast.error("O valor total de castas não poderá ser superior a 100%")
        //     this.scrolthis("parcelGrapes");
        //     return false;
        // } 


        if (!data.legalFramework) {
            data.legalFramework = {};
        }

        //delete data.parcel.createdAt;

        let res = await services.apiCall.requestApi(url, data, 'post');
        if (res) {
            console.log("....", res)
            if (url) {
                window.location = backUrl
            }
        }
    }

    handleDelete = (status) => {
        console.log("status", status)
    }

    updatesel_nev = (sel_nev) => {
        this.setState({
            sel_nev
        })
        $('html, body').animate({
            scrollTop: $('#' + sel_nev).offset().top - 95 //#DIV_ID is an example. Use the id of your destination on the page
        }, 'slow');
    }

    render() {

        return (
            <div className="dashboard">
                <FormnavBar to="/dashboard" handleDelete={(status) => this.handleDelete(status)} showDelete={true} handleSubmit={(data, url) => this.handleSubmit(data, url)} type="parcelas" headName={this.state.headName} />
                <div className="full-container edit-ward">
                    <WizardLeft date={new Date()} id={this.state.id ? this.state.id : null} updatesel_nev={(sel_nev) => this.updatesel_nev(sel_nev)} sel_nev={this.state.sel_nev} />
                    <WizardForm date={new Date()} 
                    id={this.state.id} 
                    Parcel={this.state.data} 
                    all_list={this.state.all_list} 
                    closePopup={() => this.closePopup()} 
                    getcenterformdata={(data) => this.getcenterformdata(data)} 
                    updatesel_nev={(sel_nev) => this.updatesel_nev(sel_nev)} 
                    isVisiable={(name)=>this.isVisiable(name)}
                    isEnable={(name)=>this.isEnable(name)}
                    />
                    <ParcelRightPanel date={new Date()} Parcel={this.state.data} all_list={this.state.all_list} closePopup={() => this.closePopup()} handleSubmit={(data) => this.getrightformdata(data)} />
                </div>
            </div>
        )
    }
}

export default WizardFormPage;