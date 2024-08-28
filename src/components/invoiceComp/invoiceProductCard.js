import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from 'react-bootstrap';

const ExportToPDF = ({ user,data }) => {
  const handleExport = () => {
    // Sample data
    // const data = [
    //   { productName: 'Product 1', description: 'Description 1', price: 10, quantity: 2 },
    //   { productName: 'Product 2', description: 'Description 2', price: 20, quantity: 3 },
    //   { productName: 'Product 3', description: 'Description 3', price: 15, quantity: 5 },
    // ];

    // Generate random invoice number
    const invoiceNumber = Math.floor(Math.random() * 1000000);

    // Get the current date and due date
    const currentDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(currentDate.getDate() + 7);

    const formatDate = (date) => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    };

    // Calculate the total amount
    const totalAmount = data.reduce((sum, item) => sum + item.price * 1, 0);

    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Add dotted margin
    doc.setLineWidth(0.5);
    doc.setLineDash([2, 2], 0); // 2px dashed line
    doc.rect(10, 10, 190, 277); // Draws a rectangle around the page (A4 size)

    // Set the font to bold
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('INVOICE', 105, 20, null, null, 'center');

    // Reset the font to normal for the rest of the content
    doc.setFont('helvetica', 'normal');

    // Add Company Name and Details
    doc.setFontSize(14);
    doc.text('Lush & Glow Lotion Store', 105, 40, null, null, 'center');
    doc.setFontSize(10);
    doc.text('lushandglowlotionstore@gmail.com', 105, 45, null, null, 'center');
    doc.text('Tiko Cameroon', 105, 50, null, null, 'center');
    doc.text('+237 671439639', 105, 55, null, null, 'center');

    // Draw a line
    doc.setLineWidth(1);
    doc.setLineDash([]); // Reset to solid line
    doc.line(15, 65, 195, 65); // x1, y1, x2, y2

    // Invoice and Date Information on the right
    doc.setFontSize(12);

    // Invoice Number
    doc.text('Invoice #:', 140, 75);
    doc.setFont('helvetica', 'bold');
    doc.text(`${invoiceNumber}`, 160, 75); // Value positioned 2px away from the label
    doc.setFont('helvetica', 'normal');

    // Date
    doc.text('Date:', 140, 82);
    doc.setFont('helvetica', 'bold');
    doc.text(`${formatDate(currentDate)}`, 160, 82); // Value positioned 2px away from the label
    doc.setFont('helvetica', 'normal');

    // Invoice Due Date
    doc.text('Invoice Due Date:', 140, 89);
    doc.setFont('helvetica', 'bold');
    doc.text(`${formatDate(dueDate)}`, 175, 89); // Value positioned 2px away from the label

    // Bill To Information on the left
    doc.setFont('helvetica', 'normal');
    doc.text('Bill To:', 15, 75);

    // Name
    doc.text('Name:', 15, 82);
    doc.setFont('helvetica', 'bold');
    doc.text(user.name, 35, 82); // Value positioned 2px away from the label
    doc.setFont('helvetica', 'normal');

    // Address
    doc.text('Address:', 15, 89);
    doc.setFont('helvetica', 'bold');
    doc.text(user.email, 35, 89); // Value positioned 2px away from the label

    // Define columns and data
    const columns = ['Product Name', 'Description', 'Price(FCFA)', 'Quantity', 'Total(FCFA)'];
    const rows = data.map(item => [
      item.name,
      item.description,
      item.price.toFixed(1),
      1,
      (item.price * 1).toFixed(1),
    ]);

    // Add table to the PDF below the header section
    doc.autoTable(columns, rows, { startY: 115 });

    // Add "Notes" and "Total" section after the table
    const finalY = doc.lastAutoTable.finalY + 10; // Position after the table

    // Notes Section
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('NOTES:', 15, finalY);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for purchasing Fritz Body Lotion! Our products are crafted with care to provide you with the best skincare experience. Please contact us if you have any questions or concerns regarding your order. We appreciate your business!', 15, finalY + 7, { maxWidth: 125 });

    // Total Section with Background
    doc.setFillColor(76, 0, 153); // Dark purple background color
    doc.rect(140, finalY - 5, 55, 20, 'F'); // Background for the total section

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255); // White text color
    doc.setFont('helvetica', 'bold');
    doc.text(`${totalAmount} FCFA`, 195, finalY + 7, null, null, 'right');

    doc.setFontSize(10);
    doc.text('TOTAL', 142, finalY);

    // Save the PDF with a specified name
    doc.save(`${user.name}-invoice-${invoiceNumber}}.pdf`);
  };

  return (
    <div>
      <Button onClick={handleExport} style={{ backgroundColor: 'blue', borderColor: 'blue' }}>
        Download Invoice
      </Button>
    </div>
  );
};

export default ExportToPDF;
