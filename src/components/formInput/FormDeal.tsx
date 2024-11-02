import DatePicker from "@/components/datePicker/DatePicker";
import FormInput from "@/components/formInput/FormInput";
import Select from "@/components/formInput/Select";
import TextArea from "@/components/formInput/TextArea";
import { DateValue } from "@nextui-org/react";
import axios from "axios";
import React, { useState, useRef, ChangeEvent } from "react";

export default function formDeal({ isEdit, id }: { isEdit: boolean; id: string }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [allocation, setAllocation] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [minInvestment, setMinInvestment] = useState("");
  const [raised, setRaised] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [startDate, setStartDate] = useState<DateValue | undefined>(undefined);
  const [endDate, setEndDate] = useState<DateValue | undefined>(undefined);
  const [content, setContent] = useState("");
  const [fileCount, setFileCount] = useState(0);

  const logoRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const dealRef = useRef<HTMLInputElement>(null);
  const privateDataRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    countUploadedFiles();
  };

  const countUploadedFiles = () => {
    let count = 0;
    if (
      logoRef.current &&
      logoRef.current.files &&
      logoRef.current.files.length > 0
    )
      count++;
    if (
      contentRef.current &&
      contentRef.current.files &&
      contentRef.current.files.length > 0
    )
      count++;
    if (
      dealRef.current &&
      dealRef.current.files &&
      dealRef.current.files.length > 0
    )
      count++;
    if (
      privateDataRef.current &&
      privateDataRef.current.files &&
      privateDataRef.current.files.length > 0
    )
      count++;
    setFileCount(count);
  };

  const onSelectChange = (e: any) => {
    setBusinessType(e.target.value);
  };

  const convertToISO8601 = (date: DateValue | undefined) => {
    if (!date) return "";
    const dateObj = new Date(date.year, date.month - 1, date.day);
    return dateObj.toISOString();
  };

  const handleSubmit = async () => {
    try {
      // Convert dates to ISO 8601 format
      const startDateISO = convertToISO8601(startDate);
      const endDateISO = convertToISO8601(endDate);
  
      // Create FormData object
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("allocation", parseFloat(allocation).toString());
      formData.append("price_per_unit", parseFloat(pricePerUnit).toString());
      formData.append("minimum_investment", parseFloat(minInvestment).toString());
      formData.append("raised", parseFloat(raised).toString());
      formData.append("type", businessType);
      formData.append("start_date", startDateISO || "");
      formData.append("end_date", endDateISO || "");
      formData.append("content", content);

      // Append file data if files are selected
      if (logoRef.current?.files?.[0])
        formData.append("image_logo", logoRef.current.files[0]);
      if (contentRef.current?.files?.[0])
        formData.append("image_content", contentRef.current.files[0]);
      if (dealRef.current?.files?.[0])
        formData.append("image_background", dealRef.current.files[0]);
      if (privateDataRef.current?.files?.[0])
        formData.append("dataroom", privateDataRef.current.files[0]);
      if (isEdit) {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/startup/7e737e1f-38ed-4285-8657-1ab3f41b2096/deals/edad4c9c-3367-44bc-bc33-55d77190abcb/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );  
        if (response.status === 200 || response.status === 201) {
          alert("Form submitted successfully");
          console.log("Form submitted successfully");
          // You might want to add some user feedback here, like showing a success message
        } else {
          console.error("Form submission failed");
          // You might want to add some user feedback here, like showing an error message
        } 
      } else {
      // Send POST request
      const response = await axios.post(
        // `http://127.0.0.1:8000/api/startup/${localStorage.getItem("userId")}/deals/`,
        `http://127.0.0.1:8000/api/startup/7e737e1f-38ed-4285-8657-1ab3f41b2096/deals/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Form submitted successfully");
        console.log("Form submitted successfully");
        // You might want to add some user feedback here, like showing a success message
      } else {
        console.error("Form submission failed");
        // You might want to add some user feedback here, like showing an error message
      }
    }
  
      // if (response.status === 200 || response.status === 201) {
      //   alert("Form submitted successfully");
      //   console.log("Form submitted successfully");
      //   // You might want to add some user feedback here, like showing a success message
      // } else {
      //   console.error("Form submission failed");
      //   // You might want to add some user feedback here, like showing an error message
      // }
    } catch (error) {
      console.error("Error submitting form:", error);
      // You might want to add some user feedback here, like showing an error message
    }
  };

  return (
    <div className="flex flex-row w-[1236px] h-[585px] items-center justify-center border-[2px] border-border rounded-[8px] px-10 py-8 gap-10">
      <div className="flex flex-col w-full h-full items-start justify-start gap-3">
        <div className="w-full">
          <FormInput
            label="Name"
            has$={false}
            placeholder="Enter startup name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            testId="name-input"
          />
        </div>
        <div className="w-full">
          <FormInput
            label="description"
            has$={false}
            placeholder="Enter startup description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            testId="description-input"
          />
        </div>
        <div className="w-full">
          <FormInput
            label="Allocation"
            has$={true}
            placeholder="0.00"
            type="number"
            value={allocation}
            onChange={(e) => setAllocation(e.target.value)}
            testId="allocation-input"
          />
        </div>
        <div className="w-full">
          <FormInput
            label="Price per unit"
            has$={true}
            placeholder="0.00"
            type="number"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            testId="price-input"
          />
        </div>
        <div className="w-full">
          <FormInput
            label="Minimun investmen"
            has$={true}
            placeholder="0.00"
            type="number"
            value={minInvestment}
            onChange={(e) => setMinInvestment(e.target.value)}
            testId="min-investment-input"
          />
        </div>
        <div className="w-full">
          <FormInput
            label="Raised"
            has$={true}
            placeholder="0.00"
            type="number"
            value={raised}
            onChange={(e) => setRaised(e.target.value)}
            testId="raised-input"
          />
        </div>
      </div>
      <div className="flex flex-col w-full h-full items-start justify-start gap-3">
        <div className="w-full">
          <Select onChange={onSelectChange} testId="select-type"/>
        </div>
        <div className="w-full flex flex-row gap-4">
          <div className="w-full">
            <div className="w-full text-[16px] text-secondary mb-3">
              Start date
            </div>
            <DatePicker value={startDate} onChange={(e) => setStartDate(e)} testId="start-date-input"/>
          </div>
          <div className="w-full">
            <div className="w-full text-[16px] text-secondary mb-3">
              End date
            </div>
            <DatePicker value={endDate} onChange={(e) => setEndDate(e)} testId="end-date-input"/>
          </div>
        </div>
        <div className="flex w-full text-[16px] text-secondary">
          <div className="w-[100px]">Logo</div>
          <div className="w-[100px]">Content</div>
          <div className="w-[100px]">Deal</div>
          <div className="w-[100px]">Private data</div>
        </div>
        <div className="w-full flex flex-row mt-[-4px] text-purple items-end">
          <div className="flex w-[100px]">
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              className="w-[90px] mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-2
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100 file:cursor-pointer"
              ref={logoRef}
              onChange={handleFileChange}
              data-testid="logo-input"
            />
          </div>
          <div className="flex w-[100px]">
            <input
              type="file"
              id="Content"
              name="Content"
              accept="image/*"
              className="w-[90px] mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-2
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100 file:cursor-pointer"
              ref={contentRef}
              onChange={handleFileChange}
              data-testid="content-image-input"
            />
          </div>
          <div className="flex w-[100px]">
            <input
              type="file"
              id="Deal"
              name="Deal"
              accept="image/*"
              className="w-[90px] mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-2
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100 file:cursor-pointer"
              ref={dealRef}
              onChange={handleFileChange}
              data-testid="deal-image-input"
            />
          </div>
          <div className="flex w-[100px]">
            <input
              type="file"
              id="Private data"
              name="Private data"
              accept="image/*, application/pdf"
              className="w-[90px] mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-2
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100 file:cursor-pointer"
              ref={privateDataRef}
              onChange={handleFileChange}
              data-testid="private-data-input"
            />
          </div>
          <div className="flex text-secondary ml-auto">
            uploaded {fileCount} file{fileCount !== 1 ? "s" : ""}
          </div>
        </div>
        <div className="w-full mt-1">
          <TextArea
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex w-full justify-end items-center mt-7 hover:cursor-pointer">
          <div
            className="flex w-full h-[44px] items-center justify-center bg-purple rounded-[8px] text-white text-[20px] font-bold"
            onClick={handleSubmit}
            data-testid="submit-button"
          >
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}
