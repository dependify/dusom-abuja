import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: { title: string; description: string }[];
}

export function FormProgress({ currentStep, totalSteps, steps }: FormProgressProps) {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
        
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div
                key={index}
                className="flex flex-col items-center"
                style={{ width: `${100 / totalSteps}%` }}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2",
                    isCompleted && "bg-primary border-primary text-primary-foreground",
                    isCurrent && "bg-background border-primary text-primary ring-4 ring-primary/20",
                    !isCompleted && !isCurrent && "bg-background border-border text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <div className="mt-3 text-center hidden md:block">
                  <p
                    className={cn(
                      "text-xs font-medium transition-colors",
                      isCurrent ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Step Info */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          {steps[currentStep - 1]?.title}
        </h2>
        <p className="text-muted-foreground mt-1">
          {steps[currentStep - 1]?.description}
        </p>
        <p className="text-sm text-primary mt-2">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
}
