import nodemailer from 'nodemailer';

// ฟังก์ชันสำหรับจัดการ POST Request
export async function POST(req) {
  // แปลงข้อมูลจาก request body
  const body = await req.json();
  const { topic, name, phone, email, message } = body;

  // Debug: ตรวจสอบว่ามีค่า EMAIL_PASS หรือไม่
  console.log("✅ EMAIL_PASS =", process.env.EMAIL_PASS ? "Exists" : "❌ Not Set");

  // ตรวจสอบว่ามีข้อมูลที่จำเป็นครบหรือไม่
  if (!topic || !name || !phone || !message) {
    return new Response(
      JSON.stringify({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' }),
      { status: 400 }
    );
  }

  try {
    // สร้างตัวส่งอีเมลด้วย Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sb.evesang@gmail.com',
        pass: process.env.EMAIL_PASS,
      },
    });

    // สร้างรูปแบบเนื้อหาอีเมลให้เป็นทางการ
    const mailOptions = {
      from: '"SAKSIAM SOLAR - Contact Form" <sb.evesang@gmail.com>',
      to: 'sb.evesang@gmail.com',
      subject: '📩 ข้อความใหม่จากแบบฟอร์มติดต่อ - SAKSIAM SOLAR',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #006699;">📨 รายละเอียดการติดต่อจากเว็บไซต์</h2>
          <p><strong>หัวข้อ:</strong> ${topic}</p>
          <p><strong>ชื่อผู้ติดต่อ:</strong> ${name}</p>
          <p><strong>เบอร์โทรศัพท์:</strong> ${phone}</p>
          ${email ? `<p><strong>อีเมล:</strong> <a href="mailto:${email}">${email}</a></p>` : ''}
          <p><strong>ข้อความที่ส่งมา:</strong></p>
          <div style="margin-left: 1em; padding: 0.5em; background-color: #f9f9f9; border-left: 4px solid #006699;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
          <br/>
          <p style="font-size: 0.9em; color: #888;">-- ระบบอัตโนมัติจากเว็บไซต์ SAKSIAM SOLAR --</p>
        </div>
      `,
    };

    // ส่งอีเมล
    await transporter.sendMail(mailOptions);

    // ตอบกลับว่าการส่งสำเร็จ
    return new Response(
      JSON.stringify({ message: 'ส่งอีเมลเรียบร้อยแล้ว' }),
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ ส่งอีเมลไม่สำเร็จ:", error);

    return new Response(
      JSON.stringify({ message: 'เกิดข้อผิดพลาดภายในระบบ', error: error.message }),
      { status: 500 }
    );
  }
}
