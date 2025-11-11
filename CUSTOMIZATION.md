# راهنمای شخصی‌سازی سایت

این راهنما شامل نحوه‌ی تغییر اطلاعات و شخصی‌سازی سایت است.

## 📝 تغییر اطلاعات شخصی

### روش ۱: استفاده از فایل تنظیمات (توصیه می‌شود)

فایل `config/site.config.ts` تمام اطلاعات سایت را شامل می‌شود:

```typescript
export const siteConfig = {
  personal: {
    name: "نام شما",
    title: "عنوان شغلی",
    email: "ایمیل شما",
    phone: "شماره تلفن",
    address: "آدرس",
  },
  // ... اطلاعات دیگر
}
```

### روش ۲: تغییر مستقیم در کامپوننت‌ها

اگر می‌خواهید تغییرات سریع انجام دهید:

## 🎨 تغییر رنگ‌ها

### رنگ‌های اصلی (Tailwind CSS Variables)

فایل `styles/globals.css` را باز کنید:

```css
:root {
  --primary: 217 91% 60%;        /* رنگ اصلی - آبی */
  --accent: 40 100% 50%;         /* رنگ تاکید - طلایی */
  --secondary: 220 13% 91%;      /* رنگ ثانویه */
  --foreground: 220 13% 20%;     /* رنگ متن */
}
```

#### فرمت رنگ‌ها HSL است:
- **Hue (رنگ)**: 0-360
- **Saturation (اشباع)**: 0-100%
- **Lightness (روشنایی)**: 0-100%

#### چند مثال:
- آبی: `217 91% 60%`
- قرمز: `0 84% 60%`
- سبز: `120 100% 50%`
- نارنجی: `39 100% 50%`
- بنفش: `270 100% 60%`

### تم تیره

برای تغییر رنگ‌های تم تیره، در بخش `.dark` فایل `globals.css` تغییر کنید:

```css
.dark {
  --primary: 217 91% 60%;
  --background: 220 13% 12%;
  /* ... */
}
```

## 📄 تغییر متن‌ها و محتوا

### بخش Hero (قهرمان)

`components/hero.tsx`:

```typescript
<h1 className="...">
  سلام! من <span className="text-primary">نام شما</span> هستم
</h1>

<p className="...">
  توضیح و معرفی خود را بنویسید
</p>
```

### بخش About (درباره)

`components/about.tsx`:

```typescript
<p className="...">
  متن درباره خود را جایگزین کنید
</p>
```

### بخش Services (خدمات)

`components/services.tsx`:

```typescript
const services = [
  {
    title: "عنوان خدمت",
    description: "توضیح خدمت",
    icon: "نام آیکون",
  },
  // ...
]
```

### بخش Projects (پروژه‌ها)

`components/projects.tsx`:

```typescript
const projects = [
  {
    title: "عنوان پروژه",
    description: "توضیح پروژه",
    tags: ["تگ۱", "تگ۲"],
    year: "۱۴۰۳",
  },
  // ...
]
```

## 🔗 تغییر لینک‌های تماس

### فایل `components/contact.tsx`:

```typescript
const contactMethods = [
  {
    title: "تلفن",
    value: "۰۹۱۲۳۴۵۶۷۸۹",
    href: "tel:+989123456789",
  },
  {
    title: "ایمیل",
    value: "your@email.com",
    href: "mailto:your@email.com",
  },
  {
    title: "آدرس",
    value: "آدرس شما",
  },
]
```

## 🎭 تغییر آیکون‌ها

سایت از کتابخانه `lucide-react` برای آیکون‌ها استفاده می‌کند.

آیکون‌های موجود:
- `Lightbulb` - روشنایی
- `Wrench` - تعمیر
- `Zap` - برق
- `Home` - خانه
- `Cpu` - کامپیوتر
- `Sun` - خورشید
- `Award` - جایزه
- `Users` - کاربران
- `CheckCircle` - چک
- `Phone` - تلفن
- `Mail` - ایمیل
- `MapPin` - نقشه

[لیست کامل آیکون‌ها](https://lucide.dev/)

## 📐 تغییر کنتینر و layout

### عرض صفحه

`tailwind.config.ts`:

```typescript
container: {
  center: true,
  padding: "2rem",
  screens: {
    "2xl": "1400px",  // عرض حداکثر
  },
},
```

## 🔤 تغییر فونت

### فونت اصلی (Vazirmatn)

`app/layout.tsx`:

```typescript
const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})
```

## 🎬 تغییر انیمیشن‌ها

### انیمیشن‌های Framer Motion

در هر کامپوننت:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}      // شروع
  animate={{ opacity: 1, y: 0 }}       // انتهایی
  transition={{ duration: 0.6 }}       // مدت زمان
>
  محتوا
</motion.div>
```

### تغییر سرعت انیمیشن‌های Tailwind

`tailwind.config.ts`:

```typescript
animation: {
  "fade-in": "fadeIn 1s ease-in",  // تغییر 0.5s به 1s
}
```

## 📱 شخصی‌سازی برای موبایل

### نقاط توقف (Breakpoints) Tailwind:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### استفاده در کامپوننت‌ها:

```typescript
<div className="
  grid 
  grid-cols-1        // ۱ ستون در موبایل
  md:grid-cols-2     // ۲ ستون در تبلت
  lg:grid-cols-3     // ۳ ستون در دسکتاپ
">
```

## 🔍 تغییر متاتگ‌های SEO

`app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "عنوان سایت",
  description: "توضیح سایت",
  keywords: ["کلیدواژه۱", "کلیدواژه۲"],
  authors: [{ name: "نام شما" }],
}
```

## 🚀 اضافه کردن بخش جدید

### مثال: اضافه کردن بخش "تصادیق"

۱. ایجاد فایل جدید: `components/testimonials.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'

export const Testimonials = () => {
  const testimonials = [
    {
      text: "نظر مشتری",
      author: "نام شخص",
      role: "نقش",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-white">
      {/* محتوا */}
    </section>
  )
}
```

۲. اضافه کردن به `app/page.tsx`:

```typescript
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <main>
      {/* بخش‌های دیگر */}
      <Testimonials />
    </main>
  )
}
```

## 🎯 نکات مهم

- ✅ همیشه تغییرات را test کنید: `npm run dev`
- ✅ برای تغییرات سریع فایل config استفاده کنید
- ✅ Tailwind CSS رو یاد بگیرید برای styling بهتر
- ✅ Framer Motion برای انیمیشن‌های زیبا
- ✅ قبل از deploy، build تست کنید: `npm run build`

## 📚 منابع مفید

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Lucide Icons](https://lucide.dev/)
- [HSL Color Picker](https://www.w3schools.com/colors/colors_hsl.asp)

---

اگر سوال دارید، از من بپرسید! 🚀

