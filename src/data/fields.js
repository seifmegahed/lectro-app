const display = true
export const accountFields = [
  {
    label: "Type",
    name: "type",
    type: "text",
    input: "toggle",
    options: ["Supplier", "Client"],
    display,
  },
  {
    name: "englishName",
    type: "text",
    input: "textField",
  },
  {
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