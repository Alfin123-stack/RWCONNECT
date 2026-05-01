import { CheckCircle2 } from "lucide-react";
import { cn } from "@/utils";

export interface Step {
  id: number;
  title: string;
  desc: string;
}

interface StepIndicatorProps {
  steps: Step[];
  current: number;
}

/**
 * StepIndicator
 * Progress bar visual untuk multi-step form.
 * Dipakai di RegisterPage.
 */
export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2 mb-8" role="list" aria-label="Langkah pendaftaran">
      {steps.map((step, i) => {
        const isDone = current > step.id;
        const isActive = current === step.id;

        return (
          <div key={step.id} className="flex items-center gap-2" role="listitem">
            {/* Step circle + label */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                  isDone
                    ? "bg-emerald-500 text-white"
                    : isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-slate-100 text-slate-400",
                )}
                aria-current={isActive ? "step" : undefined}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.id}
              </div>

              {/* Label — hidden on mobile */}
              <div className="hidden sm:block">
                <p
                  className={cn(
                    "text-xs font-semibold leading-none",
                    isActive ? "text-slate-900" : "text-slate-400",
                  )}
                >
                  {step.title}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{step.desc}</p>
              </div>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 rounded-full w-6 sm:w-10 transition-all duration-500",
                  isDone ? "bg-emerald-400" : "bg-slate-200",
                )}
                aria-hidden
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
