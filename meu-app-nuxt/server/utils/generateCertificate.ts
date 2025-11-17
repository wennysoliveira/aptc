import puppeteer from 'html-pdf-node'
import { getCertificateTemplateBase64 } from './certificateTemplate'

export interface CertificateData {
  nome: string
  dataAssociacao: string
  cidade?: string
  estado?: string
}

export async function generateCertificatePDF(data: CertificateData): Promise<Buffer> {
  try {
    // Obter template base64
    const templateBase64 = getCertificateTemplateBase64()
    
    // Nome em maiúsculas
    const nomeMaiusculo = data.nome.toUpperCase()

    // HTML do certificado
    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificado - ${data.nome}</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 0;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .certificate {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('${templateBase64}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        .name-overlay {
            position: absolute;
            top: ${CERTIFICATE_CONFIG.namePosition.y}px;
            left: 50%;
            transform: translateX(-50%);
            width: ${CERTIFICATE_CONFIG.namePosition.width}px;
            text-align: ${CERTIFICATE_CONFIG.namePosition.align};
            font-family: '${CERTIFICATE_CONFIG.font.family}', Arial, sans-serif;
            font-size: ${CERTIFICATE_CONFIG.font.size}px;
            font-weight: bold;
            color: ${CERTIFICATE_CONFIG.font.color};
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            letter-spacing: 1px;
        }
        .date-overlay {
            position: absolute;
            top: ${CERTIFICATE_CONFIG.datePosition.y}px;
            left: 50%;
            transform: translateX(-50%);
            width: ${CERTIFICATE_CONFIG.datePosition.width}px;
            text-align: ${CERTIFICATE_CONFIG.datePosition.align};
            font-family: '${CERTIFICATE_CONFIG.dateFont.family}', Arial, sans-serif;
            font-size: ${CERTIFICATE_CONFIG.dateFont.size}px;
            color: ${CERTIFICATE_CONFIG.dateFont.color};
            text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="name-overlay">${nomeMaiusculo}</div>
        <div class="date-overlay">Associado desde: ${new Date(data.dataAssociacao).toLocaleDateString('pt-BR')}</div>
    </div>
</body>
</html>`

    // Configurações do PDF
    const options = {
      format: 'A4',
      orientation: 'portrait',
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      printBackground: true,
      displayHeaderFooter: false,
      preferCSSPageSize: true,
      quality: 100,
      width: '595px',
      height: '842px',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--force-device-scale-factor=1',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    }

    // Gerar PDF
    const file = { content: html }
    const pdfBuffer = await puppeteer.generatePdf(file, options)

    return pdfBuffer

  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
    throw error
  }
}