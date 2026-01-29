'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface ContentData {
  companyName: string
  hero: {
    subtitle: string
    description: string
  }
  about: {
    paragraph1: string
    paragraph2: string
    stats: {
      projects: string
      clients: string
      years: string
    }
  }
  services: {
    title: string
    subtitle: string
    items: Array<{
      icon: 'briefcase' | 'cloud' | 'lock' | 'mobile' | 'refresh' | 'tools'
      title: string
      description: string
    }>
  }
  contact: {
    address: string
    email: string
    phone: string
    title: string
    subtitle: string
  }
}

interface BilingualContent {
  en: ContentData
  id: ContentData
}

const defaultContentEn: ContentData = {
  companyName: 'PT MARVEL INDONESIA TEKNOLOGI',
  hero: {
    subtitle: 'Transforming Businesses Through Innovative IT Solutions',
    description: 'Your trusted partner for comprehensive IT consulting services, helping businesses navigate the digital landscape with confidence and expertise.',
  },
  about: {
    paragraph1: 'PT MARVEL INDONESIA TEKNOLOGI is a leading IT consulting firm dedicated to empowering businesses with cutting-edge technology solutions. We combine deep technical expertise with strategic business insight to deliver results that drive growth and innovation.',
    paragraph2: 'Our team of experienced consultants works closely with clients to understand their unique challenges and develop tailored solutions that align with their business objectives. From digital transformation to cloud migration, we provide end-to-end support throughout your IT journey.',
    stats: {
      projects: '100+',
      clients: '50+',
      years: '10+',
    },
  },
  services: {
    title: 'Our Services',
    subtitle: 'Comprehensive IT solutions tailored to your business needs',
    items: [
      {
        icon: 'briefcase',
        title: 'IT Strategy & Consulting',
        description: 'Strategic planning and advisory services to align your IT infrastructure with business goals and drive digital transformation.',
      },
      {
        icon: 'cloud',
        title: 'Cloud Solutions',
        description: 'Cloud migration, architecture design, and optimization services to help you leverage the power of cloud computing.',
      },
      {
        icon: 'lock',
        title: 'Cybersecurity',
        description: 'Comprehensive security assessments, implementation, and monitoring to protect your digital assets and data.',
      },
      {
        icon: 'mobile',
        title: 'Software Development',
        description: 'Custom software solutions and application development tailored to your specific business requirements.',
      },
      {
        icon: 'refresh',
        title: 'Digital Transformation',
        description: 'End-to-end digital transformation services to modernize your business processes and enhance operational efficiency.',
      },
      {
        icon: 'tools',
        title: 'IT Infrastructure',
        description: 'Design, implementation, and management of robust IT infrastructure to support your business operations.',
      },
    ],
  },
  contact: {
    address: 'Bellezza BSA GF Floor - Unit 33, Jalan Letjen Soepeno No.34, Arteri Permata Hijau, Desa/Kelurahan Grogol Utara, Kec. Kebayoran Lama, Kota Adm. Jakarta Selatan, Provinsi DKI Jakarta Kode Pos: 12210',
    email: 'marvelindonesiateknologi@gmail.com',
    phone: '0881081081788',
    title: 'Get In Touch',
    subtitle: 'Ready to transform your business? Let\'s discuss how we can help.',
  },
}

const defaultContentId: ContentData = {
  companyName: 'PT MARVEL INDONESIA TEKNOLOGI',
  hero: {
    subtitle: 'Mentransformasi Bisnis Melalui Solusi IT yang Inovatif',
    description: 'Mitra terpercaya Anda untuk layanan konsultasi IT yang komprehensif, membantu bisnis menavigasi lanskap digital dengan percaya diri dan keahlian.',
  },
  about: {
    paragraph1: 'PT MARVEL INDONESIA TEKNOLOGI adalah perusahaan konsultasi IT terkemuka yang berdedikasi untuk memberdayakan bisnis dengan solusi teknologi terkini. Kami menggabungkan keahlian teknis yang mendalam dengan wawasan bisnis strategis untuk memberikan hasil yang mendorong pertumbuhan dan inovasi.',
    paragraph2: 'Tim konsultan berpengalaman kami bekerja erat dengan klien untuk memahami tantangan unik mereka dan mengembangkan solusi yang disesuaikan yang selaras dengan tujuan bisnis mereka. Dari transformasi digital hingga migrasi cloud, kami memberikan dukungan end-to-end sepanjang perjalanan IT Anda.',
    stats: {
      projects: '100+',
      clients: '50+',
      years: '10+',
    },
  },
  services: {
    title: 'Layanan Kami',
    subtitle: 'Solusi IT komprehensif yang disesuaikan dengan kebutuhan bisnis Anda',
    items: [
      {
        icon: 'briefcase',
        title: 'Strategi & Konsultasi IT',
        description: 'Layanan perencanaan strategis dan konsultasi untuk menyelaraskan infrastruktur IT Anda dengan tujuan bisnis dan mendorong transformasi digital.',
      },
      {
        icon: 'cloud',
        title: 'Solusi Cloud',
        description: 'Layanan migrasi cloud, desain arsitektur, dan optimasi untuk membantu Anda memanfaatkan kekuatan komputasi cloud.',
      },
      {
        icon: 'lock',
        title: 'Keamanan Siber',
        description: 'Penilaian keamanan, implementasi, dan pemantauan komprehensif untuk melindungi aset digital dan data Anda.',
      },
      {
        icon: 'mobile',
        title: 'Pengembangan Perangkat Lunak',
        description: 'Solusi perangkat lunak khusus dan pengembangan aplikasi yang disesuaikan dengan kebutuhan bisnis spesifik Anda.',
      },
      {
        icon: 'refresh',
        title: 'Transformasi Digital',
        description: 'Layanan transformasi digital end-to-end untuk memodernisasi proses bisnis Anda dan meningkatkan efisiensi operasional.',
      },
      {
        icon: 'tools',
        title: 'Infrastruktur IT',
        description: 'Desain, implementasi, dan manajemen infrastruktur IT yang kuat untuk mendukung operasi bisnis Anda.',
      },
    ],
  },
  contact: {
    address: 'Bellezza BSA GF Floor - Unit 33, Jalan Letjen Soepeno No.34, Arteri Permata Hijau, Desa/Kelurahan Grogol Utara, Kec. Kebayoran Lama, Kota Adm. Jakarta Selatan, Provinsi DKI Jakarta Kode Pos: 12210',
    email: 'marvelindonesiateknologi@gmail.com',
    phone: '0881081081788',
    title: 'Hubungi Kami',
    subtitle: 'Siap untuk mentransformasi bisnis Anda? Mari diskusikan bagaimana kami dapat membantu.',
  },
}

const defaultContent: BilingualContent = {
  en: defaultContentEn,
  id: defaultContentId,
}

interface ContentContextType {
  content: BilingualContent
  getContent: (lang: 'en' | 'id') => ContentData
  updateContent: (lang: 'en' | 'id', newContent: Partial<ContentData>) => void
  resetContent: () => void
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<BilingualContent>(defaultContent)

  useEffect(() => {
    const saved = localStorage.getItem('siteContent')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setContent({ ...defaultContent, ...parsed })
      } catch (e) {
        console.error('Failed to parse saved content', e)
      }
    }
  }, [])

  const getContent = (lang: 'en' | 'id'): ContentData => {
    return content[lang]
  }

  const updateContent = (lang: 'en' | 'id', newContent: Partial<ContentData>) => {
    const updated = {
      ...content,
      [lang]: { ...content[lang], ...newContent },
    }
    setContent(updated)
    if (typeof window !== 'undefined') {
      localStorage.setItem('siteContent', JSON.stringify(updated))
    }
  }

  const resetContent = () => {
    setContent(defaultContent)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('siteContent')
    }
  }

  return (
    <ContentContext.Provider value={{ content, getContent, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within ContentProvider')
  }
  return context
}
