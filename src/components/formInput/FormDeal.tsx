import DatePicker from "@/components/formInput/DatePicker";
import FormInput from "@/components/formInput/FormInput";
import Select from "@/components/formInput/Select";
import TextArea from "@/components/formInput/TextArea";

export default function formDeal() {
  return (
    <div className="flex flex-row w-[1236px] h-[545px] items-center justify-center border-[2px] border-border rounded-[8px] px-10 py-8 gap-10">
      <div className="flex flex-col w-full h-full items-start justify-start gap-3">
        <div className="w-full">
          <FormInput
            label="Name"
            has$={false}
            placeholder="Enter startup name"
            type="text"
          />
        </div>
        <div className="w-full">
          <FormInput
            label="Allocation"
            has$={true}
            placeholder="0.00"
            type="number"
          />
        </div>
        <div className="w-full">
          <FormInput
            label="Price per unit"
            has$={true}
            placeholder="0.00"
            type="number"
          />
        </div>
        <div className="w-full">
          <FormInput
            label="Minimun investmen"
            has$={true}
            placeholder="0.00"
            type="number"
          />
        </div>
        <div className="w-full">
          <FormInput
            label="Raised"
            has$={true}
            placeholder="0.00"
            type="number"
          />
        </div>
      </div>
      <div className="flex flex-col w-full h-full items-start justify-start gap-3">
        <div className="w-full">
          <Select />
        </div>
        <div className="w-full flex flex-row gap-4">
          <div className="w-full">
            <DatePicker />
          </div>
          <div className="w-full">
            <DatePicker />
          </div>
        </div>
        <div className="w-full flex flex-row gap-4">
          <div className="w-full">
            <FormInput
              label="Photos"
              has$={false}
              placeholder="links"
              type="text"
            />
          </div>
          <div className="w-full">
            <FormInput
              label="Logo"
              has$={false}
              placeholder="links"
              type="text"
            />
          </div>
        </div>
        <div className="w-full">
          <TextArea placeholder="Enter a brief description" />
        </div>
        <div className="flex w-full justify-end items-center">
          <div className="flex w-[50%] h-[44px] items-center justify-center bg-purple rounded-[8px] text-white text-[20px] font-bold">
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}
