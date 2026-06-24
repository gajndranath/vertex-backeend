import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendLeadNotification = async (leadData: any) => {
  try {
    const data = await resend.emails.send({
      from: 'Vortex Engineering <onboarding@resend.dev>', // Use custom domain in prod
      to: ['vortexxengineering.solutions@gmail.com'],
      subject: `New Lead: ${leadData.service} from ${leadData.name}`,
      html: `
        <h2>New Enquiry Received</h2>
        <p><strong>Name:</strong> ${leadData.name}</p>
        <p><strong>Company:</strong> ${leadData.company}</p>
        <p><strong>Email:</strong> ${leadData.email}</p>
        <p><strong>Phone:</strong> ${leadData.phone}</p>
        <p><strong>Service:</strong> ${leadData.service}</p>
        <p><strong>Message:</strong></p>
        <p>${leadData.message}</p>
        <hr/>
        <p><small>Source: ${leadData.source}</small></p>
      `
    });
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
