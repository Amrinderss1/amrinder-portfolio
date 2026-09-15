import sys
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def build_pdf():
    pdf_path = r"e:\SelfResume\Amrinder_Pal_Singh_Resume.pdf"
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#1E293B'),
        alignment=1 # Center
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#475569'),
        alignment=1
    )
    
    contact_style = ParagraphStyle(
        'DocContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#64748B'),
        alignment=1
    )
    
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=8,
        spaceAfter=4
    )
    
    job_header = ParagraphStyle(
        'JobHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=6,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#334155'),
        spaceBefore=2,
        spaceAfter=2
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#334155'),
        leftIndent=12,
        firstLineIndent=-8,
        spaceBefore=1,
        spaceAfter=1
    )

    story = []
    
    # Header
    story.append(Paragraph("Amrinder Pal Singh", title_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Associate Consultant – Infosys Limited", subtitle_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("New Delhi, India &nbsp;|&nbsp; sidhuamrinderpal@gmail.com &nbsp;|&nbsp; linkedin.com/in/amrinderss1/", contact_style))
    story.append(Spacer(1, 8))
    
    # Section Divider Line
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0284C7'), spaceBefore=2, spaceAfter=8))
    
    # Professional Summary
    story.append(Paragraph("Professional Summary", section_heading))
    story.append(Paragraph(
        "Associate Consultant with 5+ years of experience in Endpoint Management and Enterprise Mobility. "
        "Skilled in Microsoft Intune, SCCM (MECM), VMware Workspace ONE (AirWatch), and Active Directory, with expertise "
        "in application deployment, patch management, compliance enforcement, and escalation handling. Experienced in "
        "troubleshooting endpoint issues and supporting enterprise environments across global regions.",
        body_style
    ))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#CBD5E1'), spaceBefore=4, spaceAfter=6))
    
    # Technical Expertise
    story.append(Paragraph("Technical Expertise", section_heading))
    story.append(Paragraph("<b>Device & Endpoint Management:</b>", body_style))
    story.append(Paragraph("&bull; Intune (iOS, Android, Windows), Compliance, App Publishing, Configuration Profiles", bullet_style))
    story.append(Paragraph("&bull; SCCM: Application Deployment, Task Sequences, Co-Management, Logs Analysis", bullet_style))
    story.append(Paragraph("&bull; AirWatch (VMware Workspace ONE): Android MDM/MAM, Application Lifecycle Management, Device Enrollment, Compliance Policy Enforcement, Configuration Profile Deployment", bullet_style))
    story.append(Paragraph("&bull; Patch Management: Feature/Quality Updates, Windows Autopilot", bullet_style))
    
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Scripting & Tools:</b>", body_style))
    story.append(Paragraph("&bull; PowerShell, Git, ServiceNow (Admin/Dev), Jira, Windows Server, Azure Portal", bullet_style))
    story.append(Paragraph("&bull; Programming: Java, Python, C++, C#, Web (HTML, CSS, PHP, JavaScript, jQuery, MySQL)", bullet_style))
    
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#CBD5E1'), spaceBefore=4, spaceAfter=6))
    
    # Professional Experience
    story.append(Paragraph("Professional Experience", section_heading))
    
    # Exp 1
    story.append(Paragraph("<b>Associate Consultant – Mobility (MDM/MAM) Team</b> | <i>Infosys Limited</i> | Nov 2025 – Present", job_header))
    story.append(Paragraph("&bull; Manage devices using VMware Workspace ONE (AirWatch), including enrollment, compliance, and configuration management.", bullet_style))
    story.append(Paragraph("&bull; Deploy enterprise applications and enforce device configuration profiles across managed endpoints.", bullet_style))
    story.append(Paragraph("&bull; Administer compliance policies and support day-to-day MDM operations.", bullet_style))
    story.append(Paragraph("&bull; Troubleshoot mobility-related issues and serve as the primary escalation point for device management incidents.", bullet_style))
    story.append(Paragraph("&bull; Collaborate with client teams to ensure timely resolution of issues and adherence to SLA requirements.", bullet_style))
    
    # Exp 2
    story.append(Paragraph("<b>System Engineer – Deployment Team</b> | <i>Tata Consultancy Services (TCS)</i> | Feb 2024 – Oct 2025", job_header))
    story.append(Paragraph("&bull; Managed application deployments using SCCM and Microsoft Intune across LATAM and EMEA regions.", bullet_style))
    story.append(Paragraph("&bull; Investigated and resolved deployment failures through log analysis and troubleshooting.", bullet_style))
    story.append(Paragraph("&bull; Implemented Windows Feature Updates and Quality Updates using Intune Update Rings.", bullet_style))
    story.append(Paragraph("&bull; Managed co-management between SCCM and Intune in hybrid environments.", bullet_style))
    story.append(Paragraph("&bull; Troubleshot Active Directory authentication and network-related deployment issues.", bullet_style))
    story.append(Paragraph("&bull; Created SOPs and Knowledge Base articles for recurring issues and operational support.", bullet_style))

    # Exp 3
    story.append(Paragraph("<b>Assistant System Engineer – Mobility (MDM) Team</b> | <i>Tata Consultancy Services (TCS)</i> | Feb 2023 – Feb 2024", job_header))
    story.append(Paragraph("&bull; Published Win32, MSI, and mobility applications globally using Microsoft Intune.", bullet_style))
    story.append(Paragraph("&bull; Handled escalations related to application deployment, compliance, and authentication issues.", bullet_style))
    story.append(Paragraph("&bull; Managed compliance policies and configuration profiles for enterprise devices.", bullet_style))
    story.append(Paragraph("&bull; Documented recurring issues and resolutions for Service Desk reference and operational support.", bullet_style))

    # Exp 4
    story.append(Paragraph("<b>System Analyst – Level 2 Operations</b> | <i>Tata Consultancy Services (TCS)</i> | Feb 2022 – Feb 2023", job_header))
    story.append(Paragraph("&bull; Monitored device compliance, resolved incidents, and managed application assignments.", bullet_style))
    story.append(Paragraph("&bull; Handled Active Directory requests including password resets, permissions, and account unlocks.", bullet_style))
    story.append(Paragraph("&bull; Assisted in troubleshooting network and authentication-related issues for end users.", bullet_style))

    # Exp 5
    story.append(Paragraph("<b>Graduate Trainee</b> | <i>Tata Consultancy Services (TCS)</i> | Feb 2021 – Feb 2022", job_header))
    story.append(Paragraph("&bull; Supported enterprise IT operations and gained hands-on experience with Active Directory and endpoint support.", bullet_style))

    # Exp 6
    story.append(Paragraph("<b>Software Programmer Intern</b> | <i>ARI Simulation Pvt. Ltd.</i> | Jun 2019 – Aug 2019", job_header))
    story.append(Paragraph("&bull; Gained practical exposure to maritime simulation technologies and software engineering practices in a professional environment.", bullet_style))

    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#CBD5E1'), spaceBefore=4, spaceAfter=6))

    # Projects
    story.append(Paragraph("Projects", section_heading))
    story.append(Paragraph("<b>UEM Sentinel — Desktop Administration & Automation Console</b>", job_header))
    story.append(Paragraph("<i>Technologies: Python, PySide6, SQLite, REST APIs, Ollama</i>", body_style))
    story.append(Paragraph("&bull; Developed a desktop administration tool for VMware Workspace ONE UEM (AirWatch) to monitor and manage endpoint operations.", bullet_style))
    story.append(Paragraph("&bull; Integrated REST APIs and SQLite for data retrieval and local caching.", bullet_style))
    story.append(Paragraph("&bull; Implemented natural language queries and reporting capabilities for administrative tasks.", bullet_style))

    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#CBD5E1'), spaceBefore=4, spaceAfter=6))

    # Education
    story.append(Paragraph("Education", section_heading))
    story.append(Paragraph("&bull; <b>MCA</b> – Chandigarh University | 2024", bullet_style))
    story.append(Paragraph("&bull; <b>BCA</b> – GGSIPU, Delhi | 2020", bullet_style))

    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#CBD5E1'), spaceBefore=4, spaceAfter=6))

    # Certifications
    story.append(Paragraph("Certifications", section_heading))
    story.append(Paragraph("&bull; Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate – Oracle | Jan 2026", bullet_style))
    story.append(Paragraph("&bull; Oracle Cloud Infrastructure 2025 Foundations Associate – Oracle | Jan 2026", bullet_style))
    story.append(Paragraph("&bull; Intune with Microsoft Endpoint Manager – Udemy", bullet_style))
    story.append(Paragraph("&bull; The Complete ServiceNow Developer Course – Udemy", bullet_style))
    story.append(Paragraph("&bull; Programming in C++ – IIT Bombay", bullet_style))
    story.append(Paragraph("&bull; Java Programming – IIT Bombay", bullet_style))
    story.append(Paragraph("&bull; PHP/MySQL Web Technologies – Isaac IT Labs", bullet_style))
    story.append(Paragraph("&bull; Google Play Store Listing Certificate – Google", bullet_style))
    story.append(Paragraph("&bull; Microsoft MD-102: Endpoint Administrator Associate (In Progress)", bullet_style))

    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#CBD5E1'), spaceBefore=4, spaceAfter=6))

    # Awards & Recognition
    story.append(Paragraph("Awards & Recognition", section_heading))
    story.append(Paragraph("&bull; 6x On-the-Spot Awards for outstanding performance & client appreciations (2022–2023)", bullet_style))
    story.append(Paragraph("&bull; Contextual Masters Award – Jan 2024", bullet_style))
    story.append(Paragraph("&bull; Service Commitment Award – Feb 2024", bullet_style))
    story.append(Paragraph("&bull; Client Appreciation Notes (Mar & Oct 2023)", bullet_style))

    doc.build(story)
    print("PDF generated successfully at e:\\SelfResume\\Amrinder_Pal_Singh_Resume.pdf")

if __name__ == '__main__':
    build_pdf()
