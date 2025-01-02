"use client";
import Autocomplete from "../../Autocomplete/Autocomplete";
import SideLabelInput from "@/components/ui/Input/SideLabelInput";
import { Grid } from "@mui/material";

interface ClientInfoProps {
  setSelectedData?: React.Dispatch<
    React.SetStateAction<{ email: string; phone: string }>
  >;
  setValue?: React.Dispatch<React.SetStateAction<any>>;
  selectedData?: { email: string; phone: string };
  value?: any;
  list: { title: string; value: string }[];
  disabled?: boolean;
}

const ClientInfo: React.FC<ClientInfoProps> = ({
  setSelectedData,
  setValue,
  selectedData,
  value,
  list,
  disabled,
}) => {

  return (
    <>

      <div className="py-3 ">
        <span className="md:text-xl text-lg  text-[--brand-color]">
          Client Information
        </span>
      </div>

      <Autocomplete
        setValue={setValue}
        value={value}
        list={list}
        disabled={disabled}
        placeholder="Name"
        useSideLabel={false}
        label="Name"
      />

      <Grid
        sx={{
          "@media (max-width: 1050px)": {
            display: "block",
          },
        }}
      >
        <div className="block lg:grid lg:grid-cols-2 ">
          {" "}
          <SideLabelInput
            label={"Email"}
            dynamicwidth={"180px"}
            value={selectedData?.email}
            handleChange={(e: any) =>
              setSelectedData &&
              setSelectedData((old: any) => ({ ...old, email: e.target.value }))
            }
            placeholder="Email"
          />
          <SideLabelInput
            label={"Phone"}
            dynamicwidth={"180px"}
            value={selectedData?.phone}
            handleChange={(e: any) =>
              setSelectedData &&
              setSelectedData((old: any) => ({ ...old, phone: e.target.value }))
            }
            placeholder="Primary Phone Number"
          />
        </div>
      </Grid>
    </>
  );
};

export default ClientInfo;
