import { FirstPagePDFInformation } from "@/root/interface/employee";
import { saveAs } from "file-saver";
import { PDFDocument, StandardFonts } from "pdf-lib";

async function createPDF(firstPageInformation: FirstPagePDFInformation): Promise<void> {
  const pdfDoc = await PDFDocument.create();

  const pages = pdfDoc.getPages();
  const firstPage = pages[0]; 

  pdfDoc.setTitle(firstPageInformation.title);
  pdfDoc.setAuthor(firstPageInformation.createdBy);
  pdfDoc.setCreationDate(firstPageInformation.dateCreated);

  firstPage.drawText("Filter by: " + firstPageInformation.filterUsed);

  pdfDoc.getPages().forEach(async (page, pageIndex) => {
    const { width, height } = page.getSize();
    const fontSize = 12;


    await page.drawText(` ${pageIndex + 1}`, {
      x: width - 100,
      y: height - 20,
      size: fontSize,
      font: await pdfDoc.embedFont(StandardFonts.TimesRoman),
    });
  });

  const pdfBytes = await pdfDoc.save();

}
