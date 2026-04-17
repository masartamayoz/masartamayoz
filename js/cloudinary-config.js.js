// ============================================================
//  Cloudinary Configuration — أكاديمية مسار التميز
// ============================================================

const CLOUDINARY = {
  cloudName   : 'dv5xhvkr3',
  apiKey      : '133245976525348',
  uploadPreset: 'masartamayoz-content',
};

// ============================================================
//  uploadToCloudinary(file, folder)
//
//  file   : كائن File من <input type="file">
//  folder : 'receipts' | 'pdf' | 'images'
//
//  يُرجع: { url, publicId }
// ============================================================

async function uploadToCloudinary(file, folder = 'general') {

  const resourceType = file.type === 'application/pdf' ? 'raw' : 'image';

  const formData = new FormData();
  formData.append('file',          file);
  formData.append('upload_preset', CLOUDINARY.uploadPreset);
  formData.append('api_key',       CLOUDINARY.apiKey);
  formData.append('folder',        `academy/${folder}`);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY.cloudName}/${resourceType}/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'فشل رفع الملف');
  }

  const data = await res.json();

  return {
    url     : data.secure_url,
    publicId: data.public_id
  };
}
