'use client';

import { useEffect, useState, useMemo } from "react";
import { useLocale } from '../Context/LocaleContext';
import { FaLine } from "react-icons/fa6";
import { FaFacebookSquare,FaYoutube  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";
import '../../styles/contact.css';
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Page() {
  const { messages, locale } = useLocale(); // ✅ ใช้ locale จาก Context

  const [contacts, setContacts] = useState([]);
  const [socials, setSocials] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const iconComponentByKey = useMemo(() => ({
    facebook: <FaFacebookSquare color="#1877f2" size={36} />,
    youtube: <FaYoutube  color="#FF0033" size={36} />,
    line: <FaLine color="#00c300" size={35} />
  }), []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setContacts(data.contacts || []);
        setSocials(data.socials || []);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const [formData, setFormData] = useState({
    topic: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const getClassName = (value, base) =>
    value.trim() === "" ? `${base} placeholder-gray` : `${base} input-filled`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "name") {
      newValue = value.replace(/[^\u0E01-\u0E4F\u0E5A-\u0E7Fa-zA-Z\s]/g, '');
    } else if (name === "phone") {
      newValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === "email") {
      newValue = value.replace(/[^\x00-\x7F]/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'topic':
        return value ? '' : "กรุณาเลือกหัวข้อที่ต้องการสอบถาม";
      case 'name':
        if (!value.trim()) return "กรุณากรอกชื่อและนามสกุลของท่าน";
        const validName = /^[\u0E01-\u0E4E\u0E50-\u0E59a-zA-Z\s]+$/.test(value.trim());
        const repeat = /(.)\1{4,}/.test(value);
        const word = /[ก-๙]{3,}|[a-zA-Z]{3,}/.test(value);
        if (!validName || repeat || !word) return "กรุณากรอกชื่อและนามสกุลให้ถูกต้อง";
        return '';
      case 'phone':
        if (!value) return "กรุณากรอกหมายเลขโทรศัพท์";
        if (value.length !== 10) return "กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก";
        return '';
      case 'email':
        if (!value) return '';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          return "กรุณากรอกรูปแบบอีเมล์ให้ถูกต้อง เช่น example@example.com";
        return '';
      case 'message':
        const clean = value.trim();
        const pattern = /^[ก-๙a-zA-Z0-9\s.,!?()'"-]+$/;
        const repeatMsg = /(.)\1{4,}/.test(clean);
        const long = clean.length > 1000;
        const hasWords = clean.split(/\s+/).length >= 1;
        if (!clean) return "กรุณากรอกข้อความที่ท่านต้องการสอบถาม";
        if (!pattern.test(clean) || repeatMsg || long || !hasWords)
          return "กรุณากรอกข้อความที่ท่านต้องการสอบถามให้ถูกต้องและชัดเจน";
        return '';
      default:
        return '';
    }
  };

  const validateAll = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched({
      topic: true, name: true, phone: true, email: true, message: true
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // ✅ ป้องกันกดซ้ำ
    if (!validateAll()) return;

    setIsSubmitting(true);


    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("ส่งอีเมลไม่สำเร็จ");

      // ใช้ toast แจ้งเตือนแทน alert
      toast.success("ส่งข้อมูลเรียบร้อยแล้ว 🎉", {
        position: 'top-center',
        autoClose: 2000 // ...วินาที
      });

      setFormData({ topic: "", name: "", phone: "", email: "", message: "" });
      setTouched({});
      setErrors({});
    } catch (err) {
      toast.error("เกิดข้อผิดพลาดในการส่งข้อความ: " + err.message, {
        position: 'top-center',
        autoClose: 2000 // ...วินาที
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (id) => {
    switch (id) {
      case 1: return <img src="/images/building.png" alt="Building" style={{ width: 28, height: 28 }} />;
      case 2: return <img src="/images/phone.png" alt="Phone" style={{ width: 25, height: 25 }} />;
      case 3: return <img src="/images/mail.png" alt="Email" style={{ width: 28, height: 28 }} />;
      default: return null;
    }
  };

  return (
    <div className="layout-container">
      {/* ToastContainer ต้องมีใน JSX เพื่อแสดง toast */}
      <ToastContainer
        position="top-center"
        toastStyle={{
          margin: 'auto',
          minWidth: '300px',
          textAlign: 'center',
          fontWeight: '600',
          fontSize: '1.1rem'
        }}
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          position: 'fixed',
          zIndex: 9999,
        }}
      />

      <div className="banner-container">
        <picture>
          <source srcSet="/images/contact_banner67_rp.jpg" media="(max-width: 768px)" />
          <img src="/images/contact_banner67.jpg" alt="Contact Banner" className="banner-image" />
        </picture>
      </div>

      <main className="layout-container">
        <p className="centeredText">{messages.contact}</p>
        <div className="contactGrid">
          {/* ซ้ายบน: ข้อมูลบริษัท */}
          <div className="gridItem companyInfo">
            <h1 className="companyName">{messages.company}</h1>
            {contacts.map((item, index) => (
              <p key={index} className="infoItem">
                <span className="icon">{getIcon(item.id)}</span>
                <span>
                  {locale === 'th'
                    ? item.id === 1
                      ? item.WorkforceTH
                      : `${item.WorkforceTH} | ${item.WorkforceTH1}`
                    : item.id === 1
                      ? item.WorkforceENG
                      : `${item.WorkforceENG} | ${item.WorkforceENG1}`}
                </span>
              </p>
            ))}
          </div>

          {/* ขวาบน: รูปบริษัท */}
          <div className="gridItem companyImageWrapper">
            <img src="/images/company.jpg" alt="อาคารบริษัท" className="companyImage" />
          </div>

          {/* ซ้ายล่าง: แผนที่ */}
          <div className="gridItem googleMapWrapper">
            <iframe
              className="googleMap"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3802.5794620153247!2d100.0844677759578!3d17.622693595982284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30df302208341cc1%3A0x338a6ece4ceca2fe!2z4Lia4Lij4Li04Lip4Lix4LiXIOC4qOC4seC4geC4lOC4tOC5jOC4quC4ouC4suC4oeC4peC4tOC4quC4i-C4tOC5iOC4hyDguIjguLPguIHguLHguJQgKOC4oeC4q-C4suC4iuC4mSkg4Liq4Liz4LiZ4Lix4LiB4LiH4Liy4LiZ4LmD4Lir4LiN4LmIIOC5geC4peC4sCDguKrguLLguILguLLguK3guLjguJXguKPguJTguLTguJXguJbguYw!5e0!3m2!1sen!2sth!4v1747991429060!5m2!1sen!2sth"
            ></iframe>
          </div>

          {/* ขวาล่าง: ช่องทางติดต่อและโซเชียลมีเดีย */}
          <div className="gridItem socialSection">
            <h1 className="communicationName">{messages.communication}</h1>
            <div className="socialLinks">

              {socials.map((item, index) => (
                <div key={index} className="socialItem" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="iconFL">{iconComponentByKey[item.icon]}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {item.name} | {item.name1}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr
          style={{
            border: 'none',
            borderTop: '2px solid #CBDCEB',
            width: 'calc(100% - 5px)', // ลด 10px ซ้าย + ขวา
            margin: '1rem 10px'
          }}
        />

        <h1 style={{ textAlign: 'center', padding: '0.5rem', color: '#102E50', fontWeight: 300 }}>{messages.ask}</h1>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-grid">
            {/* Select Topic */}
            <label htmlFor="topic" className="form-label">{messages.selecttop} *</label>
            <select id="topic" name="topic" value={formData.topic}
              onChange={handleChange}
              onBlur={() => setTouched(prev => ({ ...prev, topic: true }))}
              className={getClassName(formData.topic, "form-input")}>
              <option value="">{messages.pleaseselect}**</option>
              <option>{messages.inquiries1}</option>
              <option>{messages.inquiries2}</option>
              <option>{messages.inquiries3}</option>
            </select>
            {touched.topic && errors.topic && <p className="error-text">*{errors.topic}</p>}

            {/* Name */}
            <label className="form-label">{messages.namelast} *</label>
            <input type="text" name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
              placeholder={`${messages.please_fill}**`}
              className={getClassName(formData.name, "form-input")}
            />
            {touched.name && errors.name && <p className="error-text">*{errors.name}</p>}

            {/* Phone */}
            <label className="form-label">{messages.pnumber} *</label>
            <input type="tel" name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
              placeholder={`${messages.onlyphone} (0912345678)**`}
              className={getClassName(formData.phone, "form-input")}
              inputMode="numeric" maxLength={10}
            />
            {touched.phone && errors.phone && <p className="error-text">*{errors.phone}</p>}

            {/* Email */}
            <label className="form-label">อีเมล์ (ถ้ามี)</label>
            <input type="email" name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
              placeholder="example@example.com"
              className={getClassName(formData.email, "form-input")}
            />
            {touched.email && errors.email && <p className="error-text">*{errors.email}</p>}

            {/* Message */}
            <label className="form-label">ฝากข้อความ *</label>
            <textarea name="message" rows={4}
              value={formData.message}
              onChange={handleChange}
              onBlur={() => setTouched(prev => ({ ...prev, message: true }))}
              className={getClassName(formData.message, "form-textarea")}
            />
            {touched.message && errors.message && <p className="error-text">*{errors.message}</p>}
          </div>

          <div className="form-submit" style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
            <button type="submit" className="form-button btn-orange" disabled={isSubmitting}>
              <MdEmail style={{ fontSize: '1.3em' }} /> ส่งข้อความ
            </button>
            <Link href="/" passHref>
              <button type="button" className="form-button btn-blue">
                <IoChevronBackOutline style={{ fontSize: '1.3em' }} /> {messages.back}
              </button>
            </Link>
          </div>
        </form>
      </main>

    </div>
  );
}