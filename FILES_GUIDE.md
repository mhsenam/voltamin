# 📁 راهنمای فایل‌ها

هر فایل در این پروژه برای یک منظور خاص طراحی شده است. این راهنما شامل تمام فایل‌ها است.

## 🎯 فایل‌های کلیدی (شروع اینجا!)

### `config/site.config.ts` ⭐⭐⭐
**بیشترین مهم - تمام تنظیمات اینجا است**

```typescript
siteConfig = {
  personal: { ... }      // اطلاعات شخصی
  stats: { ... }         // آمار
  services: [ ... ]      // خدمات
  projects: [ ... ]      // پروژه‌ها
  skills: [ ... ]        // مهارت‌ها
  colors: { ... }        // رنگ‌ها
}
```

**چه زمانی تغییر دهید:**
- ✅ نام و اطلاعات خود
- ✅ خدمات خود
- ✅ پروژه‌های خود
- ✅ مهارت‌ها

**نکته:** تمام تغییرات اینجا فوری اعمال می‌شود!

---

### `styles/globals.css` ⭐⭐
**استایل‌های عمومی و رنگ‌ها**

```css
:root {
  --primary: 217 91% 60%;      /* رنگ اصلی - تغییر این! */
  --accent: 40 100% 50%;       /* تاکید */
  --background: 0 0% 100%;     /* پس‌زمینه */
  --foreground: 220 13% 20%;   /* متن */
}

.dark { /* تنظیمات تم تیره */ }
```

**چه زمانی تغییر دهید:**
- ✅ تغییر رنگ‌های سایت
- ✅ تغییر فونت
- ✅ اضافه کردن انیمیشن‌های سراسری

---

### `app/layout.tsx` ⭐
**تنظیمات کلی و SEO**

```typescript
export const metadata: Metadata = {
  title: "عنوان سایت",
  description: "توضیح",
  keywords: [...],
}

export const viewport: Viewport = {
  // تنظیمات viewport
}
```

**چه زمانی تغییر دهید:**
- ✅ تغییر عنوان سایت
- ✅ تغییر توضیح (SEO)
- ✅ اضافه کردن کلیدواژه‌ها
- ✅ تغییر فونت سایت

---

## 🎨 فایل‌های کامپوننت‌ها

### `components/navigation.tsx`
**شریط ناوبری چسبان**

- لوگو و نام
- منوی ناوبری
- دکمه درخواست فوری
- منوی موبایل

**ویرایش:**
```typescript
const links = [
  { label: 'درباره', href: '#about' },
  // اضافه کنید/حذف کنید
]
```

---

### `components/hero.tsx`
**بخش قهرمان (صفحه اول)**

- عنوان بزرگ
- توضیح
- آمار
- دکمه‌های عمل

**ویرایش:**
```typescript
// عنوان
<h1>سلام! من <span>نام</span> هستم</h1>

// توضیح
<p>متن توضیح خود</p>

// آمار - از config اضافه کنید
```

---

### `components/about.tsx`
**بخش درباره و ویژگی‌ها**

- متن درباره
- ۴ ویژگی برجسته
- مهارت‌ها

**تغییر:**
```typescript
// ویژگی‌ها می‌آیند از اینجا:
// ✓ Award
// ✓ Users
// ✓ Zap
// ✓ CheckCircle

// می‌توانید تغییر دهید یا ایجاد کنید
```

---

### `components/services.tsx`
**بخش خدمات**

- ۶ خدمت کارت
- آیکون‌های رنگین
- توضیح‌های مختصر
- CTA دکمه

**ویرایش:**
```typescript
// از config بخش services استفاده کنید:
const services = siteConfig.services

// یا اضافه کنید:
{
  title: "خدمت جدید",
  description: "توضیح",
  icon: "Lightbulb",  // آیکون Lucide
  color: "from-blue-500 to-cyan-500",
}
```

---

### `components/projects.tsx`
**بخش نمونه کارها**

- ۶ کارت پروژه
- تصاویر رنگین
- برچسب‌ها
- سال انجام

**ویرایش:**
```typescript
// از config بخش projects استفاده کنید
const projects = siteConfig.projects

// یا اضافه کنید:
{
  title: "پروژه جدید",
  description: "توضیح",
  tags: ["تگ۱", "تگ۲"],
  image: "bg-gradient-to-br from-blue-400 to-blue-600",
  year: "۱۴۰۳",
}
```

---

### `components/contact.tsx`
**بخش تماس و فرم**

- اطلاعات تماس
- فرم تماس تفاعلی
- شبکه‌های اجتماعی

**ویرایش:**
```typescript
const contactMethods = [
  {
    title: "تلفن",
    value: "۰۹۱۲...",
    href: "tel:+989123...",
  },
  // اضافه کنید
]

// فرم تماس:
// name, email, phone, message
```

---

### `components/footer.tsx`
**پایین‌صفحه**

- اطلاعات مختصر
- لینک‌های مهم
- اطلاعات تماس
- سال و حقوق

**ویرایش:**
```typescript
// لینک‌ها
const footerLinks = [...]

// توضیح
<p>متن درباره خود</p>

// تاریخ - خودکار!
```

---

## 🧩 فایل‌های UI (اجزای آماده)

### `components/ui/button.tsx`
**دکمه‌های استاندارد**

```typescript
<Button>متن دکمه</Button>
<Button variant="outline">طرح‌دار</Button>
<Button size="lg">بزرگ</Button>
<Button size="sm">کوچک</Button>
```

---

### `components/ui/card.tsx`
**کارت‌های استاندارد**

```typescript
<Card>
  <CardHeader>عنوان</CardHeader>
  <CardContent>محتوا</CardContent>
  <CardFooter>پایین</CardFooter>
</Card>
```

---

### `components/ui/badge.tsx`
**برچسب‌های کوچک**

```typescript
<Badge>برچسب</Badge>
<Badge variant="secondary">ثانویه</Badge>
```

---

## 📦 فایل‌های تنظیمات

### `package.json`
**وابستگی‌های پروژه**

```json
{
  "name": "...",
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    // ...
  },
  "scripts": {
    "dev": "npm run dev",
    "build": "npm run build",
    "start": "npm start"
  }
}
```

---

### `tailwind.config.ts`
**تنظیمات Tailwind CSS**

```typescript
const config = {
  theme: {
    colors: { /* رنگ‌ها */ },
    extend: { /* توسعه‌ها */ },
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

### `tsconfig.json`
**تنظیمات TypeScript**

```json
{
  "compilerOptions": {
    "strict": false,
    "paths": {
      "@/*": ["./*"]  // @/ مسیر مختصر
    }
  }
}
```

---

### `next.config.js`
**تنظیمات Next.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // تنظیمات Next.js
}

module.exports = nextConfig
```

---

## 📚 فایل‌های مستندات

### `README.md`
**مستندات کامل و جامع**

- تعریف پروژه
- فناوری‌های استفاده‌شده
- نصب و شروع
- deployment

---

### `QUICK_START.md`
**راهنمای سریع برای شروع**

- فوری‌ترین شروع
- تغییرات سریع
- چک‌لیست
- سوالات متداول

---

### `CUSTOMIZATION.md`
**راهنمای شخصی‌سازی پیشرفته**

- تغییرات رنگ
- تغییرات متن‌ها
- تغییرات لیاوت
- اضافه کردن بخش جدید

---

### `PROJECT_SUMMARY.md`
**خلاصه تکنیکی پروژه**

- نمای کلی
- ویژگی‌ها
- فناوری‌ها
- معاییر performance

---

### `INSTALLATION_COMPLETE.md`
**پیام تکمیل نصب (این فایل!)**

- مراحل بعدی
- فایل‌های مهم
- دستورات مفید
- نکات کلیدی

---

## 📁 ساختار کامل

```
voltamin/
├── 📄 README.md                 ← شروع!
├── 📄 QUICK_START.md           ← سریع
├── 📄 CUSTOMIZATION.md         ← شخصی‌سازی
├── 📄 PROJECT_SUMMARY.md       ← فنی
├── 📄 FILES_GUIDE.md           ← این فایل
├── 📄 INSTALLATION_COMPLETE.md ← تکمیل شد
│
├── 📁 app/
│   ├── layout.tsx              ← SEO + تنظیمات
│   └── page.tsx                ← صفحه اول
│
├── 📁 components/
│   ├── navigation.tsx          ← منو
│   ├── hero.tsx                ← قهرمان
│   ├── about.tsx               ← درباره
│   ├── services.tsx            ← خدمات
│   ├── projects.tsx            ← پروژه‌ها
│   ├── contact.tsx             ← تماس
│   ├── footer.tsx              ← پایین
│   └── 📁 ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
│
├── 📁 config/
│   └── site.config.ts          ← ⭐ تمام تنظیمات
│
├── 📁 lib/
│   └── utils.ts                ← توابع کمکی
│
├── 📁 styles/
│   └── globals.css             ← ⭐ رنگ‌ها + استایل
│
├── 📁 public/                  ← عکس‌ها و فایل‌ها
│
├── 📄 package.json             ← وابستگی‌ها
├── 📄 tailwind.config.ts       ← Tailwind
├── 📄 tsconfig.json            ← TypeScript
├── 📄 next.config.js           ← Next.js
└── 📄 postcss.config.js        ← PostCSS
```

## 🎯 اولویت ویرایش

### اول (اجباری)
1. ✅ `config/site.config.ts` - اطلاعات شخصی
2. ✅ `styles/globals.css` - رنگ‌ها

### دوم (مهم)
3. 📝 `app/layout.tsx` - SEO
4. 📝 تمام کامپوننت‌های محتوا

### سوم (اختیاری)
5. 🎨 رنگ‌های بیشتر
6. 📱 تنظیمات موبایل
7. 🚀 تنظیمات performance

## ✨ نکات نهایی

- 📌 **شروع با config** - سریع‌ترین راه
- 🎨 **پس رنگ‌ها** - استایل سایت
- 📝 **سپس محتوا** - کامپوننت‌ها
- 🚀 **نهایت deployment** - بارگیری

---

<div align="center">

**تمام چیز آماده است - شروع کنید! 🚀**

[config/site.config.ts](./config/site.config.ts) → [styles/globals.css](./styles/globals.css) → Deploy!

</div>

