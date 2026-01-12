

import { PHYSICS_SYLLABUS } from "@/features/data/physicsSyllabus";
import { CHEMISTRY_SYLLABUS } from "@/features/data/chemistrySyllabus";
import { MATHS_SYLLABUS } from "@/features/data/mathsSyllabus";
import { BIOLOGY_SYLLABUS } from "@/features/data/biologySyllabus";
import { axiosClient } from "@/lib/apiClient";

type SeedPayload = {
  subject: "Physics" | "Chemistry" | "Maths" | "Biology";
  syllabus: any[];
};

const seedSubject = async (payload: SeedPayload) => {
  const { data } = await axiosClient.post(
    "/syllabus-seed/bulk-seed",
    payload
  );
  return data;
};

export async function seedAllSubjects() {
  const results = [];

  results.push(
    await seedSubject({
      subject: "Physics",
      syllabus: PHYSICS_SYLLABUS,
    })
  );

  results.push(
    await seedSubject({
      subject: "Chemistry",
      syllabus: CHEMISTRY_SYLLABUS,
    })
  );

  results.push(
    await seedSubject({
      subject: "Maths",
      syllabus: MATHS_SYLLABUS,
    })
  );

  results.push(
    await seedSubject({
      subject: "Biology",
      syllabus: BIOLOGY_SYLLABUS,
    })
  );

  return results;
}
