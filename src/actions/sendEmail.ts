'use server';

import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    password: string;
  };
}

interface EmailResult {
  success: boolean;
  error?: string;
}

/**
 * Server Action для отправки email через SMTP
 * Принимает FormData с данными формы и отправляет email
 */
export async function sendFormEmail(formData: FormData): Promise<EmailResult> {
  try {
    // Получаем конфигурацию SMTP из переменных окружения
    const smtpConfig: EmailConfig = {
      host: process.env.SMTP_HOST || '',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true', // true для порта 465, false для других
      auth: {
        user: process.env.SMTP_USER || '',
        password: process.env.SMTP_PASSWORD || '',
      },
    };

    // Проверяем наличие обязательных переменных
    if (!smtpConfig.host || !smtpConfig.auth.user || !smtpConfig.auth.password) {
      return {
        success: false,
        error: 'SMTP configuration is missing. Please check environment variables.',
      };
    }

    // Получаем email получателя из переменных окружения
    const recipientEmail = process.env.SMTP_RECIPIENT_EMAIL || process.env.SMTP_USER || '';

    if (!recipientEmail) {
      return {
        success: false,
        error: 'Recipient email is not configured.',
      };
    }

    // Создаем транспортер для отправки email
    const transporter = nodemailer.createTransport(smtpConfig);

    // Получаем тип формы
    const formType = formData.get('formType') as string;

    // Формируем содержимое email в зависимости от типа формы
    let subject = '';
    let htmlContent = '';
    const attachments: Array<{
      filename: string;
      content: Buffer;
      contentType?: string;
    }> = [];

    if (formType === 'participants') {
      subject = 'Новая заявка участника - One Shot';
      htmlContent = `
        <h2>Новая заявка участника</h2>
        <h3>Контактная информация:</h3>
        <p><strong>Имя:</strong> ${escapeHtml(formData.get('name') as string || '')}</p>
        <p><strong>Местоположение:</strong> ${escapeHtml(formData.get('location') as string || '')}</p>
        <p><strong>Телефон:</strong> ${escapeHtml(formData.get('phone') as string || '')}</p>
        <p><strong>Email:</strong> ${escapeHtml(formData.get('email') as string || '')}</p>
        <p><strong>Социальные сети:</strong> ${escapeHtml(formData.get('social') as string || 'Не указано')}</p>
        
        <h3>Личная информация:</h3>
        <p><strong>Рост:</strong> ${escapeHtml(formData.get('height') as string || '')} см</p>
        <p><strong>Вес:</strong> ${escapeHtml(formData.get('weight') as string || '')} кг</p>
        <p><strong>Навыки и достижения:</strong></p>
        <p>${escapeHtml(formData.get('skills') as string || '').replace(/\n/g, '<br>')}</p>
        <p><strong>О себе:</strong></p>
        <p>${escapeHtml(formData.get('about') as string || '').replace(/\n/g, '<br>')}</p>
      `;

      // Обрабатываем файлы резюме и медицинской справки
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
    } else if (formType === 'sponsors') {
      subject = 'Новая заявка спонсора - One Shot';
      htmlContent = `
        <h2>Новая заявка спонсора</h2>
        <h3>Контактная информация:</h3>
        <p><strong>Название компании:</strong> ${escapeHtml(formData.get('company') as string || '')}</p>
        <p><strong>Телефон:</strong> ${escapeHtml(formData.get('phone') as string || '')}</p>
        <p><strong>Email:</strong> ${escapeHtml(formData.get('email') as string || '')}</p>
        
        <h3>Описание предложения:</h3>
        <p>${escapeHtml(formData.get('description') as string || '').replace(/\n/g, '<br>')}</p>
      `;
    } else {
      return {
        success: false,
        error: 'Invalid form type.',
      };
    }

    // Отправляем email
    const info = await transporter.sendMail({
      from: `"One Shot Form" <${smtpConfig.auth.user}>`,
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
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

/**
 * Экранирует HTML символы для безопасности
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
