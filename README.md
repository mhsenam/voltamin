# الکتریکیا - پورتفولیو متخصص برق

![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6)

یک وبسایت حرفه‌ای برای معرفی و نمایش خدمات متخصص برق و الکتریسیته.

## ✨ ویژگی‌های اصلی

- ⚡ **طراحی مدرن و جذاب** - رابط کاربری زیبا و مدرن
- 🎨 **تم پاسخگو** - متناسب با تمام سایز صفحات
- 📱 **موبایل فیرست** - طراحی اول برای موبایل
- 🌊 **انیمیشن‌های روان** - استفاده از Framer Motion
- 🔍 **SEO بهینه** - بهینه برای موتورهای جستجو
- 📝 **کامل‌ترین اطلاعات** - بخش‌های جامع
- ♿ **دسترس‌پذیری بالا** - پایبند به استانداردهای دسترس‌پذیری

## 🎯 بخش‌های سایت

### 1. **Navigation (ناوبری)**
- منوی چسبان در بالای صفحه
- لینک‌های دسترسی سریع
- دکمه درخواست فوری

### 2. **Hero Section (بخش قهرمان)**
- معرفی فوری
- آمار تاثیرگذار
- دکمه‌های عمل سریع
- انیمیشن‌های جذاب

### 3. **About (درباره)**
- معرفی تفصیلی
- ویژگی‌های منحصر به فرد
- مهارت‌های تخصصی

### 4. **Services (خدمات)**
- ۶ خدمت اصلی
- شرح تفصیلی هر خدمت
- آیکون‌های جذاب
- دکمه درخواست مشاوره

### 5. **Projects (نمونه کارها)**
- نمایش ۶ پروژه موفق
- تصاویر رنگی
- برچسب‌های دسته‌بندی
- تاریخ انجام پروژه

### 6. **Contact (تماس)**
- فرم تماس تفاعلی
- روش‌های تماس متعدد
- شبکه‌های اجتماعی
- نقشه موقعیت

### 7. **Footer (پایین‌صفحه)**
- اطلاعات مختصر
- لینک‌های دسترسی سریع
- اطلاعات تماس
- شبکه‌های اجتماعی

## 🚀 شروع سریع

### پیش‌نیازها
- Node.js 18+ 
- npm یا yarn

### نصب

```bash
# کلون مخزن
git clone <repository-url>
cd voltamin

# نصب وابستگی‌ها
npm install

# اجرای سرور توسعه
npm run dev
```

سایت در `http://localhost:3000` در دسترس خواهد بود.

## 🛠️ فناوری‌های استفاده‌شده

### Frontend Framework
- **Next.js 14** - فریم‌ورک React برای تولید سایت‌های استاتیک و داینامیک
- **React 18** - کتابخانه JavaScript برای ساخت رابط کاربری

### Styling
- **Tailwind CSS 3** - فریم‌ورک CSS ابتدایی
- **shadcn/ui** - مجموعه‌ای از اجزای React بر پایه Radix UI و Tailwind

### Animations
- **Framer Motion** - کتابخانه انیمیشن برای React
- **Tailwind CSS Animate** - انیمیشن‌های پیش‌ساخته

### اضافی
- **TypeScript** - زبان برنامه‌نویسی تایپ شده
- **Lucide React** - آیکون‌های مدرن SVG
- **Vazirmatn Font** - فونت فارسی برای قابلیت خواندگی بهتر

## 📁 ساختار پروژه

```
voltamin/
├── app/
│   ├── layout.tsx          # تنظیمات کلی صفحه
│   └── page.tsx            # صفحه اصلی
├── components/
│   ├── navigation.tsx      # شریط ناوبری
│   ├── hero.tsx            # بخش قهرمان
│   ├── about.tsx           # بخش درباره
│   ├── services.tsx        # بخش خدمات
│   ├── projects.tsx        # بخش نمونه‌کارها
│   ├── contact.tsx         # بخش تماس
│   ├── footer.tsx          # پایین‌صفحه
│   └── ui/
│       ├── button.tsx      # کامپوننت دکمه
│       ├── card.tsx        # کامپوننت کارت
│       └── badge.tsx       # کامپوننت برچسب
├── lib/
│   └── utils.ts            # توابع کمکی
├── styles/
│   └── globals.css         # استایل‌های عمومی
├── public/                 # فایل‌های استاتیک
├── tailwind.config.ts      # تنظیمات Tailwind
├── tsconfig.json           # تنظیمات TypeScript
├── next.config.js          # تنظیمات Next.js
└── package.json            # وابستگی‌های پروژه
```

## 🎨 طراحی و رنگ‌ها

### رنگ‌های اصلی
- **Primary (آبی)**: `#3B82F6` - رنگ اصلی برای دکمه‌ها و عناصر برجسته
- **Secondary (خاکستری)**: `#F3F4F6` - رنگ پس‌زمینه
- **Accent (طلایی)**: `#FBBF24` - تاکید و جلب توجه
- **Foreground (تیره)**: `#1F2937` - رنگ متن

### نمایش مظلم
- تم تیره پشتیبانی شده برای بهتری دیدگی در شب
- انتقال هموار بین تم‌ها

## 🔧 شخصی‌سازی

### تغییر اطلاعات شخصی

1. **در `components/navigation.tsx`**:
   ```typescript
   // تغییر نام
   <span>نام شما</span>
   
   // تغییر لینک‌های منو
   const links = [
     { label: 'درباره', href: '#about' },
     // ...
   ]
   ```

2. **در `components/hero.tsx`**:
   ```typescript
   // تغییر نام
   <span className="text-primary">نام شما</span>
   
   // تغییر متن‌های توضیحی
   <p className="...">توضیح جدید</p>
   ```

3. **در `components/contact.tsx`**:
   ```typescript
   // تغییر اطلاعات تماس
   value: 'شماره تلفن',
   href: 'tel:+...'
   ```

### تغییر رنگ‌ها

در `styles/globals.css`:
```css
:root {
  --primary: 217 91% 60%;  /* تغییر رنگ اصلی */
  --accent: 40 100% 50%;   /* تغییر رنگ تاکید */
}
```

## 📦 Build و Deploy

### ساخت برای تولید

```bash
npm run build
npm start
```

### Deployment بر روی Vercel

```bash
# نصب Vercel CLI
npm install -g vercel

# Deploy
vercel
```

یا با اتصال GitHub:
1. Push کد به GitHub
2. وارد [vercel.com](https://vercel.com) شوید
3. Select Repository
4. Deploy

## 🌐 Deployment بر روی سایر پلتفرم‌ها

### Netlify
```bash
npm run build
# فایل‌های ساخته شده در .next است
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📱 بهینه‌سازی برای سئو

- ✅ Metadata بهینه شده
- ✅ Open Graph تنظیمات
- ✅ استانداردهای دسترسی‌پذیری
- ✅ بارگذاری سریع صفحه
- ✅ موبایل‌فرست ایندکسینگ

## ⚙️ دستورات معمول

```bash
# اجرای حالت توسعه
npm run dev

# ساخت برای تولید
npm run build

# اجرای نسخه تولیدی
npm start

# بررسی و تصحیح خطا
npm run lint
```

## 🤝 مشارکت

برای مشارکت:
1. Fork مخزن
2. ایجاد شاخه جدید (`git checkout -b feature/AmazingFeature`)
3. Commit تغییرات (`git commit -m 'Add some AmazingFeature'`)
4. Push به شاخه (`git push origin feature/AmazingFeature`)
5. باز کردن Pull Request

## 📄 لایسنس

این پروژه تحت لایسنس MIT است. برای جزئیات بیشتر `LICENSE` را ببینید.

## 📞 پشتیبانی

برای سؤالات و پشتیبانی:
- 📧 Email: info@electrical.com
- 📱 Phone: ۰۹۱۲۳۴۵۶۷۸۹
- 💬 Telegram: @yourhandle

## 👨‍💻 نویسنده

**محسن احمدی** - متخصص برق و الکتریسیته

---

<div align="center">

Made with ❤️ by محسن احمدی

[بازدید سایت](https://electrical.com) | [تماس](mailto:info@electrical.com) | [Instagram](https://instagram.com)

</div>
