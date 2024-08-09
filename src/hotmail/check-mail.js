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
  try {
    const imap = new Imap(imapConfig);
    imap.once('ready', () => {
      imap.openBox('INBOX', false, () => {
        imap.search(['UNSEEN', ['SINCE', new Date()]], (err, ress) => {
          const f = imap.fetch(ress, { bodies: '' });
          console.log(err);
          f.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, async (err, parsed) => {
                console.log('--------------------------');
                console.log(`From: ${parsed.from.text} --> ${parsed.text}`);
              });
            });
          });
        });
      });
    });
    imap.connect();
  } catch (error) {
    console.log(`err: ${error}`);
  }
};

module.exports = getEmails;
