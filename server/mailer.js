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
        user: 'pfahealthup@gmail.com',
        pass: 'healthup123/'
    },
    tls: {
        regectUnauthorized: false
    }
});

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
                
                connection.query(getemail, (err, resu) => {

                    let email = Object.values(JSON.parse(JSON.stringify(resu)))[0].email;

                    let mailOption = {
                        from: '"Health Up Services" <pfahealthup@gmail.com>',
                        to: `${email}`,
                        subject: `Alert : Time to take ${row.drugname}`,
                        text: `Hello ${row.username} ! \n
                        
                        it is time to take ${row.drugname} \n
                        - Time : ${row.frequency}\n\n
                        - First Day : ${(new Date(row.firstday)).toDateString()}\n
                        - Last Day : ${(new Date(row.lastday)).toDateString()}\n\n\n
                        
                        Thanks For Using our Service\n
                        Sincerely, HEALTH UP\n`,
                        html: `
                        <h1>Hello ${row.username} !</h1> \n
                        
                        <h3>It is time to take ${row.drugname} </h3> \n
                        <p>- Time : ${row.frequency}\n\n</p>
                        <p>- First Day :${(new Date(row.firstday)).toDateString()}\n</p>
                        <p>- Last Day : ${(new Date(row.lastday)).toDateString()}\n\n\n </p>
                        
                        <h4>Thanks For Using our Service </h4>
                        <h4>Sincerely, HEALTH UP\n </h4>`
                    }

                    let gap = time.getTime() - today.getTime();
                    setTimeout(() => {
                        transporter.sendMail(mailOption, (err, info) => {
                            console.log('mail sent : %s', info.message.Id);
                            if (err) {
                                return console.log(err);
                            }
                        });
                    }, gap);
                })
            }
        }
    })
}, 1000)