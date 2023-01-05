const display = true;
const required = true;
const editable = true;

const name = {
  name: "name",
  label: "Name",
  type: "text",
  input: "textField",
  required,
  display,
  span: "2",
};
const make = {
  name: "make",
  label: "Make",
  type: "text",
  input: "textField",
  required,
  display,
  span: "2",
};

const power = {
  name: "power",
  label: "Power",
  postFix: " W",
  type: "number",
  input: "textField",
  required,
  display,
  span: "2",
};

const country = {
  name: "country",
  label: "Country of Origin",
  type: "text",
  input: "textField",
  span: "2",
  display,
};

const notes = {
  name: "notes",
  label: "Notes",
  type: "text",
  input: "textField",
  span: "2",
  editable,
  display,
};

const image = {
  name: "image",
  input: "image",
};

const createdOn = {
  name: "createdOn",
  label: "Date of Creation",
  type: "date",
  display,
};

const createdBy = { name: "createdBy", label: "Created By",
display, };

const lastModifiedOn = {
  name: "lastModifiedOn",
  label: "Date of Modification",
  type: "date",
  display,
};

const modifiedBy = { name: "modifiedBy", label: "Modified By" };

const length = {
  name: "length",
  label: "Length",
  postFix: "mm",
  input: "textField",
  type: "number",
  span: "1",
  display,
};

const width = {
  name: "width",
  label: "Width",
  postFix: "mm",
  input: "textField",
  type: "number",
  span: "1",
  display,
};

const thickness = {
  name: "thickness",
  label: "Thickness",
  postFix: "mm",
  input: "textField",
  type: "number",
  span: "1",
  display,
};

const weight = {
  name: "weight",
  label: "Weight",
  postFix: "Kg",
  input: "textField",
  type: "number",
  span: "1",
  display,
};

export const itemFields = {
  Driver: [
    name,
    make,
    { ...country, required },
    power,
    {
      name: "type",
      label: "Type",
      type: "text",
      input: "select",
      required,
      span: "2",
      options: [
        "Constant Current",
        "Constant Voltage",
        "Constant Power",
        "CC + CV",
        "DC-DC Constant Current",
        "DC-DC Buck",
        "DC-DC Boost",
      ],
      display,
    },
    {
      name: "inputVoltage",
      label: "Input Voltage",
      postFix: " V",
      type: "text",
      input: "textField",
      span: "1",
      display,
    },
    {
      name: "outputVoltage",
      label: "Output Voltage",
      postFix: " V",
      type: "text",
      input: "textField",
      span: "1",
      required,
      display,
    },
    {
      name: "outputCurrent",
      label: "Output Current",
      postFix: " mA",
      type: "text",
      input: "textField",
      required,
      span: "1",
      display,
    },
    {
      name: "powerFactor",
      label: "Power Factor",
      postFix: "%",
      type: "number",
      input: "textField",
      span: "1",
      display,
    },
    {
      name: "ipRating",
      label: "IP Rating",
      preFix: "IP",
      type: "number",
      input: "textField",
      span: "2",
      display,
    },
    {
      name: "caseMaterial",
      label: "Case Material",
      input: "toggle",
      span: "2",
      required,
      display,
      options: ["Aluminum", "Plastic", "Bare PCB"],
    },
    createdOn,
    createdBy,
    lastModifiedOn,
    modifiedBy,
    notes,
    image,
  ],
  LED: [
    name,
    make,
    { ...country, required },
    power,
    {
      name: "type",
      label: "Type",
      input: "toggle",
      required: true,
      span: "2",
      options: ["PCB", "COB", "Reel"],
      display,
    },
    {
      name: "numberOfLeds",
      label: "Number of LEDs",
      input: "textField",
      type: "number",
      span: "2",
      display,
    },
    {
      name: "forwardVoltage",
      label: "Forward Voltage (Vf)",
      postFix: "V",
      input: "textField",
      type: "number",
      required: true,
      span: "2",
      display,
    },
    {
      name: "forwardCurrent",
      label: "Forward Current (If)",
      postFix: "mA",
      input: "textField",
      type: "number",
      required: true,
      span: "2",
      display,
    },
    {
      name: "lmPw",
      label: "Lumen/Watt",
      postFix: "lm/W",
      input: "textField",
      type: "number",
      span: "2",
      display,
    },
    {
      name: "colorTemperature",
      label: "Color Temperature",
      postFix: "K",
      input: "textField",
      type: "number",
      span: "2",
      display,
    },
    {
      name: "cri",
      label: "Color Rendering Index",
      postFix: "Ra",
      input: "textField",
      type: "number",
      span: "2",
      display,
    },
    length,
    width,
    createdOn,
    createdBy,
    lastModifiedOn,
    modifiedBy,
    notes,
    image,
  ],
  Lens: [
    name,
    make,
    { ...country, required },
    {
      name: "angle",
      label: "Angle",
      input: "textField",
      type: "number",
      preFix: "°",
      span: "2",
      display,
    },
    length,
    width,
    createdOn,
    createdBy,
    lastModifiedOn,
    modifiedBy,
    notes,
    image,
  ],
  Metal: [
    name,
    make,
    country,
    {
      name: "type",
      label: "Type",
      input: "select",
      required,
      options: [
        "Sheet Aluminum",
        "Galvanized Metal",
        "Stainless 304",
        "Stainless 316",
      ],
      span: "2",
      display,
    },
    { ...length, required },
    { ...width, required },
    { ...thickness, required },
    { ...weight, required },
    createdOn,
    createdBy,
    lastModifiedOn,
    modifiedBy,
    notes,
  ],
  Screws: [
    name,
    make,
    country,
    createdOn,
    createdBy,
    lastModifiedOn,
    modifiedBy,
    notes,
  ],
  Products: [
    name,
    make,
    country,
    length,
    width,
    thickness,
    weight,
    createdOn,
    createdBy,
    lastModifiedOn,
    modifiedBy,
    notes,
  ],
  Cables: [
    name,
    make,
    country,
    createdOn,
    createdBy,
    lastModifiedOn,
    modifiedBy,
    notes,
  ],
  Tools: [
    name,
    make,
    country,
    createdOn,
    createdBy,
    lastModifiedOn,
    modifiedBy,
    notes,
    image,
  ],
  Other: [
    name,
    make,
    country,
    createdOn,
    createdBy,
    lastModifiedOn,
    modifiedBy,
    notes,
    image,
  ],
};

export const accountFields = [
  {
    label: "Type",
    name: "type",
    type: "text",
    input: "toggle",
    options: ["Supplier", "Client"],
    display,
    span: "4",
    required,
  },
  {
    label: "English Name",
    name: "englishName",
    type: "text",
    input: "textField",
    required,
    display,
  },
  {
    label: "Arabic Name",
    name: "arabicName",
    type: "text",
    input: "textField",
    required,
    display,
  },
  {
    name: "taxNumber",
    label: "Tax Number",
    type: "text",
    input: "textField",
    display,
    required,
  },
  {
    name: "contactPerson",
    label: "Contact Person",
    type: "text",
    input: "textField",
    display,
    required,
  },
  {
    name: "contactNumber",
    label: "Contact Phone Number",
    type: "text",
    input: "textField",
    display,
    required,
  },
  {
    name: "contactEmail",
    label: "Contact Email",
    type: "text",
    input: "textField",
    display,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    input: "textField",
    display,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    input: "textField",
    display,
    required,
  },
  {
    name: "country",
    label: "Country",
    type: "text",
    input: "textField",
    display,
  },
  createdOn,
  createdBy,
  lastModifiedOn,
  modifiedBy,
  notes,
];
