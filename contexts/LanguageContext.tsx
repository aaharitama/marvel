'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'id'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      admin: 'Admin',
    },
    hero: {
      title: 'PT MARVEL INDONESIA TEKNOLOGI',
      subtitle: 'Transforming Businesses Through Innovative IT Solutions',
      description: 'Your trusted partner for comprehensive IT consulting services, helping businesses navigate the digital landscape with confidence and expertise.',
      getStarted: 'Get Started',
      ourServices: 'Our Services',
    },
    about: {
      title: 'About Us',
      paragraph1: 'PT MARVEL INDONESIA TEKNOLOGI is a leading IT consulting firm dedicated to empowering businesses with cutting-edge technology solutions. We combine deep technical expertise with strategic business insight to deliver results that drive growth and innovation.',
      paragraph2: 'Our team of experienced consultants works closely with clients to understand their unique challenges and develop tailored solutions that align with their business objectives. From digital transformation to cloud migration, we provide end-to-end support throughout your IT journey.',
      projectsCompleted: 'Projects Completed',
      happyClients: 'Happy Clients',
      yearsExperience: 'Years Experience',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive IT solutions tailored to your business needs',
      itStrategy: {
        title: 'IT Strategy & Consulting',
        description: 'Strategic planning and advisory services to align your IT infrastructure with business goals and drive digital transformation.',
      },
      cloud: {
        title: 'Cloud Solutions',
        description: 'Cloud migration, architecture design, and optimization services to help you leverage the power of cloud computing.',
      },
      cybersecurity: {
        title: 'Cybersecurity',
        description: 'Comprehensive security assessments, implementation, and monitoring to protect your digital assets and data.',
      },
      software: {
        title: 'Software Development',
        description: 'Custom software solutions and application development tailored to your specific business requirements.',
      },
      digital: {
        title: 'Digital Transformation',
        description: 'End-to-end digital transformation services to modernize your business processes and enhance operational efficiency.',
      },
      infrastructure: {
        title: 'IT Infrastructure',
        description: 'Design, implementation, and management of robust IT infrastructure to support your business operations.',
      },
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Ready to transform your business? Let\'s discuss how we can help.',
      address: 'Address',
      email: 'Email',
      phone: 'Phone',
      yourName: 'Your Name',
      yourEmail: 'Your Email',
      subject: 'Subject',
      yourMessage: 'Your Message',
      sendMessage: 'Send Message',
    },
    footer: {
      rights: 'All rights reserved.',
    },
  },
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      services: 'Layanan',
      contact: 'Kontak',
      admin: 'Admin',
    },
    hero: {
      title: 'PT MARVEL INDONESIA TEKNOLOGI',
      subtitle: 'Mentransformasi Bisnis Melalui Solusi IT yang Inovatif',
      description: 'Mitra terpercaya Anda untuk layanan konsultasi IT yang komprehensif, membantu bisnis menavigasi lanskap digital dengan percaya diri dan keahlian.',
      getStarted: 'Mulai',
      ourServices: 'Layanan Kami',
    },
    about: {
      title: 'Tentang Kami',
      paragraph1: 'PT MARVEL INDONESIA TEKNOLOGI adalah perusahaan konsultasi IT terkemuka yang berdedikasi untuk memberdayakan bisnis dengan solusi teknologi terkini. Kami menggabungkan keahlian teknis yang mendalam dengan wawasan bisnis strategis untuk memberikan hasil yang mendorong pertumbuhan dan inovasi.',
      paragraph2: 'Tim konsultan berpengalaman kami bekerja erat dengan klien untuk memahami tantangan unik mereka dan mengembangkan solusi yang disesuaikan yang selaras dengan tujuan bisnis mereka. Dari transformasi digital hingga migrasi cloud, kami memberikan dukungan end-to-end sepanjang perjalanan IT Anda.',
      projectsCompleted: 'Proyek Selesai',
      happyClients: 'Klien Puas',
      yearsExperience: 'Tahun Pengalaman',
    },
    services: {
      title: 'Layanan Kami',
      subtitle: 'Solusi IT komprehensif yang disesuaikan dengan kebutuhan bisnis Anda',
      itStrategy: {
        title: 'Strategi & Konsultasi IT',
        description: 'Layanan perencanaan strategis dan konsultasi untuk menyelaraskan infrastruktur IT Anda dengan tujuan bisnis dan mendorong transformasi digital.',
      },
      cloud: {
        title: 'Solusi Cloud',
        description: 'Layanan migrasi cloud, desain arsitektur, dan optimasi untuk membantu Anda memanfaatkan kekuatan komputasi cloud.',
      },
      cybersecurity: {
        title: 'Keamanan Siber',
        description: 'Penilaian keamanan, implementasi, dan pemantauan komprehensif untuk melindungi aset digital dan data Anda.',
      },
      software: {
        title: 'Pengembangan Perangkat Lunak',
        description: 'Solusi perangkat lunak khusus dan pengembangan aplikasi yang disesuaikan dengan kebutuhan bisnis spesifik Anda.',
      },
      digital: {
        title: 'Transformasi Digital',
        description: 'Layanan transformasi digital end-to-end untuk memodernisasi proses bisnis Anda dan meningkatkan efisiensi operasional.',
      },
      infrastructure: {
        title: 'Infrastruktur IT',
        description: 'Desain, implementasi, dan manajemen infrastruktur IT yang kuat untuk mendukung operasi bisnis Anda.',
      },
    },
    contact: {
      title: 'Hubungi Kami',
      subtitle: 'Siap untuk mentransformasi bisnis Anda? Mari diskusikan bagaimana kami dapat membantu.',
      address: 'Alamat',
      email: 'Email',
      phone: 'Telepon',
      yourName: 'Nama Anda',
      yourEmail: 'Email Anda',
      subject: 'Subjek',
      yourMessage: 'Pesan Anda',
      sendMessage: 'Kirim Pesan',
    },
    footer: {
      rights: 'Hak cipta dilindungi.',
    },
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'en' || saved === 'id')) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
