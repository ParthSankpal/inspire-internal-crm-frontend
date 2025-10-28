import { Enquiry, Reminder } from "@/features/enquiries/types";
import { PaginatedResponse } from "@/features/pagination";
import { axiosClient } from "@/lib/apiClient";

// ✅ GET all enquiries
export async function getAllEnquiries(
  page = 1,
  limit = 10,
  search = "",
  status?: string
): Promise<PaginatedResponse<Enquiry>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
    ...(status ? { status } : {}),
  }).toString();

  const { data } = await axiosClient.get<PaginatedResponse<Enquiry>>(`/enquiries?${queryParams}`);
  return data;
}

// ✅ GET single enquiry by ID
export async function getEnquiryById(id: string): Promise<Enquiry> {
  const { data } = await axiosClient.get<Enquiry>(`/enquiries/${id}`);
  return data;
}

// ✅ CREATE enquiry
export async function createEnquiry(enquiry: Partial<Enquiry>): Promise<Enquiry> {
  const { data } = await axiosClient.post<Enquiry>("/enquiries/create", enquiry);
  return data ?? data; // backend may wrap in { enquiry }
}

// ✅ UPDATE enquiry
export async function updateEnquiry(id: string, updates: Partial<Enquiry>): Promise<Enquiry> {
  const { data } = await axiosClient.put<Enquiry>(`/enquiries/${id}`, updates);
  return data ?? data;
}

// ✅ DELETE enquiry
export async function deleteEnquiry(id: string): Promise<{ message: string }> {
  const { data } = await axiosClient.delete(`/enquiries/${id}`);
  return data;
}


// ✅ GET all reminders for an enquiry
export async function getReminders(enquiryId: string): Promise<Reminder[]> {
  const { data } = await axiosClient.get<Reminder[]>(`/enquiries/${enquiryId}/reminders`);
  return data;
}


// ✅ ADD reminder to enquiry
export async function addReminder(enquiryId: string, reminder: Partial<Reminder>): Promise<Reminder[]> {
  const { data } = await axiosClient.post<{ reminders: Reminder[] }>(
    `/enquiries/${enquiryId}/addreminders`,
    reminder
  );
  return data.reminders;
}

// ✅ UPDATE reminder
export async function updateReminder(
  enquiryId: string,
  reminderId: string,
  updates: Partial<Reminder>
): Promise<Reminder> {
  const { data } = await axiosClient.put<{ reminder: Reminder }>(
    `/enquiries/${enquiryId}/reminders/${reminderId}`,
    updates
  );
  return data.reminder;
}

// ✅ DELETE reminder
export async function deleteReminder(enquiryId: string, reminderId: string): Promise<{ message: string }> {
  const { data } = await axiosClient.delete(
    `/enquiries/${enquiryId}/reminders/${reminderId}`
  );
  return data;
}

// ✅ GET upcoming reminders (optional filter by days)
export async function getUpcomingReminders(withinDays = 7): Promise<Enquiry[]> {
  const { data } = await axiosClient.get<Enquiry[]>(
    `/enquiries/reminders/upcoming/list?withinDays=${withinDays}`
  );
  return data;
}
