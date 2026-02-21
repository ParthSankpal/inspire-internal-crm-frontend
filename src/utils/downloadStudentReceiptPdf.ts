import { axiosClient } from "@/lib/apiClient";

export async function downloadStudentReceiptPdf(
  transactionId: string,
  receiptNumber?: string
) {
  try {
    const response = await axiosClient.get(
      `/payments/receipt/${transactionId}`,
      {
        responseType: "blob",
      }
    );

    // Create blob
    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);

    // Create temporary link
    const link = document.createElement("a");
    link.href = url;

    // If receipt number exists use it as filename
    link.download = receiptNumber
      ? `${receiptNumber}.pdf`
      : `receipt-${transactionId}.pdf`;

    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("❌ Receipt PDF download failed:", error);
    throw error;
  }
}