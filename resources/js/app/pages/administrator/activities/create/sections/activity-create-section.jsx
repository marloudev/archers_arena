import { useState } from "react";
import Button from "@/app/_components/button";
import { CheckIcon } from "@heroicons/react/24/solid";
import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Section4 from "./section4";
import { useForm } from "react-hook-form";
import store from "@/app/store/store";
import { create_activities_thunk } from "@/app/redux/activity-thunk";
import Swal from "sweetalert2";
import moment from "moment";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ActivityCreateSection() {
    const [currentStep, setCurrentStep] = useState(0); // start at second step (index 1)
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const steps = [
        {
            id: "01",
            name: "Activity",
            description: "1st Section",
            href: "#",
            status: "complete",
        },
        {
            id: "02",
            name: "Book Schedule",
            description: "2nd Section",
            href: "#",
            status: "current",
        },
        {
            id: "03",
            name: "Book Pricing",
            description: "3rd Section",
            href: "#",
            status: "upcoming",
        },
        {
            id: "04",
            name: "Add Ons",
            description: "4th Section",
            href: "#",
            status: "upcoming",
        },
    ];

    const handleNext = () => {
        handleSubmit((data) => {
            if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
            }
        })();
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const updatedSteps = steps.map((step, idx) => {
        if (idx < currentStep) return { ...step, status: "complete" };
        if (idx === currentStep) return { ...step, status: "current" };
        return { ...step, status: "upcoming" };
    });

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append(
            "product_code",
            `PRODC${moment().format("MMDDYYYYHHmmss")}`
        );
        // Append regular fields
        Object.entries(data).forEach(([key, value]) => {
            if (key !== "files") {
                if (Array.isArray(value) && key === "age_groups") {
                    value.forEach((v, index) => {
                        formData.append(`age_groups[${index}][name]`, v.name);
                        formData.append(`age_groups[${index}][min]`, v.min);
                        formData.append(`age_groups[${index}][max]`, v.max);
                    });
                } else if (Array.isArray(value)) {
                    value.forEach((v) => formData.append(`${key}[]`, v));
                } else {
                    formData.append(key, value);
                }
            }
        });

        // Append uploaded files
        data.files.forEach((file) => {
            formData.append("files[]", file.originFileObj);
        });
        await store.dispatch(create_activities_thunk(formData));
        await Swal.fire({
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
        });
        reset();
        setCurrentStep(0);
    };
    console.log("errors", errors);

    return (
        <div>
            <div className="lg:border-t lg:border-b lg:border-gray-200">
                <nav aria-label="Progress" className="mx-auto max-w-7xl">
                    <ol
                        role="list"
                        className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-r lg:border-l lg:border-gray-200"
                    >
                        {updatedSteps.map((step, stepIdx) => (
                            <li
                                key={step.id}
                                className="relative overflow-hidden lg:flex-1"
                            >
                                <div
                                    className={classNames(
                                        stepIdx === 0
                                            ? "rounded-t-md border-b-0"
                                            : "",
                                        stepIdx === steps.length - 1
                                            ? "rounded-b-md border-t-0"
                                            : "",
                                        "overflow-hidden border border-gray-200 lg:border-0"
                                    )}
                                >
                                    {step.status === "complete" ? (
                                        <div className="group">
                                            <span
                                                aria-hidden="true"
                                                className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:top-auto lg:bottom-0 lg:h-1 lg:w-full"
                                            />
                                            <span
                                                className={classNames(
                                                    stepIdx !== 0
                                                        ? "lg:pl-9"
                                                        : "",
                                                    "flex items-start px-6 py-5 text-sm font-medium"
                                                )}
                                            >
                                                <span className="shrink-0">
                                                    <span className="flex size-10 items-center justify-center rounded-full bg-red-500">
                                                        <CheckIcon
                                                            aria-hidden="true"
                                                            className="size-6 text-white"
                                                        />
                                                    </span>
                                                </span>
                                                <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                                                    <span className="text-sm font-medium">
                                                        {step.name}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-500">
                                                        {step.description}
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    ) : step.status === "current" ? (
                                        <div aria-current="step">
                                            <span
                                                aria-hidden="true"
                                                className="absolute top-0 left-0 h-full w-1 bg-red-500 lg:top-auto lg:bottom-0 lg:h-1 lg:w-full"
                                            />
                                            <span
                                                className={classNames(
                                                    stepIdx !== 0
                                                        ? "lg:pl-9"
                                                        : "",
                                                    "flex items-start px-6 py-5 text-sm font-medium"
                                                )}
                                            >
                                                <span className="shrink-0">
                                                    <span className="flex size-10 items-center justify-center rounded-full border-2 border-red-500">
                                                        <span className="text-red-500">
                                                            {step.id}
                                                        </span>
                                                    </span>
                                                </span>
                                                <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                                                    <span className="text-sm font-medium text-red-500">
                                                        {step.name}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-500">
                                                        {step.description}
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="group">
                                            <span
                                                aria-hidden="true"
                                                className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:top-auto lg:bottom-0 lg:h-1 lg:w-full"
                                            />
                                            <span
                                                className={classNames(
                                                    stepIdx !== 0
                                                        ? "lg:pl-9"
                                                        : "",
                                                    "flex items-start px-6 py-5 text-sm font-medium"
                                                )}
                                            >
                                                <span className="shrink-0">
                                                    <span className="flex size-10 items-center justify-center rounded-full border-2 border-gray-300">
                                                        <span className="text-gray-500">
                                                            {step.id}
                                                        </span>
                                                    </span>
                                                </span>
                                                <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                                                    <span className="text-sm font-medium text-gray-500">
                                                        {step.name}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-500">
                                                        {step.description}
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    )}

                                    {stepIdx !== 0 && (
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-0 top-0 left-0 hidden w-3 lg:block"
                                        >
                                            <svg
                                                fill="none"
                                                viewBox="0 0 12 82"
                                                preserveAspectRatio="none"
                                                className="size-full text-gray-300"
                                            >
                                                <path
                                                    d="M0.5 0V31L10.5 41L0.5 51V82"
                                                    stroke="currentColor"
                                                    vectorEffect="non-scaling-stroke"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>

            <div className="min-h-[75vh] w-full flex flex-col items-center justify-between">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="py-3 w-full items-center gap-5 flex-col flex justify-center  lg:max-w-2xl"
                >
                    <div className="w-full">
                        {currentStep == 0 && (
                            <Section1
                                register={register}
                                errors={errors}
                                control={control}
                            />
                        )}
                        {currentStep == 1 && (
                            <Section2 register={register} errors={errors}
                            control={control} />
                        )}
                        {currentStep == 2 && (
                            <Section3
                                register={register}
                                control={control}
                                errors={errors}
                            />
                        )}
                        {currentStep == 3 && (
                            <Section4
                                register={register}
                                errors={errors}
                                control={control}
                            />
                        )}
                    </div>

                    <div className="flex w-full items-center justify-between gap-3">
                        <div>
                            <Button
                                variant="danger"
                                onClick={handleBack}
                                disabled={currentStep === 0}
                            >
                                BACK
                            </Button>
                        </div>
                        <div>
                            {currentStep != steps.length - 1 && (
                                <Button
                                    variant="danger"
                                    type="button"
                                    onClick={handleNext}
                                    disabled={currentStep === steps.length - 1}
                                >
                                    NEXT
                                </Button>
                            )}
                            {currentStep == steps.length - 1 && (
                                <Button
                                    variant="danger"
                                    type="submit"
                                    loading={isSubmitting}
                                >
                                    SUBMIT
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
