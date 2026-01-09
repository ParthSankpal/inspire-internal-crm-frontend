import { axiosClient } from "@/lib/apiClient";


export async function downloadStudentLearningMapPdf(
  testId: string,
  studentId: string
) {
  try {
    const response = await axiosClient.get(
      `/analytics/test/${testId}/student/${studentId}/learning-map/pdf`,
      {
        responseType: "blob",
      }
    );

    // Create a blob URL
    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);

    // Create a temporary link
    const link = document.createElement("a");
    link.href = url;
    link.download = `learning-map-${studentId}.pdf`;

    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("❌ PDF download failed:", error);
    throw error;
  }
}
