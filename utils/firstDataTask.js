var obj = {
    data: "JOHN0000MICHAEL0009994567"
};

function spitDetails(toExtract, ver) {
    var requestedVal = null;

    switch (toExtract) {
        case 'fstStr':
            requestedVal = function extFstStr(reqData) {
                for (let idx = 0; idx < reqData.length; idx++) {
                    if (reqData.substring(idx, 4) === '0'.repeat(4)) {
                        if (ver === 'v1') {
                            return reqData.substring(0, idx);
                        } else if (ver === 'v2') {
                            return reqData.split('000')[0];
                        }
                    }
                }
            }
            break;
        case 'scndStr':
            requestedVal = function extscndStr(reqData, strIdx) {
                for (let idx = strIdx; idx < reqData.length; idx++) {
                    if (reqData.substr(idx, 3) === '0'.repeat(3)) {
                        if (ver === 'v1') {
                            return reqData.substring(strIdx, idx + 3);
                        } else if (ver === 'v2') {
                            return reqData.split('000')[1].substr(1);
                        }
                    }
                }
            }
            break;

        default:
            requestedVal = function extRemainStr(reqData, strIdx) {
                const splitData = reqData.split('000');

                if (ver === 'v1') {
                    return reqData.substring(strIdx);
                } else if (ver === 'v2') {
                    return `${splitData[2].substr(0, 3)}-${splitData[2].substr(3)}`;
                }

            }
            break;
    }
    return requestedVal;
}

function respFormatter(inpData, vers) {
    var resp = {};
    const fName = spitDetails('fstStr', vers)(inpData);
    const lName = spitDetails('scndStr', vers)(inpData, fName.length);
    const clId = spitDetails(null, vers)(inpData, fName.concat(lName).length);

    resp.firstName = fName;
    resp.lastName = lName;
    resp.clientId = clId;

    return resp;
}

module.exports = respFormatter;
// respFormatter(obj.data, 'v2');