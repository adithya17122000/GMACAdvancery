// // import { MailosaurClient } from 'mailosaur';
// const MailosaurClient = require('mailosaur');
// import dotenv from 'dotenv';
// dotenv.config();

// export async function getVerificationCode(email: string) {
//   const serverId = process.env.MAILOSAUR_SERVER_ID!;
//   const client = new MailosaurClient(process.env.MAILOSAUR_API_KEY!);

//   const message = await client.messages.get(serverId, {
//     sentTo: email,
//   });

//   // Update this regex if your email format is different
//   const code = message.html?.body.match(/\b\d{6}\b/)?.[0];
//   console.log('Verification code:', code);

//   if (!code) throw new Error('Verification code not found in email.');

//   return code;
// }


const MailosaurClient = require('mailosaur');
import dotenv from 'dotenv';
dotenv.config();

export async function getVerificationCode(email: string) {
  const serverId = process.env.MAILOSAUR_SERVER_ID!;
  const client = new MailosaurClient(process.env.MAILOSAUR_API_KEY!);

  // Look for emails received in the last 80 seconds
  const receivedAfter = new Date(Date.now() - 50 * 1000);
  const result = await client.messages.search(
    serverId,
    {
      sentTo: email,
    },
    {
      receivedAfter,
      itemsPerPage: 1,
      timeout: 120000,
    }
  );
  
//   console.log(`Found ${result.items.length} message(s).`);
  
  for (const summary of result.items) {
    const message = await client.messages.getById(summary.id); // Get full email
    // console.log('Raw message:', JSON.stringify(message, null, 2));
  
    const body = message.text?.body || message.html?.body || '';
    // console.log('Checking email body:\n', body);
  
    const code = body.match(/\b\d{6}\b/)?.[0];
    if (code) {
      console.log('Verification code:', code);
      return code;
    }
  }
  
  throw new Error('Verification code not found in recent emails.');
}  

