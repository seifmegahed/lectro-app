const display = true
export const accountFields = [
  {
    label: "Type",
    name: "type",
    type: "text",
    input: "toggle",
    options: ["Supplier", "Client"],
    display,
    span: "4"
  },
  {
    label: "English Name",
    name: "englishName",
    type: "text",
    input: "textField",
  },
  {
    label: "Arabic Name",
    name: "arabicName",
    type: "text",
    input: "textField",
    
  },
  {
    name: "taxNumber",
    label: "Tax Number",
    type: "text",
    input: "textField",
    display,
  },
]