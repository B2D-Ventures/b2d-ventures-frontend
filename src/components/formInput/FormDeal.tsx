import DatePicker from "@/components/datePicker/DatePicker";
import FormInput from "@/components/formInput/FormInput";
import Select from "@/components/formInput/Select";
import TextArea from "@/components/formInput/TextArea";
import { DateValue } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useRef, ChangeEvent } from "react";

interface FormDealProps {
  isEdit?: boolean;
  id?: string;
}

export default function FormDeal({ isEdit, id }: FormDealProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [allocation, setAllocation] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [minInvestment, setMinInvestment] = useState("");
  const [raised, setRaised] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [startDate, setStartDate] = useState<DateValue | undefined>(undefined);
  const [endDate, setEndDate] = useState<DateValue | undefined>(undefined);
  const [content, setContent] = useState(`Highlights:
            - example content
            - example content
Opportunity:
            example content
Product:
            example content
Growth and traction:
            example content
Summary:
            example content`);
  const [fileCount, setFileCount] = useState(0);

  const logoRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const dealRef = useRef<HTMLInputElement>(null);
  const privateDataRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds the 5MB limit. Please choose a smaller file.");
        e.target.value = ""; // Clear the file input
        return;
      }
    }
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
    // Convert dates to ISO 8601 format
    const startDateISO = convertToISO8601(startDate);
    const endDateISO = convertToISO8601(endDate);

    // Create FormData object
    const formData = new FormData();
    if (name !== "") {
      formData.append("name", name);
    }
    if (description !== "") {
      formData.append("description", description);
    }
    if (allocation !== "") {
      formData.append("target_amount", parseFloat(allocation).toString());
    }
    if (pricePerUnit !== "") {
      formData.append("price_per_unit", parseFloat(pricePerUnit).toString());
    }
    if (minInvestment !== "") {
      formData.append(
        "minimum_investment",
        parseFloat(minInvestment).toString()
      );
    }
    if (raised !== "") {
      formData.append("amount_raised", parseFloat(raised).toString());
    }
    if (businessType !== "") {
      formData.append("type", businessType);
    }
    if (startDateISO !== "") {
      formData.append("start_date", startDateISO);
    }
    if (endDateISO !== "") {
      formData.append("end_date", endDateISO);
    }
    if (content !== "") {
      formData.append("content", content);
    }

    // Append file data if files are selected
    if (logoRef.current?.files?.[0])
      formData.append("image_logo", logoRef.current.files[0]);
    if (contentRef.current?.files?.[0])
      formData.append("image_content", contentRef.current.files[0]);
    if (dealRef.current?.files?.[0])
      formData.append("image_background", dealRef.current.files[0]);
    if (privateDataRef.current?.files?.[0])
      formData.append("dataroom", privateDataRef.current.files[0]);

    if (!isEdit) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URI}api/startup/${localStorage.getItem(
            "userId"
          )}/deals/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        alert("Form submitted successfully");
        console.log("Form submitted successfully");
        router.push("/startup");
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          // Token expired, try to refresh
          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const refreshResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_URI}api/auths/refresh-token/`,
              {
                data: {
                  attributes: {
                    "refresh-token": refreshToken,
                  },
                },
              }
            );

            const newAccessToken = refreshResponse.data.data.access;
            localStorage.setItem("accessToken", newAccessToken);

            // Retry the original request with the new access token
            const retryResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_URI}api/startup/${localStorage.getItem(
                "userId"
              )}/deals/`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );
            alert("Form submitted successfully");
            console.log("Form submitted successfully");
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            alert(
              "Please ensure you are logged in as a verified startup. Please try again later."
            );
          }
        } else {
          console.error("Form submission failed");
          alert("Form submission failed");
        }
      }
    } else {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_URI}api/startup/${localStorage.getItem(
            "userId"
          )}/deals/${id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        alert("Form submitted successfully");
        console.log("Form submitted successfully");
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          // Token expired, try to refresh
          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const refreshResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_URI}api/auths/refresh-token/`,
              {
                data: {
                  attributes: {
                    "refresh-token": refreshToken,
                  },
                },
              }
            );

            const newAccessToken = refreshResponse.data.data.access;
            localStorage.setItem("accessToken", newAccessToken);

            // Retry the original request with the new access token
            const retryResponse = await axios.put(
              `${process.env.NEXT_PUBLIC_URI}api/startup/${localStorage.getItem(
                "userId"
              )}/deals/${id}/`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );
            alert("Form submitted successfully");
            console.log("Form submitted successfully");
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            alert(
              "Please ensure you are logged in as a verified startup. Please try again later."
            );
          }
        } else {
          console.error("Form submission failed");
          alert("Form submission failed");
        }
      }
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-6 border-[2px] border-border rounded-[8px] p-4 md:p-6 lg:p-8">
        {/* Left Column */}
        <div className="flex flex-col w-full lg:w-1/2 gap-[22px]">
          <div className="w-full">
            <FormInput
              label="Name"
              has$={false}
              placeholder="Enter startup name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full">
            <FormInput
              label="Description"
              has$={false}
              placeholder="Enter startup description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-full">
            <FormInput
              label="Target amount"
              has$={true}
              placeholder="0.00"
              type="number"
              value={allocation}
              onChange={(e) => setAllocation(e.target.value)}
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
            />
          </div>
          <div className="w-full">
            <FormInput
              label="Minimum investment"
              has$={true}
              placeholder="0.00"
              type="number"
              value={minInvestment}
              onChange={(e) => setMinInvestment(e.target.value)}
            />
          </div>
          <div className="w-full">
            <FormInput
              label="Amount raised"
              has$={true}
              placeholder="0.00"
              type="number"
              value={raised}
              onChange={(e) => setRaised(e.target.value)}
            />
          </div>
          {/* Business Type moved to left column */}
          <div className="w-full">
            <Select onChange={onSelectChange} />
          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col w-full lg:w-1/2 gap-4">
          {/* Date Picker Section */}
          <div className="w-full flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <div className="text-[16px] text-secondary mb-3">Start date</div>
              <DatePicker value={startDate} onChange={(e) => setStartDate(e)} />
            </div>
            <div className="w-full">
              <div className="text-[16px] text-secondary mb-3">End date</div>
              <DatePicker value={endDate} onChange={(e) => setEndDate(e)} />
            </div>
          </div>

          {/* File Upload Section */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-end text-[12px] text-secondary">
              (File size should less than 5MB.)
            </div>

            {/* File Upload Stack - Changed to vertical layout */}
            <div className="flex flex-col gap-4">
              {/* Logo Upload */}
              <div className="flex flex-col gap-2">
                <label htmlFor="logo" className="text-[16px] text-secondary">
                  Logo
                </label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100 file:cursor-pointer"
                  ref={logoRef}
                  onChange={handleFileChange}
                />
              </div>

              {/* Content Upload */}
              <div className="flex flex-col gap-2">
                <label htmlFor="content" className="text-[16px] text-secondary">
                  Content
                </label>
                <input
                  type="file"
                  id="content"
                  name="content"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100 file:cursor-pointer"
                  ref={contentRef}
                  onChange={handleFileChange}
                />
              </div>

              {/* Deal Upload */}
              <div className="flex flex-col gap-2">
                <label htmlFor="deal" className="text-[16px] text-secondary">
                  Deal
                </label>
                <input
                  type="file"
                  id="deal"
                  name="deal"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100 file:cursor-pointer"
                  ref={dealRef}
                  onChange={handleFileChange}
                />
              </div>

              {/* Private Data Upload */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="privateData"
                  className="text-[16px] text-secondary"
                >
                  Private Data
                </label>
                <input
                  type="file"
                  id="privateData"
                  name="privateData"
                  accept="image/*, application/pdf"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100 file:cursor-pointer"
                  ref={privateDataRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* File Count */}
            <div className="flex justify-end text-secondary text-sm">
              uploaded {fileCount} file{fileCount !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Text Area */}
          <div className="w-full flex-grow min-h-[200px]">
            <TextArea
              placeholder={`Highlights:
            - example content
            - example content
Opportunity:
            example content
Product:
            example content
Growth and traction:
            example content
Summary:
            example content`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* Submit Button */}
      <div className="w-full flex justify-center mt-4">
        <button
          className="w-[200px] h-[44px] bg-purple rounded-[8px] text-white text-[20px] font-bold
                hover:opacity-90 transition-opacity"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
