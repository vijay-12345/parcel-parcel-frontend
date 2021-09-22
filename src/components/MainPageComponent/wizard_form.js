import React from 'react';
import { Steps, Popover, Progress, DatePicker } from 'antd';
import services from '../../services';
import WizardModalForm from '../common/wizard_modal_form';
import Main from '../../Pages/Demo/main';
import Lang from '../../lang'
import LegalFrameWorkModal from '../common/matrixArticleModalForm'
import { Input } from '@progress/kendo-react-inputs';
import RowDeatils from '../common/RowDeatils';
import Calculator from '../common/calculator/Calculator';

var moment = require('moment')
const dateFormat = "YYYY-MM-DD";

const { Step } = Steps;
const customDot = (dot, { title }) => (
  <Popover
    content={
      <span>
        {title}
      </span>
    }
  >
    {dot}
  </Popover>
);

const ParcelPointFactors = {
  "fplocalizacao": "location",
  "fpaltitude": "Altitude",
  "fpexposicao": "Exposure",
  "fpinclinacao": "Inclination",
  "fpabrigo": "shelter",
  "fpnaturterreno": "Nat.Terrenno",
  "fppedregosidade": "stony",
  "fpcastas": "grapevarieties",
  "fpidadevinha": "vineage",
  "fpprodutividade": "productivity",
  "fpcompasso": "compass",
  "fparmacao": "wire"
};

const parcelSettlementCharacteristics = {
  "compasso": "Compass",
  "densidade": "Densidade",
  "prctLss3AndFailures": "PrLss3AndFailures",
  "prctfaults": "perfaults",
  "pesmaioR3": "PesGtr3years",
  "pesmenoR3": "pesLss3years",
  "pesilegais": "Illegalfeet",
  "pestotals": "Pestotals",
  "pesramleg": "CoolRamada",
  "falhasram": "Ramadafemales",
  "pesfalileg": "Illegalfaults",
  "pesfalleg": "Legalfaults",
  "pescastasnaoaptas": "Pesvarietiesnotsuitable",
  "pessemaramacao": "Feetwithoutwire",
  "armacaoterreno": "armacaoterreno"
};

const ParcelPopulationDetails = {
  "bacelos": "bacon",
  "enxertoS1": "Grafts1year",
  "videiraS2": "Vines2years",
  "videiraS3": "Vines3years",
  "videiraS4A25": "Vines4to25years",
  "videirasmaioR25": "Vines>25years"
};

const ParcelPopulationDetailsSemEnqLegal = {
  "bacelosileg": "bacon",
  "enxertoS1ILEG": "Grafts1year",
  "videiraS2ILEG": "Vines2years",
  "videiraS3ILEG": "Vines3years",
  "videiraS4A25ILEG": "Vines4to25years",
  "videirasmaioR25ILEG": "Vines>25years"
};
const castasInputs = {
  "pcttinta": "Casta tinta",
  "pctbranca": "Casta branca",
  "pctrose": "Casta rose",
  "pctmoscatel": "Casta moscatel"
};


const combolistrequest = {
  "Filters": null,
  "SortBy": "",
  "IsSortTypeDESC": true,
  "IsPagination": false,
  "Page": 2,
  "PageSize": 2
};

const intConst = {
  //"numparc": 1,
  //"geocod": 1,
  "areapotential": 1,
  "areaeffective": 1,
  "areaeqlegal": 1,
  "fatordporto": 1,
  "fatoraptidao": 1,
  "fatorporto": 1,
  "papv": 1,
  "portal": 1,
  "sitdeclar": 1,
  "mcp": 1,
  "legalizavel": 1,
  "pontuacao": 1,
  "idsitparc": 1,
  "anoplantacao": 1,
  "idtpestadovinha": 1,
  "groudFrame": 1,
  "estimatedProduction": 1,
  "codlitigio": 1,
  "idclasseplant": 1,
  "idclasseplant": 1,
  "potentialarea": 1,
  "affectiveArea": 1,
  "areaWithoutEnqNice": 1,
  "doPort": 1,
  "fitnessFactor": 1,
  "factorPortGrapeVarieties": 1,
  "parcelid": 1,
  "fplocalizacao": 1,
  "fpaltitude": 1,
  "fpexposicao": 1,
  "fpinclinacao": 1,
  "fpabrigo": 1,
  "fpnaturterreno": 1,
  "fppedregosidade": 1,
  "fpcastas": 1,
  "fpidadevinha": 1,
  "fpprodutividade": 1,
  "fpcompasso": 1,
  "fparmacao": 1,
  //"compasso": 1,
  "densidade": 1,
  "prctLss3AndFailures": 1,
  "prctfaults": 1,
  "pesmaioR3": 1,
  "pesmenoR3": 1,
  "pesilegais": 1,
  "pestotals": 1,
  "pesramleg": 1,
  "falhasram": 1,
  "pesfalileg": 1,
  "pesfalleg": 1,
  "pescastasnaoaptas": 1,
  "pessemaramacao": 1,
  "type": 1,
  "bacelos": 1,
  "enxertoS1": 1,
  "videiraS2": 1,
  "videiraS3": 1,
  // "vines4Years": 1,
  "videiraS4A25": 1,
  "videirasmaioR25": 1,
  "pcntRedvariety": 1,
  "pcntwhiteVariety": 1,
  "pcntMuscatGrapeVariety": 1,
  "pctmoscatel": 1,
  "pcntRoseVariety": 1,
  "pcttinta": 1,
  "pctbranca": 1,
  "pctmoscatel": 1,
  "pctrose": 1,
  "nrartigo": 1
}

const ReadOnly = {
  'classe': 1,
  'areaeqlegal': 1,
  'areaeffective': 1,
  'areapotential': 1,
  'pestotals': 1,
  'prctfaults': 1,
  'prctLss3AndFailures': 1,
  'densidade': 1,
  'pctbranca': 1,
  'pcttinta': 1,
  'pctrose': 1
}

const createTableModule = ['castaparc', "matrixArticle"]


class WizardFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      datePicker: "",
      parceldata: {},
      ParcelPointFactorsdivs: "",
      parcelSettlementCharacteristicsdivs: "",
      ParcelPopulationDetailsdivs: "",
      ParcelPopulationDetailsSemEnqLegaldivs: "",
      CastasInputs: "",
      sel_nev: "",
      detailPopUp: "",
      stepNumber: 0,
      auditList: [],
      telkikTable: {},
      matrixlist: [],
      busentconcelho: [],
      BusEntFreguesia: [],
      activeIndex: 'step0',
      totalDouro: 0,
      totalPorto: 0,
      legalarray: [],
      levantamento: [],
      completeauditList:{}

    }
  }

  componentDidMount() {

    this.setState({
      data: this.props.Parcel,
      parceldata: this.props.Parcel.parcel ? this.props.Parcel.parcel : {}
    }, () => {
      this.setOtherDetails();
      this.getAuditList()
      if (this.props.Parcel && this.props.Parcel.coddis)
        this.getcodconList(this.props.Parcel.coddis)
      if (this.props.Parcel && this.props.Parcel.codcon)
        this.getcodfrglist(this.props.Parcel.codcon)
    })


  }

  componentDidUpdate(preprop) {
    if (preprop.date !== this.props.date) {
      this.setState({
        data: this.props.Parcel,
        parceldata: this.props.Parcel.parcel ? this.props.Parcel.parcel : {}
      }, () => {
        this.setOtherDetails()
        createTableModule.map((_k, i) => {
          this.createOthersTables(_k)
        })

      })
    }
  }



  getAuditList = async () => {
    if (this.state.auditList.length === 0) {
      let data = combolistrequest
      data['modulename'] = 'parcel'
      if (this.state.parceldata) {
        data['id'] = this.state.parceldata.id
      }
      this.setcompleteAuditlist(data);
      let Auditdata = await services.apiCall.requestApi('/auditlog/getall', data, 'post');
      
      if (Auditdata) {
       
        Auditdata.map((_row, index) => {
          Object.keys(_row).map(function (key) {
            if (key === 'time') {
              _row[key] = moment(_row.date).format('HH:mm:ss')
            } else if (key === 'date') {
              _row[key] = moment(_row.date).format('DD-MM-YYYY')
            }
            _row[Lang.langCheck.langRequest(key)] = _row[key]
            delete _row[key]
            delete _row['NewRecord']
            delete _row['OldRecord']
            delete _row['UserID']
            delete _row['Id']
            delete _row['Tipo']
            delete _row['Utilizador']
          })
        });
        this.setState({
          auditList: Auditdata,
        }, () => this.telrikTable(this.state.auditList, 'audit'))
      }
    }
  }



  createOthersTables = (modulename) => {
    let data = { ...this.state.data }
    let langkey = ""
    if (data) {
      let module = data[modulename];

      if (module) {
        if (!Array.isArray(module)) {
          if (Object.keys(module).length == 0)
            return
          module = [module]
        }
        let telericdata = [];
        let telerikRow = {};
        module.map((_row, index) => (
          telerikRow = {},
          Object.keys(_row).map(function (key) {
            if (key === 'time') {
              _row[key] = moment(_row.date).format('LTS')
            } else if (key === 'date') {
              _row[key] = moment(_row.date).format('DD-MM-YYYY')
            }
            langkey = Lang.langCheck.langRequest(key);
            telerikRow[langkey] = _row[key]
          }),
          telericdata.push(telerikRow)
        ));
        this.telrikTable(telericdata, modulename)
      }
    }
  }

  makerowForTable = (_r) => {
    let row = {}
    Object.keys(_r).map((key) => {
      if (key == "iddtplantacao" || key == "iddtorigem" || key == "tipo" || key == "areaapdouro" || key == "areaapporto" || key == "obs" || key == "predioarranque")
        row[Lang.langCheck.langRequest(key)] = _r[key]
    });
    return row;
  }


  setOtherDetails = () => {
    let ParcelPointFactorsdivs = this.createform(ParcelPointFactors, 'parcel');
    let parcelSettlementCharacteristicsdivs = this.createform(parcelSettlementCharacteristics, 'parcel');
    let ParcelPopulationDetailsdivs = this.createform(ParcelPopulationDetails, 'parcel');
    let ParcelPopulationDetailsSemEnqLegaldivs = this.createform(ParcelPopulationDetailsSemEnqLegal, 'parcel');
    let CastasInputsdivs = this.createform(castasInputs, "parcel");

    let legalarray = [];

    this.state && this.state.data && this.state.data.legalFramework &&
      this.state.data.legalFramework.length > 0 &&
      this.state.data.legalFramework.map((row, index) => {
        legalarray.push(this.makerowForTable(row.legalFrameworks));
      })

    this.setState({
      ParcelPointFactorsdivs: ParcelPointFactorsdivs,
      parcelSettlementCharacteristicsdivs: parcelSettlementCharacteristicsdivs,
      ParcelPopulationDetailsdivs: ParcelPopulationDetailsdivs,
      ParcelPopulationDetailsSemEnqLegaldivs: ParcelPopulationDetailsSemEnqLegaldivs,
      parcelGrapes: CastasInputsdivs,
      legalarray
    }, () => {
      this.calFatordporto(this.state.data)
      this.calFatoraptidao(this.state.data)
      this.legalFrameworkCalculation()
      this.telrikTable(this.state.legalarray, "legalFramework")
    })
  }

  createform = (data, keystring) => {
    let parcel = this.state.data;
    let datafinal = [];
    let type = -1;
    if (data && !Array.isArray(data)) {
      datafinal = [data];
    } else {
      type = 2;
      datafinal = data;
    }

    if (type === -1) {
      let parcelobject = parcel[keystring] ? parcel[keystring] : {};
      return this.createfinalform(datafinal, keystring, type, parcelobject);
    }
    if (type === 2) {
      let parcelobject = parcel[keystring] ? parcel[keystring] : [];
      if (parcelobject.length === 0) {
        parcelobject = datafinal
      }

      return parcelobject.map((_rowdata, index) => (
        this.createfinalform(datafinal, keystring, index, _rowdata)
      ))
    }
  }

  createfinalform = (datafinal, keystring, type, parcelobject) => {
    return datafinal.map((_row, index) => (
      // <form className="parcelforms"  rel={keystring} data={type}>
      //   <div className="row">
      this.makeInputs(_row, parcelobject, keystring, type)
      //   </div>
      // </form>
    ))
  }

  handleSteps = (e, modulename, index) => {
    this.setState({ activeIndex: 'step' + e })
    let key = "idtpestadovinha";
    let value = e;
    let data = { ...this.state.data };
    data[modulename] = data[modulename] ? data[modulename] : {}
    if (index >= 0) {
      data[modulename][index][key] = value;
    } else {
      data[modulename][key] = value;
    }
    this.setState({
      data: data
    }, () => this.props.getcenterformdata(data))
    return true;
  }

  makeInputs = (data, parcelobject, keystring, type) => {
    return Object.keys(data).map((key) => (
      <div className="col-md-3">
        <div className="input-box active-grey">
          {/* <label className="input-label">{data[key]}</label>
                    <input type="text" onChange={(e)=>this.handleChange(e,keystring,type)} className="input-1" placeholder="238" name={key} defaultValue={parcelobject[key]} /> */}
          <Input
            type="text"
            style={{ width: "100%" }}
            readOnly={ReadOnly[key] ? true : false}
            className="input-1"
            name={key}
            value={parcelobject[key] ? parcelobject[key] : ''}
            label={Lang.langCheck.langRequest(`${data[key]}`)}
            onChange={(e) => this.handleChange(e, keystring, type)}
          />
        </div>
      </div>
    ));
  }

  openRightPopup = (modulename, sel_nev = "parcel") => {
    let detailPopUp = '';
    if (modulename === 'Registo') {
      let logLength = this.state.auditList.length
      detailPopUp = (
        <WizardModalForm date={new Date()} all_list={this.props.all_list} handleAuditSubmit={(comment, id) => this.handleAuditSubmit(comment, id)} closePopup={() => this.props.closePopup()} data={this.state.auditList[logLength - 1]} tab={modulename} />
      )
    } else if (modulename === 'legalFramework') {
      detailPopUp = (
        <LegalFrameWorkModal date={new Date()}
          all_list={this.props.all_list}
          getpopUpdata={(data, modulename, index) => this.getpopUpdata(data, modulename, index)}
          getcenterformdata={(data) => this.props.getcenterformdata(data)}
          closePopup={() => this.props.closePopup()}
          data={this.state.data[modulename] || []}
          tab={modulename} />
      )
    } else {
      detailPopUp = (
        <WizardModalForm date={new Date()} parcel={this.state.data} moduledata={this.state.data[modulename] || []} all_list={this.props.all_list} getpopUpdata={(data, modulename, index) => this.getpopUpdata(data, modulename, index)} closePopup={() => this.props.closePopup()} data={{}} tab={modulename} />
      )
    }
    this.setState({
      sel_nev: sel_nev,
      detailPopUp: detailPopUp
    })
  }


  legalFrameworkCalculation = () => {
    let data = { ...this.state.data }
    let totalDouro = 0;
    let totalPorto = 0;
    if (data.legalFramework && data.legalFramework.length > 0) {
      data.legalFramework.map(_r => {
        totalDouro += parseInt(_r.legalFrameworks.areaapdouro);
        totalPorto += parseInt(_r.legalFrameworks.areaapporto);
      })
    }

    this.setState({
      totalDouro,
      totalPorto
    })
  }

  getpopUpdata = (formData, modulename) => {
    let data = { ...this.state.data }
    console.log("SubmitForm ", formData)
    if (modulename == "castaparc") {
      data = this.updatecastaForm(formData, data);
    }
    data[modulename] = formData;
    this.setState({
      data: data
    }, () => this.props.getcenterformdata(data))
    this.props.updatesel_nev(this.state.sel_nev);
  }

  updatecastaForm(formData, data) {
    let castaobject = ["pctbranca", "pcttinta", "pctrose"];
    if (!data['parcel']) {
      data['parcel'] = {}
    }
    castaobject.map((_row, index) => {
      data['parcel'][_row] = 0;
    })

    formData.map((_row, index) => {
      this.props.all_list.Casta.map((_crow, cindex) => {
        if (parseInt(_row.codcasta) === parseInt(_crow.codcasta)) {
          data['parcel'][castaobject[_crow.idcor - 1]] += parseInt(_row.pctcasta);
        }
      })
    })
    return data;
  }

  handleAuditSubmit = async (comment, id) => {
    let data = {
      comment: comment
    }

    let insertRes = await services.apiCall.requestApi(`/auditlog/Comment/${id}`, data, 'post')
    if (insertRes) {
      this.getAuditList()
      this.props.closePopup()
    }
  }

  makeproperarray = (dataarray) => {
    let proper = [];
    dataarray.map((_rowdata, index) => (
      Object.keys(_rowdata).length > 0 &&
      proper.push(_rowdata)
    ))
    return proper
  }

  calDensidade = (value, data) => {
    if (!data['parcel']) {
      data['parcel'] = {}
    }
    data['parcel']['densidade'] = parseInt((10000 / value) * 100);
    return data

  }

  calPrctLss3AndFailures = (value, data) => {
    if (!data['parcel']) {
      data['parcel'] = {}
    }
    data['parcel']['prctLss3AndFailures'] = parseInt((10000 / value) * 100);
    return data
  }

  calPrctfaults = (data) => {
    if (!data['parcel']) {
      data['parcel'] = {}
    }

    if (data.parcel.pesfalleg && data.parcel.pesmaioR3 && data.parcel.pesmenoR3)
      data.parcel['prctfaults'] = parseInt(data.parcel.pesfalleg / (data.parcel.pesfalleg + data.parcel.pesmaioR3 + data.parcel.pesmenoR3) * 100);
    return data
  }

  calPestotals = (data) => {

    if (!data['parcel']) {
      data['parcel'] = {}
    }
    if (data.parcel.pesfalleg && data.parcel.pesmaioR3 && data.parcel.pesmenoR3)
      data.parcel['pestotals'] = (data.parcel.pesmaioR3 + data.parcel.pesmenoR3 + data.parcel.pesfalleg)

    return data
  }


  calAreapotential = (data) => {

    if (!data['parcel']) {
      data['parcel'] = {}
    }
    if (data.parcel.pesfalleg && data.parcel.pesmaioR3 && data.parcel.pesmenoR3 && data.parcel.compasso)
      data.parcel['areapotential'] = parseInt((data.parcel.pesmaioR3 + data.parcel.pesmenoR3 + data.parcel.pesfalleg) * data.parcel.compasso / 100);

    return data
  }

  calAreaeffective = (data) => {

    if (!data['parcel']) {
      data['parcel'] = {}
    }
    if (data.parcel.pesmaioR3 && data.parcel.compasso)
      data.parcel['areaeffective'] = parseInt(data.parcel.pesmaioR3 * data.parcel.compasso / 100);
    data.parcel['areaeqlegal'] = data.parcel['areaeffective'];
    return data
  }

  calFatordporto = (data) => {

    if (!data['legalFramework']) {
      data['legalFramework'] = {}
    }
    if (data.legalFramework.areaapdouro && data.legalFramework.areaapporto)
      data.parcel['fatordporto'] = parseInt((data.legalFramework.areaapdouro + data.legalFramework.areaapporto) / data.legalFramework.areaapporto);
    return data
  }

  calFatoraptidao = (data) => {
    let castasum = 0;
    if (!data['parcel']) {
      data['parcel'] = {}
    }
    if (data.castaparc) {
      data['castaparc'].map((_row, index) => {
        castasum += parseInt(_row.pctcasta)
      });
      data.parcel['fatoraptidao'] = castasum / 100;
    }
    return data
  }

  handleUpdateClasse = (pontuacaoValue, data) => {
    let classe = '';
    if (pontuacaoValue >= 1200) classe = 'A';
    else if (1200 > pontuacaoValue && pontuacaoValue >= 1001) classe = 'B';
    else if (1000 >= pontuacaoValue && pontuacaoValue >= 801) classe = 'C';
    else if (800 >= pontuacaoValue && pontuacaoValue >= 601) classe = 'D';
    else if (600 >= pontuacaoValue && pontuacaoValue >= 401) classe = 'E';
    else if (400 >= pontuacaoValue && pontuacaoValue >= 201) classe = 'F';
    else if (200 >= pontuacaoValue && pontuacaoValue >= 1) classe = 'G';
    else if (0 >= pontuacaoValue && pontuacaoValue >= -200) classe = 'H';

    if (!data['parcel']) {
      data['parcel'] = {}
    }
    data['parcel']['classe'] = classe
    return data
  }


  handleChange = (e, modulename, index) => {
    if(this.props.isEnable(e.target.name)){
      return
    }
    let key = e.target.name;
    let value = e.target.value;
    let data = { ...this.state.data }
    if (key == "coddis") {
      this.getcodconList(value);
    } else if (key == "codcon") {
      this.getcodfrglist(value);
    }
    else if (key === 'pontuacao') {
      data = this.handleUpdateClasse(value, data);
    }
    else if (key === 'compasso') {
      data = this.calDensidade(value, data);
      data = this.calPrctLss3AndFailures(value, data);
    }


    if (intConst[key]) {
      if (value !== "-") {
        value = isNaN(Number(value)) ? "" : Number(value);
      }
    }
    if (index >= 0) {
      data[modulename] = data[modulename] ? data[modulename] : []
    } else {
      data[modulename] = data[modulename] ? data[modulename] : {}
    }

    if (index >= 0) {
      data[modulename][index] = data[modulename][index] ? data[modulename][index] : {}
      data[modulename][index][key] = value;
    } else {
      data[modulename][key] = value;
    }

    if (key === 'pesfalleg' || key === 'pesmaioR3' || key === "pesmenoR3") {
      data = this.calPestotals(data);
      data = this.calPrctfaults(data);

    }
    if (key === 'pesfalleg' || key === 'pesmaioR3' || key === "pesmenoR3" || key === "compasso") {
      data = this.calAreapotential(data);

    }
    if (key === 'pesmaioR3' || key === "compasso") {
      data = this.calAreaeffective(data);

    }

    this.setState({
      data: data
    }, () => this.props.getcenterformdata(data))
    return true;
  }

  getcodconList = async (id) => {
    let busentconcelho = [];
    let res = await services.apiCall.requestApi("/busentconcelho/getbyid/" + id, {}, 'post');
    if (res) {
      busentconcelho = res
    }
    this.setState({
      busentconcelho
    })
  }

  getcodfrglist = async (id) => {
    id = id.split('-');
    console.log(id);
    let BusEntFreguesia = [];
    let res = await services.apiCall.requestApi("/BusEntFreguesia/GetByID/" + id[1], {}, 'get');
    if (res) {
      BusEntFreguesia = res
    }
    this.setState({
      BusEntFreguesia
    })
  }


  handleDatePicker = () => {
    let datePicker = "";

    datePicker = (<DatePicker
      className="form-control"
      size="middle"
      placeholder="Data última vistoria"
      format={dateFormat}
      onChange={this.handleDate}
    />)
    let data = { ...this.state.data }
    let date = "";
    if (data && data.parcel) {
      date = data.parcel.dtultvist;
      if (date) {
        date = moment(date).format(dateFormat);
        datePicker = (<DatePicker
          className="form-control"
          size="middle"
          placeholder="Data última vistoria"
          //  defaultValue={moment("2020-06-01",dateFormat)}
          value={moment(date, dateFormat)}
          format={dateFormat}
          readOnly={this.props.isEnable("dtultvist")}
          onChange={this.handleDate}
        />)
      }
    }
    return datePicker;
  }

  fieldCalculation = () => {
    return 0;
  }

  handleDate = (e) => {
    let data = { ...this.state.data }
    data['parcel'] = data['parcel'] ? data['parcel'] : {}
    data['parcel']['dtultvist'] = e && e._d && moment(e._d).format(dateFormat)
    this.setState({
      data
    })
  }

  handleCheck = (e, modulename, index) => {
    if(this.props.isEnable(e.target.name)){
      return
    }
    let data = { ...this.state.data };
    data[modulename] = data[modulename] ? data[modulename] : {}
    let module = data[modulename];
    let key = e.target.name;

    let value = module[key] ? 0 : 1;
    if (index >= 0) {
      data[modulename][index][key] = value;
    } else {
      data[modulename][key] = value;
    }
    this.setState({
      data: data
    }, () => this.props.getcenterformdata(data))
    return true;
  }

  telrikTable = (data, modulename) => {
    let columnkeyMap = {}
    if (data.length > 0) {
      Object.keys(data[0]).map((_k) => {
        if (modulename === 'matrixArticle') {
          if ((_k == 'Fração' || _k == 'Nº Artigo')) {
            columnkeyMap[_k] = Lang.langCheck.langRequest(_k)
          }
        } else {
          columnkeyMap[_k] = Lang.langCheck.langRequest(_k)
        }
      })
      let columnlist = Object.keys(columnkeyMap).map(function (key) {
        return { field: columnkeyMap[key], columnMenuType: 'checkbox' }
      });
      data.map((row, index) => {
        row.index = index
        row.modulename = modulename
      })
      let actionbuttons = {Delete: true }
      if(modulename == 'audit'){
        actionbuttons = {Popup:true}
      }
     
      let telkikTable = this.state.telkikTable
      telkikTable[modulename] = <Main date={new Date()}  list={data} actionbuttons={actionbuttons} columnlist={columnlist} deleteFunc={(id) => this.deleteFunc(id)} ActionPerform={(action, id) => this.ActionPerform(action, id)} />
      this.setState({
        telkikTable: telkikTable
      })
    }
  }

  deleteFunc = (_row) => {
    console.log("to delete:", _row);
    let data = { ...this.state.data };

    data[_row.modulename].splice(_row.index, 1);
    let telkikTable = { ...this.state.telkikTable }
    telkikTable[_row.modulename] = null;
    if (_row.modulename == "castaparc") {
      data = this.updatecastaForm(data[_row.modulename], data)
    }
    this.props.getcenterformdata(data)
    this.setState({
      data,
      telkikTable
    }, () => this.createOthersTables(_row.modulename))
    return true;
  }

  setcompleteAuditlist=async (data)=>{
    let completeauditList={}
    let Auditdata = await services.apiCall.requestApi('/auditlog/getall', data, 'post');
    // if(Auditdata){
    //   Auditdata.map((_row, index) => {
    //       completeauditList[parseInt(_row.id)]=_row
    //   })
    // }
    this.setState({
      completeauditList:Auditdata
    })
  }

  showRowDeatils = (row) => {
    let completeauditList={...this.state.completeauditList}
    let detailPopUp =(
      <RowDeatils date={new Date()} record={completeauditList[row.index] || {}} />
    )
    this.setState({
      detailPopUp: detailPopUp
    })
  }

  ActionPerform = (action, row) => {
   
    this.showRowDeatils(row);
  }

  calculator=()=>{
    let detailPopUp=(
      <Calculator/>
    )
    this.setState({
      detailPopUp
    })
  }

  render() {

    return (
      <div className="right-section">
        <div className="bg-white middle p20" id="parcel">
          <form className="parcelforms" rel={'parcel'} data={-1}>
            <div className="head">
              <h2>Dados gerais</h2>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="input-box active-grey">
                  <Input
                    style={{ width: "100%" }}
                    className="input-1"
                    name="numparc"
                    value={this.state.parceldata.numparc}
                    label="Nº parcela IVDP"
                    onChange={(e) => this.handleChange(e, 'parcel')}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-box active-grey">
                  <Input
                    style={{ width: "100%" }}
                    className="input-1"
                    name="geocod"
                    value={this.state.parceldata.geocod}
                    readOnly = {this.props.isEnable("geocod")}
                    label="Geocódigo"
                    onChange={(e) => this.handleChange(e, 'parcel')}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-box active-grey">
                  <Input
                    style={{ width: "100%" }}
                    className="input-1"
                    name="numparant"
                    value={this.state.parceldata.numparant}
                    readOnly = {this.props.isEnable("numparant")}
                    label="Nº Parcela CD"
                    onChange={(e) => this.handleChange(e, 'parcel')}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <div className="input-box active-grey">
                    <label className="input-label">Designação</label>
                    <textarea onChange={(e) => this.handleChange(e, 'parcel')} 
                     className="form-control heigh-auto" rows="3"
                    readOnly={this.props.isEnable("desparc")}
                    name="desparc" defaultValue={this.state.parceldata.desparc}></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" onChange={(e) => this.handleCheck(e, 'parcel')} className="custom-control-input" id="customCheck" name="papv" checked={this.state.parceldata.papv} />
                  <label className="custom-control-label" htmlFor="customCheck">papv</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" onChange={(e) => this.handleCheck(e, 'parcel')} className="custom-control-input" id="customCheck1" name="portal" checked={this.state.parceldata.portal} />
                  <label className="custom-control-label" htmlFor="customCheck1">Portal</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" readOnly = {this.props.isEnable("sitdeclar")} onChange={(e) => this.handleCheck(e, 'parcel')} className="custom-control-input" id="customCheck2" name="sitdeclar" checked={this.state.parceldata.sitdeclar} />
                  <label className="custom-control-label" htmlFor="customCheck2">Declaração</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" onChange={(e) => this.handleCheck(e, 'parcel')} className="custom-control-input" id="customCheck3" name="legalizavel" checked={this.state.parceldata.legalizavel} />
                  <label className="custom-control-label" htmlFor="customCheck3">Legalizável</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" onChange={(e) => this.handleCheck(e, 'parcel')} className="custom-control-input" id="customCheck4" name="origemmcp" checked={this.state.parceldata.origemmcp} />
                  <label className="custom-control-label" htmlFor="customCheck4">MCP</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="input-box active-grey drop-down-box">
                  <label className="input-label">Distrito </label>
                  <select className="custome-drop-down" onChange={(e) => this.handleChange(e, 'parcel')} name='coddis' value={this.state.parceldata.coddis} >
                    <option>Selecione Distrito </option>
                    {
                      this.props.all_list.busentdistrito &&
                      this.props.all_list.busentdistrito.map((_row, index) => (
                        <option value={_row.coddis}>{_row.desdis}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-box active-grey drop-down-box">
                  <label className="input-label">Concelho</label>
                  <select className="custome-drop-down" onChange={(e) => this.handleChange(e, 'parcel')} name='codcon' value={this.state.parceldata.codcon}>
                    <option>Selecione Concelho</option>
                    {
                      this.state.busentconcelho &&
                      this.state.busentconcelho.map((_row, index) => (
                        <option value={_row.coddis + "-" + _row.codcon}>{_row.descon}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-box active-grey drop-down-box">
                  <label className="input-label">Freguesia </label>
                  <select className="custome-drop-down" onChange={(e) => this.handleChange(e, 'parcel')} name='codfrg' value={this.state.parceldata.codfrg} >
                    <option>Selecione Freguesia </option>
                    {
                      this.state.BusEntFreguesia &&
                      this.state.BusEntFreguesia.map((_row, index) => (
                        <option value={_row.dicofre}>{_row.desfrg}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="input-box active-grey">
                  <Input
                    type="text"
                    readOnly={true}
                    style={{ width: "100%" }}
                    className="input-1"
                    name="classe"
                    label="Classe"
                    value={this.state.parceldata.classe}
                    onChange={(e) => this.handleChange(e, 'parcel')}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="input-box active-grey">
                  <Input
                    type="text"
                    style={{ width: "100%" }}
                    className="input-1"
                    name="pontuacao"
                    value={this.state.parceldata.pontuacao}
                    label="Pontuação"
                    onChange={(e) => this.handleChange(e, 'parcel')}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-box active-grey mt20">
                  {
                    this.handleDatePicker()

                  }
                </div>
              </div>

            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <div className="input-box active-grey drop-down-box">
                  <label className="input-label">Situação da Parcela</label>
                  <select className="custome-drop-down" onChange={(e) => this.handleChange(e, 'parcel')} name='idsitparc' value={this.state.parceldata.idsitparc}>
                    <option>Selecione Situação da Parcela </option>
                    {
                      this.props.all_list.SitucaoDaParcela &&
                      this.props.all_list.SitucaoDaParcela.map((_row, index) => (
                        <option value={_row.idsitparc}>{_row.dessitparc}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-box active-grey drop-down-box">
                  <label className="input-label">Situação Legal</label>
                  <select className="custome-drop-down" onChange={(e) => this.handleChange(e, 'parcel')} name='idsitleg' value={this.state.parceldata.idsitleg}>
                    <option>Selecione Situação Legal </option>
                    {
                      this.props.all_list.legalPlot &&
                      this.props.all_list.legalPlot.map((_row, index) => (
                        <option value={_row.idsitleg}>{_row.dessitleg}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="progress-box">
                  <div className="title">Estado da vinha</div>
                  <div className="inner-box">
                    <Steps current={this.state.parceldata.idtpestadovinha} onChange={(e) => this.handleSteps(e, 'parcel')} progressDot={customDot}>
                      <Step title="Indefinido" description="" className={this.state.activeIndex} />
                      <Step title="Em decadência" description="" className={this.state.activeIndex} />
                      <Step title="Fraco" description="" className={this.state.activeIndex} />
                      <Step title="Regular" description="" className={this.state.activeIndex} />
                      <Step title="Bom" description="" className={this.state.activeIndex} />
                    </Steps>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-3">
                <div className="input-box active-grey">
                  <Input
                    type="text"
                    style={{ width: "100%" }}
                    className="input-1"
                    name="estimatedProduction"
                    value={this.state.parceldata.estimatedProduction}
                    label="Produção estimada"
                    onChange={(e) => this.handleChange(e, 'parcel')}
                  />
                </div>
              </div>
              <div className="col-md-3 kendo-Input">
                <div className="input-box active-grey drop-down-box">
                  <label className="input-label">Situação de litígio</label>
                  <select className="custome-drop-down" onChange={(e) => this.handleChange(e, 'parcel')} value={this.state.parceldata.codlitigio} name='codlitigio'>
                    <option>Selecione Situação de litígio </option>
                    {
                      this.props.all_list.LitigationSituation &&
                      this.props.all_list.LitigationSituation.map((_row, index) => (
                        <option value={_row.codlitigio}>{_row.deslitigio}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-box active-grey">
                  <Input
                    type="text"
                    style={{ width: "100%" }}
                    className="input-1"
                    name="anoplantacao"
                    value={this.state.parceldata.anoplantacao}
                    label="Ano de plantação"
                    onChange={(e) => this.handleChange(e, 'parcel')}
                  />
                </div>
              </div>
              <div className="col-md-3 kendo-Input">
                <div className="input-box active-grey drop-down-box">
                  <label className="input-label">Classe de Plantação</label>
                  <select className="custome-drop-down" onChange={(e) => this.handleChange(e, 'parcel')} name="idclasseplant" value={this.state.parceldata.idclasseplant}>
                    <option>Selecione Classe de Plantação </option>
                    {
                      this.props.all_list.ClassPlantation &&
                      this.props.all_list.ClassPlantation.map((_row, index) => (
                        <option value={_row.idClassePlant}>{_row.desclassePlant}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-box active-grey">
                  <Input
                    type="text"
                    style={{ width: "100%" }}
                    className="input-1"
                    readOnly={true}
                    name="areapotential"
                    value={this.state.parceldata.areapotential}
                    label="Área potencial"
                    onChange={(e) => this.handleChange(e, 'parcel')}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-box active-grey">

                  <Input
                    type="text"
                    style={{ width: "100%" }}
                    className="input-1"
                    readOnly={true}
                    name="areaeffective"
                    value={this.state.parceldata.areaeffective}
                    label="Área efetiva"
                    onChange={(e) => this.handleChange(e, 'parcel')}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-box active-grey">
                  <Input
                    type="text"
                    style={{ width: "100%" }}
                    className="input-1"
                    readOnly={true}
                    name="areaeqlegal"
                    value={this.state.parceldata.areaeqlegal}
                    label="Área s/ enquadramento legal"
                    onChange={(e) => this.handleChange(e, 'parcel')}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-box active-grey">
                  <Input
                    type="text"
                    style={{ width: "100%" }}
                    className="input-1"
                    name="fatordporto"
                    value={this.state.parceldata.fatordporto}
                    label="Fator D. O. Porto"
                    readOnly={this.props.isEnable("fatordporto")}
                    onChange={(e) => this.handleChange(e, 'parcel')}
                  />
                  {
                    !this.state.parceldata.origemmcp && this.props.isVisiable("btnCalculaDados") && (this.state.parceldata.status=="A" || this.state.parceldata.status=="P" ) &&
                    <span data-toggle="modal" data-target='#left-popup-center'>
                        <img onClick={this.calculator} className="add-pic"
                          style={{height:"inherit"}}
                          src="imgs/calculator.jpeg" />
                    </span>
                  }
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-box active-grey">

                  <Input
                    type="text"
                    style={{ width: "100%" }}
                    className="input-1"
                    name="fatoraptidao"
                    value={this.state.parceldata.fatoraptidao}
                    label="Fator aptidão (Castas)"
                    onChange={(e) => this.handleChange(e, 'parcel')}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-box active-grey">

                  <Input
                    type="text"
                    style={{ width: "100%" }}
                    className="input-1"
                    name="fatorporto"
                    value={this.state.parceldata.fatorporto}
                    label="Fator Porto (Castas)"
                    onChange={(e) => this.handleChange(e, 'parcel')}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" onChange={(e) => this.handleCheck(e, 'parcel')} className="custom-control-input" id="customCheck5" name="ignorvalid" checked={this.state.parceldata.ignorvalid} />
                  <label className="custom-control-label" for="customCheck5">Ignorar validação</label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" onChange={(e) => this.handleCheck(e, 'parcel')} className="custom-control-input" id="customCheck6" name="areaprojectada" checked={this.state.parceldata.areaprojectada} />
                  <label className="custom-control-label" for="customCheck6">Área Projetada</label>
                </div>
              </div>

            </div>

          </form>

        </div>
        <div className="bg-white middle p20 mt-140 position-relative">
          <span onClick={this.fieldCalculation} className="add-pic">
            <img src="imgs/pic-icon.png" />
            </span>
          <div className="head">
            <h2 id="parcelPointFactors">Fatores de pontuação</h2>
          </div>
          <div className="row">
            {this.state.ParcelPointFactorsdivs}
          </div>
        </div>

        <div className="bg-white middle p20 mt-140" id="link3">
          <div className="head">
            <h2 id="parcelSettlementCharacteristics">Caraterísticas do Povoamento</h2>
          </div>
          <div className="row">
            {this.state.parcelSettlementCharacteristicsdivs}
          </div>
        </div>

        <div className="bg-white middle p20 mt-140" id="link3">
          <div className="head">
            <h2 id="parcelPopulationDetails"> Detalhes do povoamento</h2>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="heading1"><label className="m-0">Legal</label></div>
            </div>
            {this.state.ParcelPopulationDetailsdivs}

            <div className="col-md-12">
              <div className="heading1"><label className="m-0">Sem enq. legal</label></div>

            </div>
            {this.state.ParcelPopulationDetailsSemEnqLegaldivs}
          </div>
        </div>


        <div className="bg-white middle p20 mt-140 position-relative" id="link4">
          <a href="#" data-toggle="modal" data-target='#left-popup-center' onClick={() => this.openRightPopup("castaparc")} className="add-plus"><i className="fas fa-plus"></i></a>
          <div className="head">
            <h2 id="Castas">Castas</h2>
          </div>
          <div className="row">
            {this.state.parcelGrapes}
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive table-section inner-table">
                {
                  this.state.telkikTable.castaparc
                }
              </div>
            </div>
          </div>

        </div>
        <div className="bg-white middle p20 mt-140 position-relative" id="link4">
          <a href="#" data-toggle="modal" data-target='#left-popup-center' onClick={() => this.openRightPopup("matrixArticle")} className="add-plus"><i className="fas fa-plus"></i></a>
          <div className="head">
            <h2 id="matrixArticle"> Artigo Matricial</h2>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive table-section inner-table">
                {
                  this.state.telkikTable.matrixArticle ?
                    this.state.telkikTable.matrixArticle :
                    <p>Sem dados associados</p>

                }
              </div>
            </div>
          </div>

        </div>
        <div className="bg-white middle p20 mt-140 position-relative" id="link4">
          <a href="#" data-toggle="modal" data-target='#left-popup-center' onClick={() => this.openRightPopup("legalFramework")} className="add-plus"><i className="fas fa-plus"></i></a>

          <div className="head">
            <h2 id="Enquadramento"> Enquadramento legal</h2>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-between">
                <div className="font-400">Total Direitos Aplicados</div>
                {/* <div>4000</div> */}
              </div>
              <div className="progress">
                <Progress percent={this.state.totalPorto} status="active" />
              </div>
              <div className="d-flex justify-content-between mt-4">
                <div className="font-500">Area Sem Direitos Aplicados/Enquadrados</div>
                {/* <div>4000</div> */}
              </div>
              <div className="progress mb-4">
                <Progress percent={this.state.totalPorto / this.state.totalDouro} status="active" />
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">{

              this.state.telkikTable.legalFramework
            }

            </div>
          </div>
        </div>
        {
          this.state.parceldata.numparc &&
          <div className="bg-white middle p20 mt-140 position-relative" id="link4">
            <div className="head">
              <h2 id="Registo"> Registo de alterações</h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive table-section inner-table">
                  {
                    this.state.telkikTable.audit
                  }
                </div>
              </div>
            </div>
          </div>
        }
        <div className="modal left-popup" id="left-popup-center">
          <div className="modal-dialog modal-lg">
            {this.state.detailPopUp}
          </div>
        </div>
      </div>
    )
  }
}


export default WizardFormComponent;