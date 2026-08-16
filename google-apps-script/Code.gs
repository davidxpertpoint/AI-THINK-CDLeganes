const SHEET_ID = '166XOevyJttoQlQbLqqmT3e30nk_2kCIJyxxKP6-9O0U';
const SHEET_NAME = 'Votes';
const MAX_VOTES_PER_IP = 2;

function doGet(){return json({ok:true,service:'AI T.H.I.N.K. votes'});}

function doPost(e){
  try{
    const book=SpreadsheetApp.openById(SHEET_ID);
    const sheet=book.getSheetByName(SHEET_NAME)||book.insertSheet(SHEET_NAME);
    const headers=['timestamp','idea','rating','ip_hash','country','city','name','email','message'];
    if(sheet.getLastRow()===0)sheet.appendRow(headers);else sheet.getRange(1,1,1,headers.length).setValues([headers]);
    const data=JSON.parse((e&&e.postData&&e.postData.contents)||'{}');
    const ip=String(data.client_ip||'').trim();
    if(!ip)return json({ok:false,message:'No se pudo verificar tu conexi\u00f3n. Int\u00e9ntalo de nuevo.'});
    const idea=String(data.idea||'').trim();
    if(!idea)return json({ok:false,message:'No se pudo identificar la idea votada.'});
    const ipHash=hashIp(ip);
    const rows=sheet.getLastRow()>1?sheet.getRange(2,2,sheet.getLastRow()-1,3).getValues():[];
    const previous=rows.filter(function(row){return String(row[0])===idea&&String(row[2])===ipHash}).length;
    if(previous>=MAX_VOTES_PER_IP)return json({ok:false,blocked:true,message:'Ya has utilizado tus 2 votos para esta idea. Puedes votar en las demás propuestas.'});
    sheet.appendRow([new Date(),idea,data.valor||data.rating||'',ipHash,data.country||'',data.city||'',data.nombre||'',data.email||'',data.mensaje||'']);
    return json({ok:true,remaining:MAX_VOTES_PER_IP-previous-1});
  }catch(error){return json({ok:false,message:'No se pudo guardar el voto. Int\u00e9ntalo de nuevo.'});}
}

function hashIp(ip){
  const salt=PropertiesService.getScriptProperties().getProperty('IP_HASH_SALT')||'change-this-private-salt';
  const bytes=Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,ip+salt);
  return bytes.map(function(byte){return ('0'+(byte<0?byte+256:byte).toString(16)).slice(-2)}).join('');
}

function json(value){return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);}
