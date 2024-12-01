//sampledata for types check of blocks
[
  {
    time: 1733041632632,
    blocks: [
      { id: "DwHcUV8EgU", type: "paragraph", data: { text: "text" } },
      { id: "CDnHi7zJAZ", type: "header", data: { text: "Header", level: 2 } },
      {
        id: "Y5Bj_xTZfU",
        type: "list",
        data: {
          style: "ordered",
          meta: { counterType: "numeric" },
          items: [{ content: "orderList1", meta: {}, items: [] }],
        },
      },
      {
        id: "mc3punDXJ-",
        type: "list",
        data: {
          style: "unordered",
          meta: {},
          items: [{ content: "unorderList1", meta: {}, items: [] }],
        },
      },
      {
        id: "cS15nqExM6",
        type: "list",
        data: {
          style: "checklist",
          meta: {},
          items: [
            { content: "checkItem", meta: { checked: true }, items: [] },
            { content: "uncheckitem", meta: { checked: false }, items: [] },
          ],
        },
      },
    ],
    version: "2.30.7",
  },
];
