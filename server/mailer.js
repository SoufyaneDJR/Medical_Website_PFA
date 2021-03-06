const nodemailer = require("nodemailer")
const mysql = require('mysql');

var connection = mysql.createConnection({
    user: 'root',
    password: 'soufyane',
    database: 'PFA'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'MAIL',
        pass: "PASSWORD"
    },
    tls: {
        regectUnauthorized: false
    }
});
const link = "localhost:3000/Tracker"
function getDateFromHours(time) {
    time = time.split(':');
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
}

function sort_time(a, b) {
    let freq1 = getDateFromHours(a.frequency);
    let freq2 = getDateFromHours(b.frequency);
    if (+freq1 < +freq2) return -1;
    if (+freq1 > +freq2) return 1;
    return 0;
}


let sql = `SELECT * FROM TRACKER`;
setInterval(() => {
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('error at SELECT: ' + err.stack);
            return;
        }

        let selected_data = Object.values(JSON.parse(JSON.stringify(results)));

        // SORTING SELECT_DATA WITH FREQUENCY IN ORDER TO PROCESS THEM
        selected_data.sort(sort_time);
        //PROCESSING EVERY ROW OF THE TABLE
        for (const row of selected_data) {
            let today = new Date();
            let firstday = new Date(`${row.firstday}`);
            let lastday = new Date(`${row.lastday}`);

            // DELETE ROW IF FIRST DAY > LAST DAY  OR TODAY > LAST DAY
            if (+firstday > +lastday || +today > +lastday) {
                let deletesql = `DELETE FROM TRACKER WHERE id = ${row.id}`
                connection.query(deletesql, (err, result) => {
                    if (err) {
                        console.error('error at Delete ' + err.stack);
                        return;
                    }
                })
            }

            let time = getDateFromHours(row.frequency);


            // NEGLECT ROW IF FREQUENCY < ACTUAL TIME
            if (+time < +today) {
                continue;
            }

            // PROCESS AVAILABLE ROWS
            if (+time >= +today && row.reminder ==="1") {
                // GET MAIL OF THE USER TO SEND HIM AN EMAIL;
                let getemail = `SELECT email FROM USERS WHERE username = (SELECT username FROM TRACKER WHERE id = ${row.id});`
                console.log(getemail)
                connection.query(getemail, (err, resu) => {
                    let email = Object.values(JSON.parse(JSON.stringify(resu)))[0].email;
                    console.log(email)
                    let mailOption = {
                        from: '"Health Up Services" <pfahealthup@gmail.com>',
                        to: `${email}`,
                        subject: `Alert : Time to take ${row.drugname}`,
                        html: `
                        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                        <head></head>
                          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <meta name="x-apple-disable-message-reformatting">
                          <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
                          <title></title>
                          
                            <style type="text/css">
                              table, td { color: #000000; } a { color: #236fa1; text-decoration: underline; }
                        @media only screen and (min-width: 620px) {
                          .u-row {
                            width: 600px !important;
                          }
                          .u-row .u-col {
                            vertical-align: top;
                          }
                        
                          .u-row .u-col-100 {
                            width: 600px !important;
                          }
                        
                        }
                        
                        @media (max-width: 620px) {
                          .u-row-container {
                            max-width: 100% !important;
                            padding-left: 0px !important;
                            padding-right: 0px !important;
                          }
                          .u-row .u-col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                          }
                          .u-row {
                            width: calc(100% - 40px) !important;
                          }
                          .u-col {
                            width: 100% !important;
                          }
                          .u-col > div {
                            margin: 0 auto;
                          }
                        }
                        body {
                          margin: 0;
                          padding: 0;
                        }
                        
                        table,
                        tr,
                        td {
                          vertical-align: top;
                          border-collapse: collapse;
                        }
                        
                        p {
                          margin: 0;
                        }
                        
                        .ie-container table,
                        .mso-container table {
                          table-layout: fixed;
                        }
                        
                        * {
                          line-height: inherit;
                        }
                        
                        a[x-apple-data-detectors='true'] {
                          color: inherit !important;
                          text-decoration: none !important;
                        }
                        
                        </style>
                          
                          
                        
                        <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
                        
                        </head>
                        
                        <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
                          <!--[if IE]><div class="ie-container"><![endif]-->
                          <!--[if mso]><div class="mso-container"><![endif]-->
                          <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
                          <tbody>
                          <tr style="vertical-align: top">
                            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
                            
                        
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                          <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #11959c;">
                            <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #11959c;"><![endif]-->
                              
                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                          <div style="width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
                          
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px;font-family:'Montserrat',sans-serif;" align="left">
                                
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="padding-right: 0px;padding-left: 0px;" align="center">
                              
                            <img align="center" border="0" src="https://i.ibb.co/jMZM5rB/healthup.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 32%;max-width: 185.6px;" width="185.6"/>
                              
                            </td>
                          </tr>
                        </table>
                        
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                          </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                          </div>
                        </div>
                        
                        
                        
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                          <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e8eced;">
                            <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e8eced;"><![endif]-->
                              
                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                          <div style="width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
                          
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:44px 10px 10px;font-family:'Montserrat',sans-serif;" align="left">
                                
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="padding-right: 0px;padding-left: 0px;" align="center">
                              
                            <img align="center" border="0" src="https://i.ibb.co/mcyqk2H/stopwatch.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 26%;max-width: 150.8px;" width="150.8"/>
                              
                            </td>
                          </tr>
                        </table>
                        
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
                                
                          <div style="color: #34495e; line-height: 140%; text-align: center; word-wrap: break-word;">
                            <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 26px; line-height: 36.4px;"><strong><span style="line-height: 36.4px; font-size: 26px;">It is time To take :${row.drugname}</span></strong></span></p>
                          </div>
                        
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 33px;font-family:'Montserrat',sans-serif;" align="left">
                                
                          <div style="color: #686d6d; line-height: 210%; text-align: center; word-wrap: break-word;">
                            <p style="font-size: 14px; line-height: 210%;"><span style="font-size: 16px; line-height: 33.6px;">Dear ${row.username}</span></p>
                        <p style="font-size: 14px; line-height: 210%;">Please Consider Taking ${row.drugname}, Your set timer is at ${row.frequency}</p>
                          </div>
                        
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:22px 10px 44px;font-family:'Montserrat',sans-serif;" align="left">
                                
                        <div align="center">
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td style="font-family:'Montserrat',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/Tracker" style="height:49px; v-text-anchor:middle; width:175px;" arcsize="8%" stroke="f" fillcolor="#ffb200"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;"><![endif]-->
                            <a href='${link}' target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #ffb200; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                              <span style="display:block;padding:15px 33px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">View Tracker</span></strong></span></span>
                            </a>
                          <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                        </div>
                        
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                          </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                          </div>
                        </div>
                        
                        
                        
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                          <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
                              
                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                          <div style="width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
                          
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:44px 10px 10px;font-family:'Montserrat',sans-serif;" align="left">
                                
                          <div style="line-height: 140%; text-align: center; word-wrap: break-word;">
                            <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 20px; line-height: 28px;"><strong><span style="line-height: 28px; font-size: 20px;">Information About Tracker</span></strong></span></p>
                          </div>
                        
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 33px 10px;font-family:'Montserrat',sans-serif;" align="left">
                                
                          <div style="color: #686d6d; line-height: 210%; text-align: center; word-wrap: break-word;">
                            <ul>
                        <li style="font-size: 14px; line-height: 29.4px; text-align: left;"><strong>Drug Name : ${row.drugname}</strong></li>
                        <li style="font-size: 14px; line-height: 29.4px; text-align: left;"><strong>First Day : ${(new Date(row.firstday)).toDateString()}</strong></li>
                        <li style="font-size: 14px; line-height: 29.4px; text-align: left;"><strong>Last Day : ${(new Date(row.lastday)).toDateString()}</strong></li>
                        <li style="font-size: 14px; line-height: 29.4px; text-align: left;"><strong>Frequency : ${row.frequency}</strong></li>
                        <li style="font-size: 14px; line-height: 29.4px; text-align: left;"><strong>Notes : ${row.note}</strong></li>

                        </ul>
                          </div>
                        
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:22px 10px 44px;font-family:'Montserrat',sans-serif;" align="left">
                                
                        <div align="center">
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td style="font-family:'Montserrat',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/Search" style="height:47px; v-text-anchor:middle; width:195px;" arcsize="8.5%" stroke="f" fillcolor="#ffb200"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;"><![endif]-->
                            <a href="http://localhost:3000/Search" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #ffb200; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                              <span style="display:block;padding:15px 33px;line-height:120%;"><strong>Drug Information</strong></span>
                            </a>
                          <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                        </div>
                        
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                          </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                          </div>
                        </div>
                        
                        
                        
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                          <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #009fa6;">
                            <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #009fa6;"><![endif]-->
                              
                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                          <div style="width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
                          
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:44px 44px 10px;font-family:'Montserrat',sans-serif;" align="left">
                                
                          <div style="color: #d5fcff; line-height: 140%; text-align: center; word-wrap: break-word;">
                            <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 24px; line-height: 33.6px;"><strong><span style="line-height: 33.6px; font-size: 24px;">Thanks For Using Our Service </span></strong></span></p>
                          </div>
                        
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:22px 10px 44px;font-family:'Montserrat',sans-serif;" align="left">
                                
                        <div align="center">
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td style="font-family:'Montserrat',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000" style="height:49px; v-text-anchor:middle; width:217px;" arcsize="8%" stroke="f" fillcolor="#0f7d81"><w:anchorlock/><center style="color:#c5d5d6;font-family:'Montserrat',sans-serif;"><![endif]-->
                            <a href="http://localhost:3000" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #c5d5d6; background-color: #0f7d81; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                              <span style="display:block;padding:15px 33px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><span style="line-height: 19.2px; font-size: 16px;">Health Up Website</span></span></span>
                            </a>
                          <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                        </div>
                        
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                          </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                          </div>
                        </div>
                        
                        
                            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                          </tbody>
                          </table>
                          <!--[if mso]></div><![endif]-->
                          <!--[if IE]></div><![endif]-->
                        </body>
                        
                        </html>                  
                        `
                    }

                    
                    let gap = time.getTime() - today.getTime();
                    console.log(gap)
                    setTimeout(() => {
                        console.log(row.id)
                        transporter.sendMail(mailOption, (err, info) => {
                            console.log(info.messageId);
                            if (err) {
                                return console.log(err);
                            }
                        });
                    }, gap);
                })
            }
        }
    })
}, 60000)
