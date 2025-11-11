# VOLTAMIN ELECTRIC - Electrical Specialist Portfolio

![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6)

A professional website to showcase electrical specialist services and expertise.

## ✨ Key Features

- ⚡ **Modern & Attractive Design** - Beautiful and modern user interface
- 🎨 **Responsive Theme** - Perfectly adapted to all screen sizes
- 📱 **Mobile First** - Designed with mobile-first approach
- 🌊 **Smooth Animations** - Powered by Framer Motion
- 🔍 **SEO Optimized** - Optimized for search engines
- 📝 **Complete Information** - Comprehensive sections
- ♿ **High Accessibility** - Compliant with accessibility standards
- 📧 **Contact Form** - Email integration ready
- ⭐ **Testimonials** - Infinite scroll testimonial carousel
- ❓ **FAQ Section** - Comprehensive frequently asked questions

## 🎯 Website Sections

### 1. **Navigation**

- Sticky navbar at the top
- Quick access links
- Instant action button

### 2. **Hero Section**

- Instant introduction
- Impactful statistics
- Quick action buttons
- Engaging animations
- Clickable scroll indicator

### 3. **About**

- Detailed introduction
- Unique features (Why Choose Us)
- Professional expertise
- Payment methods accepted

### 4. **Services**

- 2 main service offerings:
  - New Lighting Installation
  - Replacement of Lighting
- Detailed service options:
  - Ceiling heights
  - Construction types
  - Property types
- Call-to-action button

### 5. **Projects**

- Showcase of 6 successful projects
- Colorful project images
- Category tags
- Project completion dates

### 6. **Testimonials**

- Infinite scrolling carousel
- 5-star customer reviews
- Service details
- Customer names and dates
- Professional presentation

### 7. **FAQ**

- 8 comprehensive Q&A sections
- Expandable answers
- Professional styling
- Mobile responsive

### 8. **Contact**

- Interactive contact form
- Multiple contact methods
- Social media links (WhatsApp & Instagram)
- Real-time form status feedback
- Email integration ready

### 9. **Footer**

- Brand information
- Quick access links
- Contact information
- Social media links

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd voltamin

# Install dependencies
npm install

# Run development server
npm run dev
```

The site will be available at `http://localhost:3000`.

## 🛠️ Technologies Used

### Frontend Framework

- **Next.js 14** - React framework for static and dynamic site generation
- **React 18** - JavaScript library for building user interfaces

### Styling

- **Tailwind CSS 3** - Utility-first CSS framework
- **shadcn/ui** - Collection of React components based on Radix UI and Tailwind

### Animations

- **Framer Motion** - Animation library for React
- **Tailwind CSS Animate** - Pre-built animations

### Additional

- **TypeScript** - Typed programming language
- **Lucide React** - Modern SVG icons
- **Vazirmatn Font** - Professional font for better readability

## 📁 Project Structure

```
voltamin/
├── app/
│   ├── api/
│   │   └── send-email/          # Email API endpoint
│   ├── layout.tsx               # Global page layout
│   └── page.tsx                 # Homepage
├── components/
│   ├── navigation.tsx           # Navigation bar
│   ├── hero.tsx                 # Hero section
│   ├── about.tsx                # About section
│   ├── services.tsx             # Services section
│   ├── projects.tsx             # Portfolio section
│   ├── testimonials.tsx         # Testimonials carousel
│   ├── faq.tsx                  # FAQ section
│   ├── contact.tsx              # Contact section
│   ├── footer.tsx               # Footer
│   └── ui/
│       ├── button.tsx           # Button component
│       ├── card.tsx             # Card component
│       └── badge.tsx            # Badge component
├── config/
│   └── site.config.ts           # Site configuration
├── lib/
│   └── utils.ts                 # Utility functions
├── styles/
│   └── globals.css              # Global styles
├── public/                       # Static files
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── next.config.js               # Next.js configuration
└── package.json                 # Project dependencies
```

## 🎨 Design & Colors

### Primary Colors

- **Primary (Blue)**: `#3B82F6` - Main color for buttons and highlights
- **Secondary (Gray)**: `#F3F4F6` - Background color
- **Accent (Amber)**: `#FBBF24` - Emphasis and attention
- **Foreground (Dark)**: `#1F2937` - Text color

### Dark Theme

- Dark theme supported for better nighttime visibility
- Smooth transitions between themes

## 🔧 Customization

### Change Personal Information

1. **In `config/site.config.ts`**:

   ```typescript
   personal: {
     name: "Your Name",
     email: "your@email.com",
     phone: "+1-XXX-XXX-XXXX",
     // ... other information
   }
   ```

2. **In `components/navigation.tsx`**:

   ```typescript
   // Update navigation links and branding
   ```

3. **In `components/contact.tsx`**:
   ```typescript
   // Update contact information
   ```

### Change Colors

In `styles/globals.css`:

```css
:root {
  --primary: 217 91% 60%; /* Change primary color */
  --accent: 40 100% 50%; /* Change accent color */
}
```

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
npm start
```

### Deployment on Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or with GitHub integration:

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Select Repository
4. Deploy

## 🌐 Deployment on Other Platforms

### Netlify

```bash
npm run build
# Built files are in .next directory
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

## 📱 SEO Optimization

- ✅ Optimized metadata
- ✅ Open Graph configuration
- ✅ Accessibility standards compliance
- ✅ Fast page loading
- ✅ Mobile-first indexing

## ⚙️ Common Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production version
npm start

# Check and lint code
npm run lint
```

## 📧 Email Integration

The contact form is configured to send emails to: **sam@voltaminelectric.com**

To enable email functionality, integrate with one of these services:

- **Resend** (recommended for Next.js)
- **SendGrid**
- **Mailgun**
- **AWS SES**
- **Firebase**

Update the `app/api/send-email/route.ts` file with your preferred email service.

## 🤝 Contributing

To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See `LICENSE` file for details.

## 📞 Contact & Support

For questions and support:

- 📧 Email: sam@voltaminelectric.com
- 📱 Phone: +1-818-699-2255
- 💬 WhatsApp: +1-818-699-2255
- 📸 Instagram: [@voltamin_electric](https://www.instagram.com/voltamin_electric/)

## 👨‍💻 Author

**Saeid Amini** - Professional Electrical Specialist

---

<div align="center">

Made with ❤️ by Saeid Amini

[Visit Website](https://voltaminelectric.com) | [Contact](mailto:sam@voltaminelectric.com) | [Instagram](https://www.instagram.com/voltamin_electric/)

</div>
