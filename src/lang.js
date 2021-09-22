import Lang from './lang/lang.json'
import services from './services'
const fs = require('fs');
const request ={
        "Filters":null,
        "SortBy":"",
        "IsSortTypeDESC":true,
        "IsPagination":false,
        "Page":2,
        "PageSize":2        
    };

const getJSON = {

    getJSONFile : async () => {
        let data = await services.apiCall.requestApi('language/GetAll',request,'post')
       handleSaveToPC(data);
    }
}
const handleSaveToPC = (jsonData) => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], {type: "text/application-json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'lang.json';
    link.href = url;
//    link.click();
  }

const langCheck = {
    langRequest : (keys) => {
        if(!keys){
            return keys;
        }
        if(!keys[0]){
            return keys;
        }
        let key = keys[0].toUpperCase() + keys.slice(1)
        if(Lang[key]){
            return (Lang[key])
        }else{
            return (key)
        }
    }
}

export default {langCheck,getJSON};