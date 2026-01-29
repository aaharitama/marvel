'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useContent } from '@/contexts/ContentContext'
import type { ContentData } from '@/contexts/ContentContext'
import { isAuthenticated, logout } from '@/utils/auth'
import styles from './admin.module.css'

export default function AdminPage() {
  const router = useRouter()
  const { content, updateContent, resetContent } = useContent()
  const [activeLang, setActiveLang] = useState<'en' | 'id'>('en')
  const [formData, setFormData] = useState(content[activeLang])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!isAuthenticated()) {
        router.push('/admin/login')
      }
    }
  }, [router])

  useEffect(() => {
    if (isAuthenticated()) {
      setFormData(content[activeLang])
    }
  }, [content, activeLang])

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  if (typeof window !== 'undefined' && !isAuthenticated()) {
    return null
  }

  const handleChange = (path: string, value: any) => {
    const keys = path.split('.')
    const newData = JSON.parse(JSON.stringify(formData))
    let current: any = newData

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {}
      }
      current = current[keys[i]]
    }

    current[keys[keys.length - 1]] = value
    setFormData(newData)
  }

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...formData.services.items]
    newServices[index] = { ...newServices[index], [field]: value }
    setFormData({ ...formData, services: { ...formData.services, items: newServices } })
  }

  const handleSave = () => {
    updateContent(activeLang, formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    if (confirm(`Are you sure you want to reset ${activeLang.toUpperCase()} content to default values?`)) {
      const defaultContent: ContentData = activeLang === 'en' 
        ? {
            companyName: 'PT MARVEL INDONESIA TEKNOLOGI',
            hero: {
              subtitle: 'Transforming Businesses Through Innovative IT Solutions',
              description: 'Your trusted partner for comprehensive IT consulting services, helping businesses navigate the digital landscape with confidence and expertise.',
            },
            about: {
              paragraph1: 'PT MARVEL INDONESIA TEKNOLOGI is a leading IT consulting firm dedicated to empowering businesses with cutting-edge technology solutions. We combine deep technical expertise with strategic business insight to deliver results that drive growth and innovation.',
              paragraph2: 'Our team of experienced consultants works closely with clients to understand their unique challenges and develop tailored solutions that align with their business objectives. From digital transformation to cloud migration, we provide end-to-end support throughout your IT journey.',
              stats: { projects: '100+', clients: '50+', years: '10+' },
            },
            services: {
              title: 'Our Services',
              subtitle: 'Comprehensive IT solutions tailored to your business needs',
              items: [
                { icon: 'briefcase' as const, title: 'IT Strategy & Consulting', description: 'Strategic planning and advisory services to align your IT infrastructure with business goals and drive digital transformation.' },
                { icon: 'cloud' as const, title: 'Cloud Solutions', description: 'Cloud migration, architecture design, and optimization services to help you leverage the power of cloud computing.' },
                { icon: 'lock' as const, title: 'Cybersecurity', description: 'Comprehensive security assessments, implementation, and monitoring to protect your digital assets and data.' },
                { icon: 'mobile' as const, title: 'Software Development', description: 'Custom software solutions and application development tailored to your specific business requirements.' },
                { icon: 'refresh' as const, title: 'Digital Transformation', description: 'End-to-end digital transformation services to modernize your business processes and enhance operational efficiency.' },
                { icon: 'tools' as const, title: 'IT Infrastructure', description: 'Design, implementation, and management of robust IT infrastructure to support your business operations.' },
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
        : {
            companyName: 'PT MARVEL INDONESIA TEKNOLOGI',
            hero: {
              subtitle: 'Mentransformasi Bisnis Melalui Solusi IT yang Inovatif',
              description: 'Mitra terpercaya Anda untuk layanan konsultasi IT yang komprehensif, membantu bisnis menavigasi lanskap digital dengan percaya diri dan keahlian.',
            },
            about: {
              paragraph1: 'PT MARVEL INDONESIA TEKNOLOGI adalah perusahaan konsultasi IT terkemuka yang berdedikasi untuk memberdayakan bisnis dengan solusi teknologi terkini. Kami menggabungkan keahlian teknis yang mendalam dengan wawasan bisnis strategis untuk memberikan hasil yang mendorong pertumbuhan dan inovasi.',
              paragraph2: 'Tim konsultan berpengalaman kami bekerja erat dengan klien untuk memahami tantangan unik mereka dan mengembangkan solusi yang disesuaikan yang selaras dengan tujuan bisnis mereka. Dari transformasi digital hingga migrasi cloud, kami memberikan dukungan end-to-end sepanjang perjalanan IT Anda.',
              stats: { projects: '100+', clients: '50+', years: '10+' },
            },
            services: {
              title: 'Layanan Kami',
              subtitle: 'Solusi IT komprehensif yang disesuaikan dengan kebutuhan bisnis Anda',
              items: [
                { icon: 'briefcase' as const, title: 'Strategi & Konsultasi IT', description: 'Layanan perencanaan strategis dan konsultasi untuk menyelaraskan infrastruktur IT Anda dengan tujuan bisnis dan mendorong transformasi digital.' },
                { icon: 'cloud' as const, title: 'Solusi Cloud', description: 'Layanan migrasi cloud, desain arsitektur, dan optimasi untuk membantu Anda memanfaatkan kekuatan komputasi cloud.' },
                { icon: 'lock' as const, title: 'Keamanan Siber', description: 'Penilaian keamanan, implementasi, dan pemantauan komprehensif untuk melindungi aset digital dan data Anda.' },
                { icon: 'mobile' as const, title: 'Pengembangan Perangkat Lunak', description: 'Solusi perangkat lunak khusus dan pengembangan aplikasi yang disesuaikan dengan kebutuhan bisnis spesifik Anda.' },
                { icon: 'refresh' as const, title: 'Transformasi Digital', description: 'Layanan transformasi digital end-to-end untuk memodernisasi proses bisnis Anda dan meningkatkan efisiensi operasional.' },
                { icon: 'tools' as const, title: 'Infrastruktur IT', description: 'Desain, implementasi, dan manajemen infrastruktur IT yang kuat untuk mendukung operasi bisnis Anda.' },
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
      updateContent(activeLang, defaultContent)
      setFormData(defaultContent)
    }
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Admin Panel - Content Management</h1>
        <div className={styles.adminActions}>
          <Link href="/" className={styles.backButton}>← Back to Site</Link>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
          <button onClick={handleSave} className={styles.saveButton}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
          <button onClick={handleReset} className={styles.resetButton}>
            Reset {activeLang.toUpperCase()} to Default
          </button>
        </div>
      </div>

      {/* Language Tabs */}
      <div className={styles.languageTabs}>
        <button
          onClick={() => setActiveLang('en')}
          className={activeLang === 'en' ? styles.tabActive : styles.tab}
        >
          English (EN)
        </button>
        <button
          onClick={() => setActiveLang('id')}
          className={activeLang === 'id' ? styles.tabActive : styles.tab}
        >
          Bahasa Indonesia (ID)
        </button>
      </div>

      <div className={styles.adminContent}>
        <div className={styles.languageIndicator}>
          <span className={styles.indicatorLabel}>Editing Content for:</span>
          <span className={styles.indicatorValue}>
            {activeLang === 'en' ? '🇬🇧 English' : '🇮🇩 Bahasa Indonesia'}
          </span>
        </div>

        {/* Company Name */}
        <section className={styles.adminSection}>
          <h2 className={styles.sectionTitle}>
            Company Information <span className={styles.langTag}>({activeLang.toUpperCase()})</span>
          </h2>
          <div className={styles.formGroup}>
            <label>Company Name ({activeLang === 'en' ? 'EN' : 'ID'})</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className={styles.formInput}
              placeholder={activeLang === 'id' ? 'Masukkan nama perusahaan' : 'Enter company name'}
            />
          </div>
        </section>

        {/* Hero Section */}
        <section className={styles.adminSection}>
          <h2 className={styles.sectionTitle}>
            Hero Section <span className={styles.langTag}>({activeLang.toUpperCase()})</span>
          </h2>
          <div className={styles.formGroup}>
            <label>Subtitle ({activeLang === 'en' ? 'EN' : 'ID'})</label>
            <input
              type="text"
              value={formData.hero.subtitle}
              onChange={(e) => handleChange('hero.subtitle', e.target.value)}
              className={styles.formInput}
              placeholder={activeLang === 'id' ? 'Masukkan subtitle hero' : 'Enter hero subtitle'}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description ({activeLang === 'en' ? 'EN' : 'ID'})</label>
            <textarea
              value={formData.hero.description}
              onChange={(e) => handleChange('hero.description', e.target.value)}
              className={styles.formTextarea}
              rows={3}
              placeholder={activeLang === 'id' ? 'Masukkan deskripsi hero' : 'Enter hero description'}
            />
          </div>
        </section>

        {/* About Section */}
        <section className={styles.adminSection}>
          <h2 className={styles.sectionTitle}>
            About Section <span className={styles.langTag}>({activeLang.toUpperCase()})</span>
          </h2>
          <div className={styles.formGroup}>
            <label>Paragraph 1 ({activeLang === 'en' ? 'EN' : 'ID'})</label>
            <textarea
              value={formData.about.paragraph1}
              onChange={(e) => handleChange('about.paragraph1', e.target.value)}
              className={styles.formTextarea}
              rows={4}
              placeholder={activeLang === 'id' ? 'Masukkan paragraf pertama tentang kami' : 'Enter first paragraph about us'}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Paragraph 2 ({activeLang === 'en' ? 'EN' : 'ID'})</label>
            <textarea
              value={formData.about.paragraph2}
              onChange={(e) => handleChange('about.paragraph2', e.target.value)}
              className={styles.formTextarea}
              rows={4}
              placeholder={activeLang === 'id' ? 'Masukkan paragraf kedua tentang kami' : 'Enter second paragraph about us'}
            />
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.formGroup}>
              <label>Projects Completed ({activeLang === 'en' ? 'EN' : 'ID'})</label>
              <input
                type="text"
                value={formData.about.stats.projects}
                onChange={(e) => handleChange('about.stats.projects', e.target.value)}
                className={styles.formInput}
                placeholder={activeLang === 'id' ? 'Contoh: 100+' : 'Example: 100+'}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Happy Clients ({activeLang === 'en' ? 'EN' : 'ID'})</label>
              <input
                type="text"
                value={formData.about.stats.clients}
                onChange={(e) => handleChange('about.stats.clients', e.target.value)}
                className={styles.formInput}
                placeholder={activeLang === 'id' ? 'Contoh: 50+' : 'Example: 50+'}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Years Experience ({activeLang === 'en' ? 'EN' : 'ID'})</label>
              <input
                type="text"
                value={formData.about.stats.years}
                onChange={(e) => handleChange('about.stats.years', e.target.value)}
                className={styles.formInput}
                placeholder={activeLang === 'id' ? 'Contoh: 10+' : 'Example: 10+'}
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className={styles.adminSection}>
          <h2 className={styles.sectionTitle}>
            Services Section <span className={styles.langTag}>({activeLang.toUpperCase()})</span>
          </h2>
          <div className={styles.formGroup}>
            <label>Title ({activeLang === 'en' ? 'EN' : 'ID'})</label>
            <input
              type="text"
              value={formData.services.title}
              onChange={(e) => handleChange('services.title', e.target.value)}
              className={styles.formInput}
              placeholder={activeLang === 'id' ? 'Masukkan judul layanan' : 'Enter services title'}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Subtitle ({activeLang === 'en' ? 'EN' : 'ID'})</label>
            <input
              type="text"
              value={formData.services.subtitle}
              onChange={(e) => handleChange('services.subtitle', e.target.value)}
              className={styles.formInput}
              placeholder={activeLang === 'id' ? 'Masukkan subtitle layanan' : 'Enter services subtitle'}
            />
          </div>
          <div className={styles.servicesList}>
            {formData.services.items.map((service, index) => (
              <div key={index} className={styles.serviceEditor}>
                <h3 className={styles.serviceEditorTitle}>
                  Service {index + 1} <span className={styles.langTag}>({activeLang.toUpperCase()})</span>
                </h3>
                <div className={styles.formGroup}>
                  <label>Icon Type</label>
                  <select
                    value={service.icon}
                    onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                    className={styles.formInput}
                  >
                    <option value="briefcase">Briefcase</option>
                    <option value="cloud">Cloud</option>
                    <option value="lock">Lock</option>
                    <option value="mobile">Mobile</option>
                    <option value="refresh">Refresh</option>
                    <option value="tools">Tools</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Title ({activeLang === 'en' ? 'EN' : 'ID'})</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                    className={styles.formInput}
                    placeholder={activeLang === 'id' ? 'Masukkan judul layanan' : 'Enter service title'}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Description ({activeLang === 'en' ? 'EN' : 'ID'})</label>
                  <textarea
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                    className={styles.formTextarea}
                    rows={3}
                    placeholder={activeLang === 'id' ? 'Masukkan deskripsi layanan' : 'Enter service description'}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.adminSection}>
          <h2 className={styles.sectionTitle}>
            Contact Section <span className={styles.langTag}>({activeLang.toUpperCase()})</span>
          </h2>
          <div className={styles.formGroup}>
            <label>Title ({activeLang === 'en' ? 'EN' : 'ID'})</label>
            <input
              type="text"
              value={formData.contact.title}
              onChange={(e) => handleChange('contact.title', e.target.value)}
              className={styles.formInput}
              placeholder={activeLang === 'id' ? 'Masukkan judul kontak' : 'Enter contact title'}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Subtitle ({activeLang === 'en' ? 'EN' : 'ID'})</label>
            <input
              type="text"
              value={formData.contact.subtitle}
              onChange={(e) => handleChange('contact.subtitle', e.target.value)}
              className={styles.formInput}
              placeholder={activeLang === 'id' ? 'Masukkan subtitle kontak' : 'Enter contact subtitle'}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Address</label>
            <textarea
              value={formData.contact.address}
              onChange={(e) => handleChange('contact.address', e.target.value)}
              className={styles.formTextarea}
              rows={3}
              placeholder={activeLang === 'id' ? 'Masukkan alamat' : 'Enter address'}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={formData.contact.email}
              onChange={(e) => handleChange('contact.email', e.target.value)}
              className={styles.formInput}
              placeholder="email@example.com"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone</label>
            <input
              type="text"
              value={formData.contact.phone}
              onChange={(e) => handleChange('contact.phone', e.target.value)}
              className={styles.formInput}
              placeholder={activeLang === 'id' ? 'Masukkan nomor telepon' : 'Enter phone number'}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
