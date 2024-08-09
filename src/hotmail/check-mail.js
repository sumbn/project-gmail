/* eslint-disable @typescript-eslint/no-var-requires */

const Imap = require('imap');
const { simpleParser } = require('mailparser');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const imapConfig = {
  user: 'LucyRichardsGa4e@hotmail.com',
  password: 'Huanmail123', // Sử dụng mật khẩu ứng dụng tại đây
  host: 'imap-mail.outlook.com',
  port: 993,
  tls: true,
};

const getEmails = () => {
  return new Promise((resolve, reject) => {
    try {
      const mesRes = [];
      const imap = new Imap(imapConfig);
      imap.once('ready', () => {
        imap.openBox('INBOX', false, () => {
          imap.search(['UNSEEN', ['SINCE', new Date()]], (err, ress) => {
            if (err) return reject(err);
            const f = imap.fetch(ress, { bodies: '' });
            f.on('message', (msg) => {
              msg.on('body', (stream) => {
                simpleParser(stream, async (err, parsed) => {
                  if (err) return reject(err);
                  // console.log('--------------------------');
                  // console.log(`From: ${parsed.from.text} --> ${parsed.text}`);
                  mesRes.push(parsed.text);
                });
              });

              // msg.once('attribute', (attr) => {
              //   const { uid } = attr;
              //   imap.addFlags(uid, ['\\Seen'], () => {
              //     console.log('marked as read');
              //   });
              // });
            });

            f.once('error', (ex) => {
              return reject(ex);
            });

            f.once('end', () => {
              console.log('Done fetching all messages');
              imap.end();
            });
          });
        });
      });

      imap.once('error', (err) => {
        return reject(err);
      });

      imap.once('end', () => {
        resolve(mesRes);
        console.log('connected end');
      });

      imap.connect();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = getEmails;
