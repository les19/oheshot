'use server';

import nodemailer from 'nodemailer';

interface EmailResult {
  success: boolean;
  error?: string;
}

/**
 * Server Action для отправки email через SMTP
 * Принимает FormData с данными формы и отправляет plain text email
 */
export async function sendFormEmail(formData: FormData): Promise<EmailResult> {
  try {
    // Получаем конфигурацию SMTP из переменных окружения
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const sendTo = process.env.SMTP_SEND_TO;

    // Проверяем наличие обязательных переменных
    if (!smtpHost || !smtpUser || !smtpPassword || !sendTo) {
      return {
        success: false,
        error: 'SMTP configuration is missing. Please check environment variables.',
      };
    }

    // Создаем транспортер для отправки email
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: 587,
      secure: false, // true для порта 465, false для других
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Получаем тип формы
    const formType = formData.get('formType') as string;

    // Обрабатываем файлы для вложений
    const attachments: Array<{
      filename: string;
      content: Buffer;
      contentType?: string;
    }> = [];

    // Получаем файлы из FormData и конвертируем в буферы
    const resumeFile = formData.get('resume') as File | null;
    const medicalFile = formData.get('medical') as File | null;

    if (resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      attachments.push({
        filename: resumeFile.name || 'resume.pdf',
        content: buffer,
        contentType: resumeFile.type || 'application/pdf',
      });
    }

    if (medicalFile && medicalFile.size > 0) {
      const buffer = Buffer.from(await medicalFile.arrayBuffer());
      attachments.push({
        filename: medicalFile.name || 'medical.pdf',
        content: buffer,
        contentType: medicalFile.type || 'application/pdf',
      });
    }

    // Формируем plain text содержимое email
    let textContent = '';

    if (formType === 'participants') {
      textContent = `Form Type: Participants

Contact Information:
Name: ${formData.get('name') || ''}
Location: ${formData.get('location') || ''}
Phone: ${formData.get('phone') || ''}
Email: ${formData.get('email') || ''}
Social: ${formData.get('social') || 'Not provided'}

Personal Information:
Height: ${formData.get('height') || ''} cm
Weight: ${formData.get('weight') || ''} kg
Skills: ${formData.get('skills') || ''}
About: ${formData.get('about') || ''}

Files:
Resume: ${resumeFile && resumeFile.size > 0 ? `Attached (${resumeFile.name})` : 'Not provided'}
Medical Certificate: ${medicalFile && medicalFile.size > 0 ? `Attached (${medicalFile.name})` : 'Not provided'}`;
    } else if (formType === 'sponsors') {
      textContent = `Form Type: Sponsors

Contact Information:
Company: ${formData.get('company') || ''}
Phone: ${formData.get('phone') || ''}
Email: ${formData.get('email') || ''}

Description:
${formData.get('description') || ''}`;
    } else {
      // Generic form - include all fields
      textContent = 'Form Fields:\n';
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          textContent += `${key}: ${value.name} (${value.size} bytes)\n`;
        } else {
          textContent += `${key}: ${value}\n`;
        }
      }
    }

    // Отправляем email с вложениями
    await transporter.sendMail({
      from: `"One Shot Form" <${smtpUser}>`,
      to: sendTo,
      subject: 'Form filled',
      text: textContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}
