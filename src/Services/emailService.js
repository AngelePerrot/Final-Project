import emailjs from '@emailjs/browser'

export const sendEmail = async formData => {
  try {
    emailjs.init('Ru1Yi5WmHFHayqLwj')

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      reply_to: formData.email,
    }

    const response = await emailjs.send(
      'Santa_CheckList',
      'template_dppmwmj',
      templateParams,
    )

    if (response.status === 200) {
      return { success: true, response }
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Error details:', error)
    throw error
  }
}
