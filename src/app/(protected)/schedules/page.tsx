"use client";

import { getExamData } from "@/lib/getExamData";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

export default function AllSchedulesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const accordionRefs = useRef<HTMLDivElement[]>([]);

  const slugs = ["pcm", "pcb", "foundation", "foundation-cbse"];

  const programs = slugs
    .map((slug) => getExamData(slug))
    .filter((p) => p !== null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".schedule-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Accordion stagger
      const validAccordions = accordionRefs.current.filter(
        (el): el is HTMLDivElement => el !== null
      );

      gsap.fromTo(
        validAccordions,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 overflow-hidden"
    >
      {/* ===== Title ===== */}
      <h1 className="schedule-title text-3xl md:text-4xl font-bold">
        Academic Schedules
      </h1>
      <p className="text-gray-700 mt-3">
        Explore the structured daily routines and weekly evaluation systems
        across all our academic programs.
      </p>

      {/* ===== Accordion ===== */}
      <div className="mt-10">
        <Accordion type="single" collapsible className="w-full space-y-3">
          {programs.map((program, i) => (
            <AccordionItem
              key={i}
              value={`program-${i}`}
              className="group"
              ref={(el) => {
                if (el) accordionRefs.current[i] = el;
              }}
            >
              <AccordionTrigger className="text-lg font-semibold no-underline text-[#5696F6]">
                {program.title}
              </AccordionTrigger>

              <AccordionContent className="relative text-gray-700 space-y-6 leading-relaxed overflow-hidden">
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-data-[state=open]:opacity-10 transition-opacity duration-700 ease-in-out pointer-events-none select-none">
                  <span className="text-6xl md:text-8xl font-bold text-gray-400 whitespace-nowrap">
                    Inspire Academy
                  </span>
                </div>

                <div className="relative z-10 space-y-6">
                  {/* ===== Schedule Title ===== */}
                  <h2 className="text-2xl font-semibold">
                    {program.schedule.title}
                  </h2>

                  {/* ===== UPCOMING ===== */}
                  {program.schedule.type === "upcoming" ? (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md text-gray-700">
                      <p>{program.schedule.message}</p>
                    </div>
                  ) : (
                    <>
                      {/* ===== TABLE ===== */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 text-sm md:text-base">
                          <thead className="bg-blue-50">
                            <tr>
                              <th className="px-4 py-2 border">
                                Time Slot
                              </th>
                              <th className="px-4 py-2 border">
                                Activity Description
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-800">
                            {program.schedule.sessions.map((s, j) => (
                              <tr key={j}>
                                <td className="border px-4 py-2 w-1/3 text-center">
                                  {s.time}
                                </td>
                                <td className="border px-4 py-2">
                                  {s.activity}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* ===== WEEKLY TEST ===== */}
                      {"weeklyTest" in program.schedule &&
                        program.schedule.weeklyTest && (
                          <div className="mt-10">
                            <h2 className="text-2xl font-semibold mb-3">
                              {program.schedule.weeklyTest.title}
                            </h2>

                            <div className="text-gray-700 space-y-4">
                              {program.schedule.weeklyTest.engineering && (
                                <div>
                                  <p className="font-medium text-gray-800">
                                    Engineering Aspirants (PCM):{" "}
                                    <span className="text-[#5696F6]">
                                      {
                                        program.schedule.weeklyTest
                                          .engineering.marks
                                      }
                                    </span>
                                  </p>
                                  <p>
                                    {
                                      program.schedule.weeklyTest
                                        .engineering.description
                                    }
                                  </p>
                                </div>
                              )}

                              {program.schedule.weeklyTest.medical && (
                                <div>
                                  <p className="font-medium text-gray-800">
                                    Medical Aspirants (PCB):{" "}
                                    <span className="text-[#5696F6]">
                                      {
                                        program.schedule.weeklyTest.medical
                                          .marks
                                      }
                                    </span>
                                  </p>
                                  <p>
                                    {
                                      program.schedule.weeklyTest.medical
                                        .description
                                    }
                                  </p>
                                </div>
                              )}

                              {program.schedule.weeklyTest.description && (
                                <p>
                                  {
                                    program.schedule.weeklyTest.description
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}