import axios from 'axios'
import { toast } from 'react-toastify';
import $ from 'jquery'
import Response from './locale/res.json'


//axios.defaults.baseURL = 'http://10.0.4.62:91/api';
//axios.defaults.baseURL = 'https://10.0.4.62:97/api';
//axios.defaults.baseURL = "https://apiivpd.yiipro.com/api"; 
// axios.defaults.baseURL   = "https://ivdp.yiipro.com/api/api";
//axios.defaults.baseURL = 'https://ivdpapi.azurewebsites.net/api';
axios.defaults.baseURL = "http://ivdp.ambisig.com/api/api";
let count_process = 0;

$(document).ready(function () {
    $(document).on("click", ".k-i-more-vertical", function () {
        var html = $(".k-animation-container-relative").html();
        $(".k-columnmenu-item").html('<span className="k-icon k-i-filter"></span>Filtro');
        $(".k-columnmenu-actions").find(".k-button").text("Limpar Filtros");
        $(".k-columnmenu-actions").find(".k-primary").text("Filtrar");
        $(".k-animation-container-relative").css("z-index", "99999")
    })



    $(document).on('click', '.parcelEntityFilter', function () {
        $(".ant-select-dropdown").addClass("parcelEntityFilter");
        $(".ant-select-dropdown-placement-bottomLeft").addClass("parcelEntityFilter");
    });

    $(document).on('click', '.dropdown-menu', function () {
        $(this).removeClass("show");
    });


    function checkAlllabel() {
        $(".input-label").each(function () {
            var label = $(this);
            var placeholder = label.text();

            var input = $(label).closest("div").find("input").attr("placeholder", placeholder);
            if (input == undefined)
                var input = $(label).closest("div").find("select").attr("placeholder", placeholder);

            if ($(input).val() == "") {
                $(this).addClass('hidden');
            } else {
                $(this).removeClass('hidden');
            }
        });
    }
    checkAlllabel();

    $(document).on('click', '.outer-space', function () {
        // $('#parcelEntityFilter').focus()
    });
    // $(document).on('click','input',function(){
    //    let label = $(this).closest('.input-label')
    //    var placeholder = label.text();
    //    label.removeClass('hidden');
    //     $(this).attr('placeholder','')
    // });
})


const money = {
    format: (amount, decimalCount = 2, decimal = ",", thousands = ".") => {
        try {
            amount = parseFloat(amount);
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
            const negativeSign = amount < 0 ? "-" : "";
            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;
            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "") + " €";

        } catch (e) {
            console.log(e)
            return amount
        }
    }
}

const EntityList = {

    getEntityList: async (modulename, filter = null, nif = null) => {

        let data = {
            modulename: modulename,
            SortBy: 'nome',
            IsSortTypeDESC: false,
            IsPagination: true,
            Page: 1,
            PageSize: 40,
            Filters: {
                searchString: filter ? filter : null,
                searchStringNIF: nif ? nif : null
            }
        }

        console.log("FIILTER", data)
        let res = await apiCall.requestApi('/Entity/GetAll', data, 'post');
        if (res) {
            let entity_row = {}
            res.map((r) => {
                entity_row[r.nif] = r
            })
            return {
                entityList: res,
                entity_row: entity_row
            }
        }
    }
}

const checkAlllabelall = () => {
    $(".input-label").each(function () {
        var label = $(this);
        var placeholder = label.text();

        var input = $(label).closest("div").find("input").attr("placeholder", placeholder);
        if (input == undefined)
            var input = $(label).closest("div").find("select").attr("placeholder", placeholder);

        if ($(input).val() == "") {
            $(this).addClass('hidden');
        } else {
            $(this).removeClass('hidden');
        }
    });
}

var deleted = 0;
const startguoupsum = () => {
    if (deleted == 0) {
        var cross = $(".k-i-group-delete").first()
        $(cross).trigger('click');
        deleted = 1;
    }
}

const startguoup = {
    onedelete: () => {
        startguoupsum();
    }
}

const lablecheck = {
    setlable: () => {
        checkAlllabelall();
    }
}

const appHeader = () => {
    const authorizeToken = window.localStorage.getItem('token')
    const headers = {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + authorizeToken
    };
    return headers;
}

const errorCheck = {
    error: (data) => {
        handleError(data)
    }
}

const handleError = (data) => {
    console.log("error", data)
    let object;
    let foundelement = false;
    $('.errormess').remove();
    $.each(data.errors, function (key, value) {
        object = null
        key = key.replace("$.", "");
        if ($('select[name=' + key + ']').length)
            object = $('select[name=' + key + ']');
        else if ($('textarea[name=' + key + ']').length)
            object = $('textarea[name=' + key + ']');
        else
            object = $('input[name=' + key + ']');

        if (key === 'DOB') {
            object = $('.ant-picker').parent('div');
        }
        if (object !== null) {
            foundelement = true;
        }
        object.addClass('errorRed');
        if ($(object).closest('span').find(".k-label").text()) {
            value[0] = $(object).closest('span').find(".k-label").text() + " É necessário"
        }
        object.after("<span className='errormess' style='width:100%; color:red'>" + value[0] + " </span>")
    });
    // if (data.errors.Message) {
    //     // toast.error(data.errors.Message[0]);
    // }
}

$('body').on('click', '.errorRed', function () {
    $(this).next('.errormess').remove();
    $(this).removeClass('errorRed');
})

const getResObject = {
    get: (url) => {
        let res = Response[url]
        if (res) {
            return res;
        }
        return [];
    }
}

const apiCall = {
    requestApi: async (url, data, method = 'post') => {
        try {
            console.log(count_process + "+++++++" + url);
            count_process++;
            $(".Display_loadiing").show();
            if (window.localStorage.getItem('vpn') == 0) {
                let res = Response[url]
                count_process--;
                console.log(count_process + "....." + url);
                if (count_process <= 0) {
                    count_process = 0;
                    $(".Display_loadiing").hide();
                }
                if (res) {
                    console.log("res", url, res.length)
                    window.localStorage.setItem('table_total', 1000);
                    return res;
                }
                return [];
            } else if (url === "allservice/DouroPort") {
                let res = Response[url];
                count_process--;
                console.log(count_process + "....." + url);
                if (count_process <= 0) {
                    count_process = 0;
                    $(".Display_loadiing").hide();
                }
                if (res) {
                    return res;
                }
            }
            var response = [];
            if (method == 'post') {
                response = await axios.post(`${url}`, data,
                    { headers: appHeader() });

            } else if (method == 'get') {
                let params = new URLSearchParams(data).toString();
                if (params == "") {
                    response = await axios.get(`${url}`,
                        { headers: appHeader() });
                } else
                    response = await axios.get(`${url}?` + params,
                        { headers: appHeader() });
            }

            count_process--;
            console.log(count_process + "....." + url);
            if (count_process <= 0) {
                count_process = 0;
                $(".Display_loadiing").hide();
            }

            if (response.data.success === true) {

                if (response.data.data) {
                    if (response.data.pagination) {
                        window.localStorage.setItem('table_total', response.data.pagination.total);
                    }
                    return response.data.data;
                } else {
                    toast.success(response.data.message)
                    if (response.pagination) {
                        window.localStorage.setItem('table_total', response.pagination.total);
                    }
                    return response.data
                }
            } else {
                if ($.trim(response.data.message) != "")
                    toast.error(`${response.data.message}`)
                if (response.error.response != "")
                    toast.error(`${response.error.response}`)
            }
        } catch (error) {
            count_process--;
            console.log(count_process + "....." + url);
            if (count_process <= 0) {
                count_process = 0;
                $(".Display_loadiing").hide();
            }
            if (error.response) {
                console.log("err", error.response)
                error.response &&
                    handleError(error.response.data)
                if (error.response.statusText == "Unauthorized") {
                    window.localStorage.removeItem('token');
                    window.location = "/"
                }
            }
        }
    },
}


const getvaluewithtype = (val) => {
    if ($.isNumeric(val)) {
        return Number(val);
    }
    else
        return val
}

const getAllFilters = {
    addBoth: (customfilters, tlkfilter, columnkeyMap, data, booleankeys = {}, filters = {}, entityFilter = {}) => {

        Object.keys(columnkeyMap).map((key) => {
            key = key.toLowerCase();
            filters[key] = null;
            if (!booleankeys[key]) {
                filters[key + "multiple"] = null;
                filters[key + "like"] = null;
            }
        })
        customfilters.filterCheckbox &&
            Object.keys(customfilters.filterCheckbox).map(function (key) {
                filters[entityFilter[key]] = customfilters.filterCheckbox[key]
            })
        customfilters.filters &&
            Object.keys(customfilters.filters).map(function (key) {
                filters[(key).toLowerCase() + "like"] = customfilters.filters[key]
            })

        if (tlkfilter.filter && tlkfilter.filter.filters && tlkfilter.filter.filters.length > 0) {
            let columnkeyMaprev = {};
            for (var key in columnkeyMap) {
                columnkeyMaprev[columnkeyMap[key]] = key;
            }
            let tkkey = "";
            let tkkeyvalues = [];
            tlkfilter.filter.filters.map((_row, i) => {
                tkkey = "";
                tkkeyvalues = []
                if (_row.filters && _row.filters.length > 0) {
                    _row.filters.map((_srow, k) => {
                        tkkey = _srow.field;
                        tkkeyvalues.push(getvaluewithtype(_srow.value))
                    })
                    tkkey = columnkeyMaprev[tkkey];
                    tkkey = tkkey.toLowerCase();

                    if (tkkeyvalues.length === 1) {
                        filters[tkkey] = tkkeyvalues[0];
                    } else {
                        filters[tkkey + "multiple"] = tkkeyvalues
                    }
                }
            })
        }
        if (tlkfilter && tlkfilter.sort && tlkfilter.sort.length > 0) {
            data.SortBy = tlkfilter.sort[0].field;
            data.IsSortTypeDESC = (tlkfilter.sort[0].dir == "asc") ? false : true;
            data.Page = tlkfilter.skip ? (tlkfilter.skip / tlkfilter.take + 1) : 1;
            data.PageSize = tlkfilter.take ? tlkfilter.take : 100;
        }
        data.Filters = filters;
        return data;
    }
}

export default {
    apiCall, lablecheck, startguoup, errorCheck, getResObject, EntityList, getAllFilters, money
}