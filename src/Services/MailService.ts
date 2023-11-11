import { google, gmail_v1 } from 'googleapis';
import { Credentials, OAuth2Client } from 'google-auth-library';

// Gmail API'ye erişim için kimlik bilgilerini yükle
const client_id = process.env.MAIL_CLIENT_ID;
const client_secret=process.env.MAIL_CLIENT_SECRET;
const redirect_uri=process.env.MAIL_REDIRECT_URI;

const token = process.env.MAIL_ACCESS_TOKEN;
const refreshToken = process.env.MAIL_REFRESH_TOKEN;

const credentials:Credentials = {
    access_token: token,
    refresh_token: refreshToken,  // Eğer kullanıyorsanız, aksi takdirde bu satırı kaldırabilirsiniz.
    scope: 'https://www.googleapis.com/auth/gmail.send',  // Eğer kullanıyorsanız, aksi takdirde bu satırı kaldırabilirsiniz.
    token_type: 'Bearer',
  };

// OAuth2Client oluştur
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uri
);

// Token'ı OAuth2Client'a ayarla
oAuth2Client.setCredentials(credentials);

// Gmail API'yi oluştur
const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

// Mail gönderme fonksiyonu
export async function sendEmail(subject:string,messageText:string,targetMail:string) {
  const message = {
    to: targetMail,
    subject: subject,
    text: messageText,
  };

  const raw = createMessage(message);
  const sentEmail = await sendMessage(raw);
  console.log('Email sent:', sentEmail);
}

// Email mesajını oluştur
function createMessage({ to, subject, text }: { to: string; subject: string; text: string }): string {
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = [
    `To: ${to}`,
    `Subject: ${utf8Subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 7bit',
    '',
    text,
  ];

  return messageParts.join('\n');
}

// Email mesajını gönder
async function sendMessage(raw: string): Promise<string> {
  const response = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: Buffer.from(raw).toString('base64'),
    },
  });

  return response.data.id || "";
}