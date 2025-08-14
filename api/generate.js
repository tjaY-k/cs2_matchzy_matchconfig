import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const formData = req.body; // Получаем данные формы (нужно парсить, если JSON)
      // Генерация JSON (скопируйте логику из вашего saveConfig, но на сервере)
      const config = { /* ... ваша логика генерации config из formData */ };
      const jsonString = JSON.stringify(config, null, 2);
      const blobName = `match_config_${Date.now()}.json`; // Уникальное имя

      // Загрузка в Vercel Blob
      const { url } = await put(blobName, jsonString, {
        access: 'public', // Публичный доступ
        token: process.env.BLOB_READ_WRITE_TOKEN // Env variable
      });

      res.status(200).json({ url }); // Возвращаем ссылку
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate JSON' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}