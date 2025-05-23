import Button from "@/app/_components/button";
import Checkbox from "@/app/_components/checkbox";
import Input from "@/app/_components/input";
import TextArea from "@/app/_components/textarea";
import Wysiwyg from "@/app/_components/wysiwyg";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Select, Upload } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";

export default function Section1({ register, errors, control }) {
    const { categories } = useSelector((store) => store.categories);
    const { resources } = useSelector((store) => store.resources);
    
    return (
        <div className="w-full flex flex-col gap-5">
            <div className="flex gap-3 w-full">
                <Input
                    register={{
                        ...register("name", {
                            required: "Activity Name is required",
                        }),
                    }}
                    label="Activity Name"
                    name="name"
                    type="text"
                    error={errors.name?.message}
                />
             
            </div>
            <Controller
                name="description1"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field, fieldState }) => (
                    <Wysiwyg
                        label="Description"
                        name="description1"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                name="categories"
                control={control}
                rules={{ required: "Please select at least one category" }}
                render={({ field }) => (
                    <Select
                        {...field}
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        size="large"
                        placeholder="Please select categories"
                        options={categories.map((res) => ({
                            value: res.category_id,
                            label: res.name,
                        }))}
                        className={`border rounded-lg ${
                            errors.categories
                                ? "border-red-500"
                                : "border-gray-900"
                        }`}
                    />
                )}
            />

            <Controller
                name="resources"
                control={control}
                rules={{ required: "Please select at least one resource" }}
                render={({ field }) => (
                    <Select
                        {...field}
                        mode="multiple"
                        allowClear
                        size="large"
                        placeholder="Please select resources"
                        options={resources.map((res) => ({
                            value: res.resource_id,
                            label: res.name,
                        }))}
                        className={`border rounded-lg ${
                            errors.resources
                                ? "border-red-500"
                                : "border-gray-900"
                        }`}
                    />
                )}
            />
            {errors.categories && (
                <span className="text-red-500 text-sm">
                    {errors.categories.message}
                </span>
            )}
            <Checkbox
                label="Visible on Website?"
                name="isVisible"
                register={{
                    ...register("isVisible"),
                }}
                // checked={true}

                error={errors.isVisible?.message}
            />

            <Controller
                name="files"
                control={control}
                rules={{ required: "Please upload at least one file" }}
                defaultValue={[]}
                render={({ field }) => (
                    <>
                        <Upload
                            {...field}
                            customRequest={({ onSuccess }) =>
                                setTimeout(() => onSuccess("ok"), 0)
                            }
                            multiple
                            listType="picture"
                            fileList={field.value}
                            onChange={({ fileList }) =>
                                field.onChange(fileList)
                            }
                            onRemove={(file) => {
                                const newList = field.value.filter(
                                    (f) => f.uid !== file.uid
                                );
                                field.onChange(newList);
                            }}
                            accept="image/*,video/*"
                        >
                            <Button
                                className="border-gray-800 border text-gray-800"
                                variant="outline"
                            >
                                UPLOAD VIDEO AND PICTURE
                            </Button>
                        </Upload>
                        {errors.files && (
                            <span className="text-red-500 text-sm">
                                {errors.files.message}
                            </span>
                        )}
                    </>
                )}
            />

            <Controller
                name="description2"
                control={control}
                rules={{ required: "Additional Description is required" }}
                render={({ field, fieldState }) => (
                    <Wysiwyg
                        label="Additional Description"
                        name="description2"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                    />
                )}
            />
        </div>
    );
}
